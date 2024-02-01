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
import useChainTransactions from '@hooks/useChainTransactions';
import { Alert, Stack, Table, TableBody, TableContainer } from '@mui/material';
import { useBeneficiaries } from 'src/api/beneficiaries';
import useAppStore from 'src/store/app';
import TransactionsCards from './transaction-cards';
import TransactionLoadingSkeleton from './transaction-skeleton';
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
    width: '250px',
    label: 'TxHash',
  },

  // {
  //   id: '',
  //   width: '88px',
  //   align: 'center',
  // },
];

// ----------------------------------------------------------------------

export default function TransactionListView() {
  const table = useTable();
  const appContracts = useAppStore((state) => state.contracts);
  const { rpcUrl, currency } = useAppStore((state) => ({
    rpcUrl: state.blockchain?.rpcUrls[0] as string,
    currency: state.blockchain?.nativeCurrency?.symbol || 'Rs.',
  }));

  const settings = useSettingsContext();
  const { beneficiaries } = useBeneficiaries();

  const {
    data: transactions,
    isLoading,
    summary,
    error,
  } = useChainTransactions({
    action: 'getLogs',
    fromBlock: 10986550,
    toBlock: 'latest',
    module: 'logs',
    appContracts,
    source: 'explorer',
    // source: 'rpcCall',
    rpcUrl,
    events: [
      {
        contractName: CONTRACTS.CVAPROJECT,
        topic0s: [
          // 'TokenTransfer',
          'ClaimAssigned',
          'ClaimProcessed',
          // 'VendorAllowance',
          // 'VendorAllowanceAccept',
        ],
      },
      // {
      //   contractName: CONTRACTS.DONOR,
      //   topic0s: ['TokenMintedAndApproved'],
      // },
    ],
    transform: (data) =>
      data?.map((d) => {
        const ben = beneficiaries.find(
          (b) => b?.walletAddress.toLowerCase() === d?.beneficiary?.toLowerCase()
        );
        return {
          ...d,
          beneficiary: ben?.phone || d?.beneficiary,
        };
      }),
  });
  const notFound = !transactions?.length || !transactions.length;

  const transactionReport = {
    cashDistributed: summary?.totalAmountsByTopic?.ClaimProcessed || 0,
    cashIssued: summary?.totalAmountsByTopic?.ClaimAssigned || 0,
    distributedCount: summary?.totalCountByTopics.ClaimProcessed || 0,
    issuedCount: summary?.totalCountByTopics?.ClaimAssigned || 0,
    currency,
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Transactions: List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {isLoading && (
        <Stack mb={2}>
          <TransactionLoadingSkeleton />;
        </Stack>
      )}

      {error?.message && (
        <Stack mb={2}>
          <Alert severity="error">{error.message}</Alert>
        </Stack>
      )}

      <Stack mb={2}>
        <TransactionsCards {...transactionReport} />
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
