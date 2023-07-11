'use client';

import isEqual from 'lodash/isEqual';
import { useCallback, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
// routes
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
// types
import {
  IBeneficiariesItem,
  IBeneficiariesTableFilters,
  IBeneficiariesTableFilterValue,
} from 'src/types/beneficiaries';
//
import { Button } from '@mui/material';
import { RouterLink } from '@routes/components';
import {
  distributionPointOptions,
  statusFilterOptions,
  tokenAssignedFilterOptions,
  tokenClaimedFilterOptions,
} from 'src/_mock/_beneficiaries';
import { useBeneficiaries } from 'src/api/beneficiaries';
import BeneficiariesTableFiltersResult from './beneficiaries-table-filters-result';
import BeneficiariesTableRow from './beneficiaries-table-row';
import BeneficiariesTableToolbar from './beneficiaries-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', width: 340 },
  { id: 'hasInternetAccess', label: 'Has Internet Access' },
  { id: 'status', label: 'Status' },
  { id: 'tokensAssigned', label: 'Tokens Assigned', width: 200 },
  { id: 'tokensClaimed', label: 'Tokens Claimed', width: 200 },
  { id: '', width: '88px', align: 'center' },
];

const defaultFilters: IBeneficiariesTableFilters = {
  distributionPoint: [],
  status: [],
  tokenAssignedStatus: [],
  tokenClaimedStatus: [],
  name: '',
};

// ----------------------------------------------------------------------

export default function BeneficiariesListView() {
  const { beneficiaries } = useBeneficiaries();
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(beneficiaries);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: IBeneficiariesTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleViewRow = useCallback(
    (address: string) => {
      router.push(paths.dashboard.general.beneficiaries.details(address));
    },
    [router]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Beneficiaries: List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.general.beneficiaries.new}
            variant="outlined"
            startIcon={<Iconify icon="mingcute:add-line" />}
            color="success"
          >
            Add Beneficiary
          </Button>
        }
      />

      <Card>
        <BeneficiariesTableToolbar
          filters={filters}
          onFilters={handleFilters}
          distributionPointOptions={distributionPointOptions}
          statusOptions={statusFilterOptions}
          tokenAssignedOptions={tokenAssignedFilterOptions}
          tokenClaimedOptions={tokenClaimedFilterOptions}
        />

        {canReset && (
          <BeneficiariesTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData.map((row: IBeneficiariesItem) => row.cnicNumber.toString())
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

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
                    <BeneficiariesTableRow
                      key={row.address}
                      row={row}
                      selected={table.selected.includes(row.address.toString())}
                      onViewRow={() => handleViewRow(row.address.toString())}
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
          //
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IBeneficiariesItem[];
  comparator: (a: any, b: any) => number;
  filters: IBeneficiariesTableFilters;
}) {
  const { name, distributionPoint, tokenAssignedStatus, tokenClaimedStatus, status } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter((user) => user.name.toLowerCase().indexOf(name) !== -1);
  }

  if (distributionPoint.length) {
    inputData = inputData.filter((beneficiaries) =>
      distributionPoint.includes(beneficiaries.distributionPoint)
    );
  }

  if (status.length) {
    inputData = inputData.filter((beneficiaries) => status.includes(beneficiaries.status));
  }

  if (tokenAssignedStatus.length) {
    inputData = inputData.filter((beneficiaries) =>
      tokenAssignedStatus.includes(beneficiaries.tokensAssigned.toString())
    );
  }

  if (tokenClaimedStatus.length) {
    inputData = inputData.filter((beneficiaries) =>
      tokenClaimedStatus.includes(beneficiaries.tokensClaimed.toString())
    );
  }

  return inputData;
}
