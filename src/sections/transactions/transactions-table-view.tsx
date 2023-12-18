// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { TableHeadCustom, TableNoData, useTable } from 'src/components/table';
//
import Scrollbar from '@components/scrollbar';
import { CONTRACTS } from '@config';
import useChainTransactions from '@hooks/useGoerliTransaction';
import { Stack, Table, TableBody, TableContainer } from '@mui/material';
import { useBeneficiaries } from 'src/api/beneficiaries';
import useAppStore from 'src/store/app';
import TransactionsCards from './transaction-cards';
import TransactionTableRow from './transaction-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: 'topic',
    label: 'Topic',
  },

  {
    id: 'beneficiary',
    label: 'Beneficiary',
  },
  {
    id: 'amount',
    label: 'Amount',
  },
  {
    id: 'timestamp',
    label: 'Timestamp',
  },
  {
    id: 'txHash',
    label: 'TxHash',
  },

  {
    id: '',
    width: '88px',
    align: 'center',
  },
];

// ----------------------------------------------------------------------

export default function TransactionListView() {
  const table = useTable();
  const appContracts = useAppStore((state) => state.contracts);
  const rpcUrl = useAppStore((state) => state.blockchain?.rpcUrls[0]);

  const settings = useSettingsContext();
  const { beneficiaries } = useBeneficiaries();

  const { data: transactions } = useChainTransactions({
    action: 'getLogs',
    fromBlock: 0,
    toBlock: 'latest',
    module: 'logs',
    appContracts,
    source: 'rpcCall',
    rpcUrl,
    events: [
      {
        contractName: CONTRACTS.CVAPROJECT,
        topic0s: [
          'TokenTransfer',
          'ClaimAssigned',
          'ClaimProcessed',
          'VendorAllowance',
          'VendorAllowanceAccept',
          // 'ProjectUnlocked',
          // 'ProjectLocked',
        ],
      },
    ],
    transform: (data) =>
      data.map((d) => {
        const ben = beneficiaries.find(
          (b) => b?.walletAddress.toLowerCase() === d?.beneficiary?.toLowerCase()
        );
        return {
          ...d,
          beneficiary: ben?.phone || d?.beneficiary,
        };
      }),
  });

  console.log('transactions', transactions);

  // const router = useRouter();

  // const denseHeight = table.dense ? 52 : 72;

  // const searchParams = useSearchParams();
  // const pathname = usePathname();

  // const { push } = useRouter();

  // const defaultFilters: ITransactionApiFilters = useMemo(
  //   () => ({
  //     perPage: table.rowsPerPage,
  //     page: table.page + 1,
  //     orderBy: table.orderBy,
  //     order: table.order,
  //   }),
  //   [table.order, table.orderBy, table.page, table.rowsPerPage]
  // );

  // const [filters, setFilters] = useState(defaultFilters);

  // const canReset = !isEqual(defaultFilters, filters);

  const notFound = !transactions.length || !transactions.length;

  // const createQueryString = useCallback((params: Record<string, string | number | boolean>) => {
  //   const queryParams = Object.entries(params)
  //     .filter(([_, value]) => Boolean(value))
  //     .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  //     .join('&');

  //   return queryParams === '' ? '' : `${queryParams}`;
  // }, []);

  // const handleFilters = useCallback(
  //   (name: string, value: ITransactionTableFilterValue) => {
  //     table.onResetPage();
  //     setFilters((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));

  //     const updatedParams = {
  //       ...filters,
  //       ...Object.fromEntries(searchParams.entries()),
  //       [name]: value,
  //     };
  //     const queryString = createQueryString(updatedParams);
  //     push(`${pathname}?${queryString}`);
  //   },
  //   [table, createQueryString, push, searchParams, filters, pathname]
  // );

  // const handleResetFilters = useCallback(() => {
  //   setFilters(defaultFilters);
  //   push(pathname);
  // }, [push, defaultFilters, pathname]);

  // const handleViewRow = useCallback(
  //   (txHash: string) => {
  //     router.push(paths.dashboard.general.transactions.details(txHash));
  //   },
  //   [router]
  // );

  // useEffect(() => {
  //   const searchFilters: ITransactionApiFilters = {
  //     ...defaultFilters,
  //     ...Object.fromEntries(searchParams.entries()),
  //   };
  //   setFilters(searchFilters);
  // }, [searchParams, table.order, table.orderBy, table.page, table.rowsPerPage, defaultFilters]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Transactions: List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack mb={2}>
        <TransactionsCards
          data={
            {
              // bankedCash: 0,
              // bankedToken: 0,
              // unbankedCash: 0,
              // unbankedToken: 0,
            }
          }
        />
      </Stack>

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={transactions?.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {transactions?.map((row) => (
                  <TransactionTableRow
                    key={`${row.timestamp}-${row.topic}-${row.contractName}`}
                    row={row}
                  />
                ))}

                {/* <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table?.page, table?.rowsPerPage)}
                /> */}

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Card>
    </Container>
  );
}
