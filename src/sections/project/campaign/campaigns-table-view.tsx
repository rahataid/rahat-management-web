'use client';

import { useCallback, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
// routes
import { useParams, useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
// hooks
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
import { Button, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { RouterLink } from '@routes/components';
import { useCampaigns } from 'src/api/campaigns';
import { useBoolean } from '@hooks/use-boolean';
import { useProject, useProjectRemoveCampaign } from 'src/api/project';
import { ICampaignItem, MenuOptions } from 'src/types/campaigns';
import CampaignsTableRow from './campaigns-table-row';
import ProjectCampaignDeleteModal from './project-campaigns-delete-modal';

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
  const [isOpen, setOpen] = useState<null | HTMLElement>(null);
  const table = useTable();
  const { address } = useParams();
  const { project } = useProject(address);
  const { campaigns, meta } = useCampaigns(project?.campaigns);

  const params = useParams();

  const router = useRouter();

  const settings = useSettingsContext();
  const assignCampaignDialog = useBoolean();

  const denseHeight = table.dense ? 52 : 72;

  const notFound = !campaigns.length;

  const handleViewRow = useCallback(
    (id: number) => {
      router.push(paths.dashboard.general.campaigns.details(id));
    },
    [router]
  );

  const removeCampaign = useProjectRemoveCampaign();

  const handleRemoveCampaignFromProject = () => {
    const ids = table.selected.map((id) => Number(id));
    removeCampaign.mutate({ address, ids });
    table.onSelectAllRows(false, []);
  };

  const handleEditRow = useCallback(
    (id: number) => {
      router.push(paths.dashboard.general.campaigns.edit(id));
    },
    [router]
  );

  const options: MenuOptions = [
    {
      title: 'Upload Mp3',
      onClick: () => {
        router.push(paths.dashboard.general.campaigns.uploadMp3);
      },
      icon: 'mdi:upload',
      show: true,
    },
  ];

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <ProjectCampaignDeleteModal
        onClose={assignCampaignDialog.onFalse}
        open={assignCampaignDialog.value}
        onOk={() => {
          handleRemoveCampaignFromProject();
        }}
      />
      <CustomBreadcrumbs
        heading="Campaigns: List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <Stack direction="row" spacing={3}>
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
            <Button
              variant="outlined"
              onClick={handleOpen}
              endIcon={
                isOpen ? <Iconify icon="mingcute:up-line" /> : <Iconify icon="mingcute:down-line" />
              }
              color="success"
            >
              Campaign Settings
            </Button>
            <Menu id="simple-menu" anchorEl={isOpen} onClose={handleClose} open={Boolean(isOpen)}>
              {options
                .filter((o) => o.show)
                .map((option) => (
                  <MenuItem key={option.title} onClick={option.onClick}>
                    <ListItemIcon>{option.icon && <Iconify icon={option.icon} />}</ListItemIcon>
                    <Typography variant="body2" color="text.secondary">
                      {option.title}
                    </Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Stack>
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
                <Tooltip title="Remove Campaign From Project">
                  <Button variant="outlined" color="primary" onClick={assignCampaignDialog.onTrue}>
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
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>
    </Container>
  );
}
