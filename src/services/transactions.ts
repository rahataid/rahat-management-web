import { axiosInstance, endpoints } from '@utils/axios';
import { ITransactionApiFilters } from 'src/types/transactions';

const TransactionsService = {
  list: (params?: ITransactionApiFilters) =>
    axiosInstance.get(endpoints.transactions.list, { params }),
};

export default TransactionsService;
