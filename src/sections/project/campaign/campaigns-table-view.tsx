'use client';

import { useCallback } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
// routes
import { useParams, useRouter } from 'src/routes/hook';
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
//
import { Button, Stack } from '@mui/material';
import { RouterLink } from '@routes/components';
import ProjectsService from '@services/projects';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useCampaigns } from 'src/api/campaigns';
import { useProject } from 'src/api/project';
import { ICampaignItem } from 'src/types/campaigns';
import CampaignsTableRow from './campaigns-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', width: 200 },
  { id: 'startTime', label: 'Start Time', width: 150 },
  { id: 'type', label: 'Type', width: 150 },
  { id: 'status', label: 'Status', width: 150 },
  { id: 'transport', label: 'Transport', width: 150 },
  { id: 'totalAudiences', label: 'Total Audiences', width: 150 },
  { id: '', width: 20 },
];

// ----------------------------------------------------------------------

export default function BeneficiariesListView() {
  const table = useTable();
  const { address } = useParams();
  const { project } = useProject(address);
  const { campaigns, meta } = useCampaigns(project?.campaigns);

  const params = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const denseHeight = table.dense ? 52 : 72;

  const notFound = !campaigns.length;

  const handleViewRow = useCallback(
    (id: number) => {
      router.push(paths.dashboard.general.campaigns.details(id));
    },
    [router]
  );

  const removeCampaign = useMutation({
    mutationFn: async (createData: number[]) => {
      const response = await ProjectsService.removeCampaignFromProject(address, createData);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error Removing Campaigns', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Project Campaign Removed Successfully', { variant: 'success' });
    },
  });

  const handleRemoveCampaignFromProject = () => {
    const ids = table.selected.map((id) => Number(id));
    removeCampaign.mutate(ids);
  };

  const handleEditRow = useCallback(
    (id: number) => {
      router.push(paths.dashboard.general.campaigns.edit(id));
    },
    [router]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Campaigns: List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.general.projects.campaignsadd(
              params.address as unknown as string
            )}
            variant="outlined"
            startIcon={<Iconify icon="mingcute:add-line" />}
            color="success"
          >
            Add Campaign
          </Button>
        }
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={campaigns.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                campaigns.map((row: ICampaignItem) => row.name.toString())
              )
            }
            action={
              <Stack direction="row" spacing={2.5}>
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Disable Beneficiary">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleRemoveCampaignFromProject}
                  >
                    Remove Campaign
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
                rowCount={campaigns.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    campaigns.map((row: ICampaignItem) => String(row.id))
                  )
                }
              />

              <TableBody>
                {campaigns.map((row: ICampaignItem) => (
                  <CampaignsTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(String(row.id))}
                    onEditRow={() => handleEditRow(row.id)}
                    onSelectRow={() => table.onSelectRow(String(row.id))}
                    onViewRow={() => handleViewRow(row.id)}
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
