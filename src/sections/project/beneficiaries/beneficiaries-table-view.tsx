'use client';

import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useMemo, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
// routes
import { useParams, usePathname, useRouter, useSearchParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { useProjectBeneficiaries, useRemoveBeneficiaries } from 'src/api/project';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  useTable,
} from 'src/components/table';
// types
import { IBeneficiariesTableFilterValue, IBeneficiaryApiFilters } from 'src/types/beneficiaries';
//
import { ConfirmDialog } from '@components/custom-dialog';
import { Button, Stack } from '@mui/material';
import { RouterLink } from '@routes/components';
import useProjectContract from '@services/contracts/useProject';
import { Contract } from 'ethers';
import { useSnackbar } from 'notistack';
import {
  bankStatusOptions,
  internetAccessOptions,
  phoneStatusOptions,
} from 'src/_mock/_beneficiaries';
import { IProjectBeneficiariesItem } from 'src/types/project';
import BeneficiariesAssignTokenModal from './assign-tokens-model';
import BeneficiariesTableFiltersResult from './beneficiaries-table-filters-result';
import BeneficiariesTableRow from './beneficiaries-table-row';
import BeneficiariesTableToolbar from './beneficiaries-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'internetAccess', label: 'Internet Access' },
  { id: 'phoneOwnership', label: 'Phone' },
  { id: 'bankStatus', label: 'Bank' },
  { id: 'isApproved', label: 'Approval' },
  { id: 'gender', label: 'Gender' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function ProjectBeneficiariesListView() {
  const { address } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const { beneficiaries, meta } = useProjectBeneficiaries(address);
  const table = useTable();
  const bulkAssignTokensModal = useBoolean();
  const rmvBeneficiaries = useBoolean();

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
  const { multiAssignClaimsToBeneficiary, projectContract } = useProjectContract();

  const searchParams = useSearchParams();
  const pathname = usePathname();

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

  const handleBulkAssignTokens = useCallback(
    async (selected: string[], tokenCount: string) => {
      const assign = await multiAssignClaimsToBeneficiary(
        selected,
        tokenCount,
        projectContract as Contract
      );

      if (assign) {
        bulkAssignTokensModal.onFalse();
        enqueueSnackbar(`${tokenCount} Tokens Assigned to ${selected.length} beneficiaries`, {
          variant: 'success',
        });
      }
    },
    [bulkAssignTokensModal, enqueueSnackbar, multiAssignClaimsToBeneficiary, projectContract]
  );
  useEffect(() => {
    const searchFilters: IBeneficiaryApiFilters = {
      ...defaultFilters,
      ...Object.fromEntries(searchParams.entries()),
    };
    setFilters(searchFilters);
  }, [searchParams, table.order, table.orderBy, table.page, table.rowsPerPage, defaultFilters]);

  const removeBeneficiaries = useRemoveBeneficiaries(address);
  //   const handleRemoveBeneficiariesFromProject = () => {
  //   const id = table.selected.map((id) => id);
  //   removeBeneficiaries.mutate(id);
  //   table.onSelectAllRows(false, []);
  // };

  const handleRemoveBeneficiariesFromProject = useCallback(async () => {
    const id = table.selected.map((id) => id);
    removeBeneficiaries.mutate(id);
    table.onSelectAllRows(false, []);
    rmvBeneficiaries.onFalse();
  }, [removeBeneficiaries, table, rmvBeneficiaries]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <BeneficiariesAssignTokenModal
        open={bulkAssignTokensModal.value}
        onClose={bulkAssignTokensModal.onFalse}
        onOk={handleBulkAssignTokens}
        selected={table.selected}
      />

      <ConfirmDialog
        open={rmvBeneficiaries.value}
        title="Selected Beneficiaries will be disconnected"
        action={
          <Button variant="text" onClick={handleRemoveBeneficiariesFromProject} autoFocus>
            Disconnect
          </Button>
        }
        onClose={rmvBeneficiaries.onFalse}
      />
      <CustomBreadcrumbs
        heading="Project Beneficiaries: List"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Projects', href: paths.dashboard.general.projects.list },
          { name: 'List' },
        ]}
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
                beneficiaries.map((row) => row.walletAddress)
              )
            }
            action={
              <Stack direction="row" spacing={2.5}>
                <Tooltip title="Disconnect">
                  <IconButton color="primary" onClick={rmvBeneficiaries.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Assign Tokens in bulk">
                  <Button variant="outlined" color="primary" onClick={bulkAssignTokensModal.onTrue}>
                    Assign Tokens
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
                    beneficiaries.map((row: IProjectBeneficiariesItem) => row.walletAddress)
                  )
                }
              />

              <TableBody>
                {beneficiaries.map((row: IProjectBeneficiariesItem) => (
                  <BeneficiariesTableRow
                    key={row.walletAddress}
                    row={row}
                    onViewRow={() => handleViewRow(row.uuid)}
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
