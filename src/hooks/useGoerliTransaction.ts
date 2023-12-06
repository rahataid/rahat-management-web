import { useQuery } from '@tanstack/react-query';
import { fDateTime } from '@utils/format-time';
import axios from 'axios';
import { Contract, InterfaceAbi } from 'ethers';

interface Event {
  contractName: any;
  topic0s: string[];
}

interface Params {
  action: string;
  fromBlock: string;
  toBlock: string;
  module: string;
  events: Event[];
  topic0?: string;
  address?: string;
  transform?: (data: any) => any;
  appContracts?: {
    [key: string]: {
      address: string;
      abi: any;
    };
  };
}

interface Data {
  status: string;
  message: string;
  result: any;
}

const apiKey = '9DAUQ6ZJQNSY2WHYGTUC6B7Z8WSKCCTF6S';

const fetchArbiscanAPI = async (params: Params): Promise<Data> => {
  const response = await axios.get('https://api-goerli.arbiscan.io/api', {
    params: {
      ...params,
      apikey: apiKey,
    },
  });

  return response.data?.result;
};

const useArbiscanAPI = ({ events, appContracts, ...params }: Params) => {
  const { data, isLoading, error } = useQuery<
    { event: string; topic0s: { [key: string]: Data[] } }[],
    Error
  >(
    ['arbiscanAPI', params],
    async () => {
      const results = await Promise.all(
        events.map(async (event) => {
          const topic0sData = await Promise.all(
            event.topic0s.map(async (topic) => {
              if (!appContracts?.[event.contractName]) {
                return null;
              }
              const contract = new Contract(
                appContracts[event.contractName].address as string,
                appContracts[event.contractName].abi as InterfaceAbi
              );
              const topic0 = contract.interface.getEvent(topic).topicHash;
              const address = contract.target;
              return fetchArbiscanAPI({
                ...params,
                topic0,
                address,
              });
            })
          );
          const topic0sObject = event.topic0s.reduce((acc, topic, index) => {
            acc[topic] = topic0sData[index];
            return acc;
          }, {} as { [key: string]: Data[] });
          return {
            event: event.contractName,
            topic0s: topic0sObject,
          };
        })
      );
      return results;
    },
    {
      enabled: !!appContracts,
      refetchInterval: 20000,
      refetchOnWindowFocus: true,
    }
  );

  let decodedLogs =
    (data?.[0] &&
      events
        .map((event, index) => {
          const logData = data?.[index];
          return events[index].topic0s.map((topic) => {
            return logData?.topic0s?.[topic]
              ? logData?.topic0s?.[topic]?.map((log) => {
                  const contract = new Contract(
                    appContracts[event.contractName].address as string,
                    appContracts[event.contractName].abi as InterfaceAbi
                  );
                  const interfaceData =
                    contract.interface.decodeEventLog(topic, log?.data, log?.topics)?.toObject() ||
                    {};
                  return {
                    topic,
                    blockNumber: log?.blockNumber,
                    txHash: log?.transactionHash,
                    gasUsed: log?.gasUsed,
                    gasPrice: log?.gasPrice,
                    contractName: event?.contractName,
                    timestampHash: log?.timeStamp,
                    timestamp: fDateTime(new Date(log?.timeStamp * 1000)),
                    ...interfaceData,
                  };
                })
              : [];
          });
        })
        .flat(2)
        .map((log: any) => ({ ...log, amount: log?.amount?.toString() || 'N/A' }))
        ?.sort((a, b) => {
          const aDate = new Date(a?.timestampHash * 1000);
          const bDate = new Date(b?.timestampHash * 1000);
          return bDate.getTime() - aDate.getTime();
        })) ||
    [];

  if (params.transform) {
    decodedLogs = params.transform(decodedLogs);
  }
  return {
    data: decodedLogs,
    isLoading,
    error,
  };
};
export default useArbiscanAPI;
