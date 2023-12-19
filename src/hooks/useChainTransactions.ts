import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Contract, InterfaceAbi, JsonRpcProvider } from 'ethers';

export function fDateTime(date: string | number | Date, newFormat?: string): string {
  const d = new Date(date);

  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = d.getFullYear();

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  const formattedDate = `${dd} ${mm} ${yyyy} ${hours}:${minutes}`;

  return formattedDate;
}

interface Event {
  contractName: string;
  topic0s: string[];
}

interface AppContract {
  address: string;
  abi: InterfaceAbi;
}

interface Params {
  action: string;
  fromBlock: string | number;
  toBlock: string;
  module: string;
  events: Event[];
  topic0?: string;
  address?: string;
  transform?: (data: Log[]) => Log[];
  source: 'rpcCall' | 'explorer' | 'subgraph';
  rpcUrl: string;
  appContracts?: Record<string, AppContract>;
}

interface Log {
  blockNumber: string;
  transactionHash: string;
  gasUsed: string;
  gasPrice: string;
  timeStamp: string;
  data: string;
  topics: string[];
  topic: string;
  contractName: string;
  timestampHash: string;
  timestamp: string;
  amount?: string;
}

interface Data {
  status: string;
  message: string;
  result: Log[];
}

interface RpcParams {
  topic0: string;
  address: string;
  contract: Contract;
  topic0Name: string;
  fromBlock: string | number;
  toBlock: string | number | 'latest';
}

const apiKey = '9DAUQ6ZJQNSY2WHYGTUC6B7Z8WSKCCTF6S';

const fetchArbiscanAPI = async (params: Params): Promise<Log[]> => {
  const response: AxiosResponse<Data> = await axios.get('https://api-goerli.arbiscan.io/api', {
    params: {
      ...params,
      apikey: apiKey,
    },
  });

  return response.data?.result;
};

const useChainTransactions = ({
  events,
  appContracts,
  transform: transformResponse,
  ...params
}: Params) => {
  const provider = new JsonRpcProvider(params?.rpcUrl);

  const handleTransactionSources = {
    rpcCall: async (rpcParam: RpcParams) => {
      const trans = await rpcParam.contract?.queryFilter(
        rpcParam.topic0Name,
        rpcParam.fromBlock,
        rpcParam.toBlock
      );
      return trans;
    },
    explorer: fetchArbiscanAPI,
    subgraph: fetchArbiscanAPI,
  };

  const { data, isLoading, error } = useQuery<
    { event: string; topic0s: { [key: string]: Data[] } }[],
    Error
  >(
    ['arbiscanAPI', params],
    async () => {
      const results = await Promise.all(
        events.map(async (event) => {
          if (!appContracts?.[event.contractName]) {
            return null;
          }

          const contract = new Contract(
            appContracts[event.contractName].address,
            appContracts[event.contractName].abi,
            provider
          );

          const topic0sData = await Promise.all(
            event.topic0s.map(async (topic) => {
              const topic0 = contract.interface.getEvent(topic).topicHash;
              const address = contract.target;

              return handleTransactionSources[params.source]({
                ...params,
                topic0,
                address,
                contract,
                topic0Name: topic,
              });
            })
          );

          // Use Object.fromEntries to create an object from an array of key-value pairs
          const topic0sObject = Object.fromEntries(
            event.topic0s.map((topic, index) => [topic, topic0sData[index]])
          );

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
      // refetchInterval: 20000,
      refetchOnWindowFocus: true,
    }
  );

  let decodedLogs: Log[] =
    (data?.[0] &&
      events
        .map((event, index) => {
          const logData = data?.[index];
          return events[index].topic0s.map((topic) =>
            logData?.topic0s?.[topic]
              ? logData?.topic0s?.[topic]?.map((log: Log) => {
                  const contract = new Contract(
                    appContracts?.[event.contractName].address,
                    appContracts?.[event.contractName].abi,
                    provider
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
                    timestamp: log?.timeStamp ? fDateTime(new Date(log?.timeStamp * 1000)) : 'N/A',
                    ...interfaceData,
                  };
                })
              : []
          );
        })
        .flat(2)
        .map((log: Log) => ({ ...log, amount: log?.amount?.toString() || 'N/A' }))
        ?.sort((a, b) => {
          const aDate = new Date(a?.timestampHash * 1000);
          const bDate = new Date(b?.timestampHash * 1000);
          return bDate.getTime() - aDate.getTime();
        })) ||
    [];

  if (transformResponse) {
    decodedLogs = transformResponse(decodedLogs);
  }
  return {
    data: decodedLogs,
    isLoading,
    error,
  };
};
export default useChainTransactions;
