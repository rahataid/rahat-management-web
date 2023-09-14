'use client';

import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useMemo, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
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
  IBeneficiariesTableFilterValue,
  IBeneficiaryApiFilters,
} from 'src/types/beneficiaries';
//
import { Button, Stack } from '@mui/material';
import { RouterLink } from '@routes/components';
import BeneficiaryService from '@services/beneficiaries';
import useProjectContract from '@services/contracts/useProject';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import {
  bankStatusOptions,
  internetAccessOptions,
  phoneStatusOptions,
} from 'src/_mock/_beneficiaries';
import { useBeneficiaries } from 'src/api/beneficiaries';
import useAuthStore from 'src/store/auths';
import BeneficiariesAssignProjectModal from './assign-project-modal';
import BeneficiariesTableFiltersResult from './beneficiaries-table-filters-result';
import BeneficiariesTableRow from './beneficiaries-table-row';
import BeneficiariesTableToolbar from './beneficiaries-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', width: 200 },
  { id: 'projects', label: 'Projects Involved', width: 250 },
  { id: 'internetAccess', label: 'Internet Access', width: 150 },
  { id: 'phoneOwnership', label: 'Phone', width: 150 },
  { id: 'bankStatus', label: 'Bank', width: 150 },
  { id: '', width: 20 },
];

// ----------------------------------------------------------------------

export default function BeneficiariesListView() {
  const table = useTable();
  const roles = useAuthStore((state) => state.role);

  const defaultFilters: IBeneficiaryApiFilters = useMemo(
    () => ({
      internetAccess: '',
      bankStatus: '',
      phoneOwnership: '',
      name: '',
      perPage: table.rowsPerPage,
      page: table.page + 1,
      orderBy: table.orderBy,
      order: table.order,
    }),
    [table.order, table.orderBy, table.page, table.rowsPerPage]
  );
  const [filters, setFilters] = useState(defaultFilters);
  const { beneficiaries, meta } = useBeneficiaries(filters);
  const { multiAssignBenToProject } = useProjectContract();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { enqueueSnackbar } = useSnackbar();

  const { push } = useRouter();

  const createQueryString = useCallback((params: Record<string, string | number | boolean>) => {
    const queryParams = Object.entries(params)
      .filter(([_, value]) => Boolean(value))
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return queryParams === '' ? '' : `${queryParams}`;
  }, []);

  const settings = useSettingsContext();

  const router = useRouter();

  const bulkBeneficiaryImport = useBoolean();
  const bulkProjectAssign = useBoolean();

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

      const updatedParams = {
        ...filters,
        ...Object.fromEntries(searchParams.entries()),
        [name]: value,
      };
      const queryString = createQueryString(updatedParams);
      push(`${pathname}?${queryString}`);
    },
    [table, createQueryString, push, searchParams, filters, pathname]
  );

  const disableBeneficiary = useMutation({
    mutationFn: async (walletAddress: string) => {
      const res = await BeneficiaryService.disable(walletAddress);
      return res.data;
    },
    onError: () => {
      enqueueSnackbar('Error Disabling Beneficiary ', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Beneficiary Disabled Successfully', { variant: 'success' });
      push(paths.dashboard.general.beneficiaries.list);
    },
  });

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
    push(pathname);
  }, [push, defaultFilters, pathname]);

  const handleViewRow = useCallback(
    (uuid: string) => {
      router.push(paths.dashboard.general.beneficiaries.details(uuid));
    },
    [router]
  );

  const handleEditRow = useCallback(
    (uuid: string) => {
      router.push(paths.dashboard.general.beneficiaries.edit(uuid));
    },
    [router]
  );

  const handleBeneficiaryBulkAdd = (data: any, file: File) => {
    console.log(data);
  };

  const handleBulkAssignProjects = useCallback((selected: string[]) => {
    console.log('selected', selected);
  }, []);

  const walletAddresses1 = table.selected;
  console.log(walletAddresses1, 'walletAddresses');

  const handleDisableBeneficiary = () => {
    const walletAddresses = table.selected;
    console.log(walletAddresses, 'walletAddresses');

    walletAddresses.forEach(async (walletAddress) => {
      disableBeneficiary.mutate(walletAddress);
    });
  };

  useEffect(() => {
    const searchFilters: IBeneficiaryApiFilters = {
      ...defaultFilters,
      ...Object.fromEntries(searchParams.entries()),
    };
    setFilters(searchFilters);
  }, [searchParams, table.order, table.orderBy, table.page, table.rowsPerPage, defaultFilters]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <BeneficiariesAssignProjectModal
        open={bulkProjectAssign.value}
        onClose={bulkProjectAssign.onFalse}
        onOk={handleBulkAssignProjects}
        selected={table.selected}
      />
      <CustomBreadcrumbs
        heading="Beneficiaries: List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <Stack spacing={2} direction="row">
            {/* <BeneficiariesSpreedsheetImport
              onSubmit={handleBeneficiaryBulkAdd}
              isOpen={bulkBeneficiaryImport.value}
              handleOpenClose={bulkBeneficiaryImport.onToggle}
            /> */}
            <Button
              component={RouterLink}
              href={paths.dashboard.general.beneficiaries.add}
              variant="outlined"
              startIcon={<Iconify icon="mingcute:add-line" />}
              color="success"
            >
              Add Beneficiary
            </Button>
          </Stack>
        }
      />

      <Card>
        <BeneficiariesTableToolbar
          filters={filters}
          onFilters={handleFilters}
          internetAccessOptions={internetAccessOptions}
          bankStatusOptions={bankStatusOptions}
          phoneStatusOptions={phoneStatusOptions}
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
                beneficiaries.map((row: IBeneficiariesItem) => row.walletAddress.toString())
              )
            }
            action={
              <Stack direction="row" spacing={2.5}>
                <Tooltip title="Assign Tokens in bulk">
                  <Button variant="outlined" color="primary" onClick={bulkProjectAssign.onTrue}>
                    Assign Project
                  </Button>
                </Tooltip>
                <Tooltip title="Disable Beneficiary">
                  <Button variant="outlined" color="primary" onClick={handleDisableBeneficiary}>
                    Disable Beneficiary
                  </Button>
                </Tooltip>
              </Stack>
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
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    beneficiaries.map((row: IBeneficiariesItem) => row.walletAddress)
                  )
                }
              />

              <TableBody>
                {beneficiaries.map((row: IBeneficiariesItem) => (
                  <BeneficiariesTableRow
                    key={row.walletAddress}
                    row={row}
                    onViewRow={() => handleViewRow(row.uuid)}
                    onEditRow={() => handleEditRow(row.uuid)}
                    selected={table.selected.includes(row.walletAddress)}
                    onSelectRow={() => table.onSelectRow(row.walletAddress)}
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
