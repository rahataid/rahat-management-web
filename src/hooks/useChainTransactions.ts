import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Contract, InterfaceAbi, JsonRpcProvider } from 'ethers';
import { useMemo, useRef, useState } from 'react';

export function fDateTime(date: string | number | Date, newFormat?: string): string {
  const d = new Date(typeof date === 'number' ? date * 1000 : date);

  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = d.getFullYear();

  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');

  const formattedDate =
    (newFormat &&
      newFormat
        .replace('dd', dd)
        .replace('mm', mm)
        .replace('yyyy', yyyy)
        .replace('HH', hours)
        .replace('mm', minutes)) ||
    `${dd} ${mm} ${yyyy} ${hours}:${minutes}`;

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
  timestampInt: number;
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

interface Summary {
  totalEvents: Record<string, number>;
  totalAmounts: Record<string, number>;
  totalTransactions: Record<string, number>;
  topics: Record<string, string[]>;
  totalCountByTopics: Record<string, number>;
  totalAmountsByTopic: Record<string, number>;
}

const apikey = '9DAUQ6ZJQNSY2WHYGTUC6B7Z8WSKCCTF6S';

const fetchArbiscanAPI = async (params: Params): Promise<Log[]> => {
  const response: AxiosResponse<Data> = await axios.get('https://api-goerli.arbiscan.io/api', {
    params: {
      ...params,
      apikey,
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
  const decodedLogsRef = useRef<any>([]);
  const provider = useMemo(() => new JsonRpcProvider(params?.rpcUrl), [params?.rpcUrl]);
  const [fetchedAndDecodedLogs, setFetchedAndDecodedLogs] = useState<boolean>(false);

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

  const { isLoading, error } = useQuery<
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
      enabled:
        !!appContracts || !!events || decodedLogsRef.current.length === 0 || !fetchedAndDecodedLogs,
      // refetchInterval: 20000,
      // refetchOnWindowFocus: true,
      async onSuccess(res) {
        const formattedData =
          events
            .map((event, index) => {
              const logData = res?.[index];
              return events[index].topic0s.map((topic) =>
                logData?.topic0s?.[topic]
                  ? logData?.topic0s?.[topic]?.map((log: Log) => {
                      const contract = new Contract(
                        appContracts?.[event.contractName].address,
                        appContracts?.[event.contractName].abi,
                        provider
                      );
                      const interfaceData =
                        contract.interface
                          .decodeEventLog(topic, log?.data, log?.topics)
                          ?.toObject() || {};
                      return {
                        topic,
                        blockNumber: log?.blockNumber,
                        txHash: log?.transactionHash,
                        gasUsed: log?.gasUsed,
                        gasPrice: log?.gasPrice,
                        contractName: event?.contractName,
                        // timestampHash: log?.timeStamp,
                        // timestamp: log?.timeStamp ? fDateTime(new Date(log?.timeStamp * 1000)) : '-',
                        ...interfaceData,
                      };
                    })
                  : []
              );
            })
            .flat(2)
            .map((log: Log) => ({ ...log, amount: log?.amount?.toString() || '0' })) || [];
        decodedLogsRef.current = await Promise.all(
          formattedData.map(async (log: Log) => {
            const block = await provider.getBlock(log?.blockNumber);
            return {
              ...log,
              ...block?.toJSON(),
              timestamp: fDateTime(block?.timestamp ?? 0 * 1000, 'dd/mm/yyyy HH:mm'),
              timestampInt: block?.timestamp,
            };
          })
        );
        decodedLogsRef.current = decodedLogsRef.current.sort(
          (a: Log, b: Log) => b?.timestampInt - a?.timestampInt
        );
        setFetchedAndDecodedLogs(true);
      },
    }
  );

  if (transformResponse) {
    decodedLogsRef.current = transformResponse(decodedLogsRef.current);
  }

  const summary: Summary = decodedLogsRef.current.reduce(
    (acc: any, log: any) => {
      const {
        totalEvents,
        totalAmounts,
        totalTransactions,
        topics,
        totalCountByTopics,
        totalAmountsByTopic,
      } = acc;
      const eventName = log.contractName;
      const topicName = log.topic;

      // Increment the total number of events
      totalEvents[eventName] = (totalEvents[eventName] || 0) + 1;

      // Increment the total amount for the event
      totalAmounts[eventName] = (totalAmounts[eventName] || 0) + Number(log.amount);

      // Increment the total number of transactions for the event
      totalTransactions[eventName] = (totalTransactions[eventName] || 0) + 1;

      // Add the topic to the list of topics for the event
      topics[eventName] = topics[eventName] || [];
      if (!topics[eventName].includes(topicName)) {
        topics[eventName].push(topicName);
      }

      // Increment the total number of occurrences of the topic
      totalCountByTopics[topicName] = (totalCountByTopics[topicName] || 0) + 1;

      // Increment the total amount for the topic
      totalAmountsByTopic[topicName] = (totalAmountsByTopic[topicName] || 0) + Number(log.amount);

      return {
        totalEvents,
        totalAmounts,
        totalTransactions,
        topics,
        totalCountByTopics,
        totalAmountsByTopic,
      };
    },
    {
      totalEvents: {},
      totalAmounts: {},
      totalTransactions: {},
      topics: {},
      totalCountByTopics: {},
      totalAmountsByTopic: {},
    }
  );

  return {
    data: decodedLogsRef.current || [],
    summary,
    isLoading,
    error,
  };
};

export default useChainTransactions;
