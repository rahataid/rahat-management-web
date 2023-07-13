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
import { usePathname, useRouter, useSearchParams } from 'src/routes/hook';
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
  internetAccessOptions,
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
  { id: 'name', label: 'Name', width: 250 },
  { id: 'internetStatus', label: 'Internet Access', width: 200 },
  { id: 'phoneStatus', label: 'Phone', width: 200 },
  { id: 'bankStatus', label: 'Bank', width: 200 },
  { id: 'tokensAssigned', label: 'Tokens Assigned', width: 200 },
  { id: 'tokensClaimed', label: 'Tokens Claimed', width: 200 },
  { id: '', width: '88px', align: 'center' },
];

const defaultFilters: IBeneficiariesTableFilters = {
  internetAccess: '',
  status: [],
  tokenAssignedStatus: [],
  tokenClaimedStatus: [],
  name: '',
};

// ----------------------------------------------------------------------

export default function BeneficiariesListView() {
  const table = useTable();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const [filters, setFilters] = useState(defaultFilters);

  // const [apiFilters, setApiFilters] = useState<IBeneficiaryApiFilters>({});

  // const createQueryString = useCallback((params: Record<string, string | number | boolean>) => {
  //   const queryParams = Object.entries(params)
  //     .filter(([_, value]) => Boolean(value))
  //     .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  //     .join('&');

  //   return queryParams === '' ? '' : `${queryParams}`;
  // }, []);

  const { beneficiaries, meta } = useBeneficiaries({
    perPage: table.rowsPerPage,
    page: table.page + 1,
    orderBy: table.orderBy,
    order: table.order,
  });

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!beneficiaries.length && canReset) || !beneficiaries.length;

  const handleFilters = useCallback(
    (name: string, value: IBeneficiariesTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // const updatedParams = {
      //   ...filters,
      //   ...Object.fromEntries(searchParams.entries()),
      //   [name]: value,
      // };
      // const queryString = createQueryString(updatedParams);
      // push(`${paths.dashboard.general.beneficiaries.list}?${queryString}`);
    },
    [
      table,
      // createQueryString, push, searchParams, filters
    ]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
    push(paths.dashboard.general.beneficiaries.list);
  }, [push]);

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
            href={paths.dashboard.general.beneficiaries.add}
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
          internetAccessOptions={internetAccessOptions}
          statusOptions={statusFilterOptions}
          tokenAssignedOptions={tokenAssignedFilterOptions}
          tokenClaimedOptions={tokenClaimedFilterOptions}
        />

        {canReset && (
          <BeneficiariesTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={beneficiaries.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={beneficiaries.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                beneficiaries.map((row: IBeneficiariesItem) => row.name.toString())
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
                rowCount={beneficiaries.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {beneficiaries.map((row: IBeneficiariesItem) => (
                  <BeneficiariesTableRow
                    key={row.walletAddress}
                    row={row}
                    onViewRow={() => handleViewRow(row.walletAddress)}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table?.page, table?.rowsPerPage, meta?.total || 0)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={meta?.total || 0}
          page={table.page}
          rowsPerPage={table?.rowsPerPage}
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
