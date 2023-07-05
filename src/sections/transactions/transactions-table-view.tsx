import { useCallback, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
import { transactionList } from 'src/_mock/_transactions';
// hooks
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';
// types
import { TransactionFilter } from 'src/types/transactions';
//
import { Stack } from '@mui/material';
import TransactionsCards from './transaction-cards';
import TransactionTableRow from './transaction-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'timestamp', label: 'Timestamp'},
  { id: 'hash', label: 'TxHash' },
  { id: 'method', label: 'Method' },
  { id: 'actions', label: 'Actions', width:'88px', align: 'center'},
];

const defaultFilters: TransactionFilter = {
  timestamp: '',
  hash: '',
  method: 'all',
};

// ----------------------------------------------------------------------

export default function TransactionListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const [tableData, setTableData] = useState(transactionList);

  const dataFiltered = tableData;

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const notFound = !dataFiltered.length;

  //   const handleEditRow = useCallback(
  //     (id: string) => {
  //       router.push(paths.dashboard.user.edit(id));
  //     },
  //     [router]
  //   );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.general.transactions.details(id));
    },
    [router]
  );
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Transactions', href: paths.dashboard.user.root },
          { name: 'List' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack mb={2}>
        <TransactionsCards />
      </Stack>

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <TransactionTableRow
                      key={row.hash}
                      row={row}
                      selected={table.selected.includes(row.hash)}
                      onViewRow={() => handleViewRow(row.hash)}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>
    </Container>
  );
}
