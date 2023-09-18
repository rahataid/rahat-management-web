'use client';

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
import { useSnackbar } from 'notistack';
import { useBoolean } from '@hooks/use-boolean';
import { useCampaign, useCampaigns, useRemoveCampaign } from 'src/api/campaigns';
import { ICampaignItem, MenuOptions } from 'src/types/campaigns';
import CampaignsTableRow from './campaigns-table-row';
import CampaignDeleteModal from './campaigns-delete-modal';

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
  const { campaigns, meta } = useCampaigns();
  const { campaign } = useCampaign(table.selected[0]);

  const { push } = useRouter();

  const router = useRouter();

  const settings = useSettingsContext();
  const assignCampaignDialog = useBoolean();

  const { enqueueSnackbar } = useSnackbar();

  const deleteCampaign = useRemoveCampaign();

  const denseHeight = table.dense ? 52 : 72;

  const notFound = !campaigns.length;

  const handleViewRow = useCallback(
    (id: number) => {
      push(paths.dashboard.general.campaigns.details(id));
    },
    [push]
  );

  const handleEditRow = useCallback(
    (id: number) => {
      push(paths.dashboard.general.campaigns.edit(id));
    },
    [push]
  );

  const handleRemoveCampaign = () => {
    const id = table.selected;
    if (id.length > 1) {
      enqueueSnackbar('Please select only one campaign at a time', { variant: 'error' });
      return;
    }
    if (campaign?.communicationLogs?.length > 0) {
      enqueueSnackbar('Cannot delete triggered campaign', { variant: 'error' });
      return;
    }
    deleteCampaign.mutate(id[0]);
    table.onSelectAllRows(false, []);
  };
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
      <CampaignDeleteModal
        onClose={assignCampaignDialog.onFalse}
        open={assignCampaignDialog.value}
        onOk={() => {
          handleRemoveCampaign();
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
              href={paths.dashboard.general.campaigns.add}
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
                .filter((o: any) => o.show)
                .map((option: any) => (
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
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={assignCampaignDialog.onTrue}>
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
                {campaigns.map((row) => (
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
