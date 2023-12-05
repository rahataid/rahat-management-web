import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Params {
  module: string;
  action: string;
  fromBlock: string;
  toBlock: string;
  address: string;
  topic0: string;
}

interface Data {
  status: string;
  message: string;
  result: any;
}

const apiKey = '';

const fetchArbiscanAPI = async (params: Params): Promise<Data> => {
  const res = await axios.get('https://api-goerli.arbiscan.io/api', {
    params: {
      ...params,
      apiKey,
    },
  });

  return res.data;
};

const useArbiscanAPI = (params: Params) =>
  useQuery<Data, Error>(['arbiscanAPI', params], () => fetchArbiscanAPI(params));

export default useArbiscanAPI;
