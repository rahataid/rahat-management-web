'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import Iconify from '@components/iconify/iconify';
import Scrollbar from '@components/scrollbar';
import { useSettingsContext } from '@components/settings';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  emptyRows,
  useTable,
} from '@components/table';
import { useBoolean } from '@hooks/use-boolean';
import {
  Button,
  Card,
  Container,
  // IconButton,
  // ListItemIcon,
  // Menu,
  // MenuItem,
  Stack,
  Table,
  TableBody,
  TableContainer,
} from '@mui/material';
import { RouterLink } from '@routes/components';
import { useRouter } from '@routes/hook';
import { paths } from '@routes/paths';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useCampaigns, useRemoveCampaign } from 'src/api/campaigns';
import { ICampaignItem } from 'src/types/campaigns';
import CampaignDeleteModal from '../campaigns-delete-modal';
import CampaignsTableRow from '../campaigns-table-row';

const TABLE_HEAD = [
  { id: 'name', label: 'Campaigns ', width: 200 },
  { id: 'startTime', label: 'Start Time', width: 150 },
  { id: 'status', label: 'Status', width: 150 },
  { id: 'transport', label: 'Transport', width: 150 },
  { id: 'totalAudiences', label: 'Total Audiences', width: 150 },
  { id: 'actions', label: 'Actions', width: 20 },
];

export default function CallLogsList() {
  // const [isOpen, setOpen] = useState<null | HTMLElement>(null);
  const settings = useSettingsContext();
  const { push } = useRouter();
  // const router = useRouter();
  const table = useTable();
  const denseHeight = table.dense ? 52 : 72;
  const { enqueueSnackbar } = useSnackbar();
  const { campaigns } = useCampaigns();
  const phoneCampaign = campaigns?.filter((campaign) => campaign.type === 'PHONE');
  const notFound = !phoneCampaign.length;
  const deleteCampaign = useRemoveCampaign();
  const assignCampaignDialog = useBoolean();

  const handleViewRow = useCallback(
    (id: number) => {
      push(paths.dashboard.general.campaigns.callLogDetail(id));
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
    const id = table?.selected;
    if (id.length > 1) {
      enqueueSnackbar('Please select only one campaign at a time', { variant: 'error' });
      return;
    }
    // if (campaign?.communicationLogs?.length > 0 || campaign?.status === 'COMPLETED') {
    //   enqueueSnackbar('Cannot delete triggered campaign', { variant: 'error' });
    //   return;
    // }
    deleteCampaign.mutate(id[0]);
    table.onSelectAllRows(false, []);
  };

  // const options: MenuOptions = [
  //   {
  //     title: 'Upload Audio',
  //     onClick: () => {
  //       router.push(paths.dashboard.general.campaigns.uploadMp3);
  //     },
  //     icon: 'mdi:upload',
  //     show: true,
  //   },
  // ];

  // const handleClose = useCallback(() => {
  //   setOpen(null);
  // }, []);

  // const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
  //   setOpen(event.currentTarget);
  // }, []);

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
        heading="Communication: Voice"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Voice' }]}
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
            {/* <Button
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
            </Menu> */}
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
            // action={
            //   <Tooltip title="Delete">
            //     <IconButton color="primary" onClick={assignCampaignDialog.onTrue}>
            //       <Iconify icon="solar:trash-bin-trash-bold" />
            //     </IconButton>
            //   </Tooltip>
            // }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={phoneCampaign?.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    phoneCampaign?.map((row: ICampaignItem) => String(row.id))
                  )
                }
              />

              <TableBody>
                {phoneCampaign?.map((row) => (
                  <CampaignsTableRow
                    key={row?.id}
                    row={row}
                    selected={table.selected.includes(String(row?.id))}
                    onEditRow={() => handleEditRow(row?.id)}
                    onSelectRow={() => table.onSelectRow(String(row?.id))}
                    onViewRow={() => handleViewRow(row?.id)}
                  />
                ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table?.page, table?.rowsPerPage, phoneCampaign?.length || 0)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={phoneCampaign?.length || 0}
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
