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
//
import { useGetVendors } from 'src/api/vendors';
import VendorTableRow from './vendor-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Name', label: 'Name' },
  { id: 'Projects Involved', label: 'Projects Involved' },
  { id: 'phone', label: 'Phone' },
  { id: 'actions', label: 'Actions', width: '88px', align: 'center' },
];

// ----------------------------------------------------------------------

export default function VendorListView() {
  const table = useTable();
  const { vendors } = useGetVendors();

  const settings = useSettingsContext();

  const router = useRouter();

  const [tableData, setTableData] = useState(vendors);

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
    (address: string) => {
      router.push(paths.dashboard.general.vendors.details(address));
    },
    [router]
  );
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Vendors: List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* <Stack mb={2}>
        <VendorCards />
      </Stack> */}

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
                    <VendorTableRow
                      key={row.id}
                      row={row}
                      onViewRow={() => handleViewRow(row.address)}
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
