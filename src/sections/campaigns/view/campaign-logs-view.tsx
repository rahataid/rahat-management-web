'use client';

// @mui
import Container from '@mui/material/Container';
// routes
// _mock
// hooks
// components
// types
//
import { useSettingsContext } from '@components/settings';
import JsonToTable from '@components/table/json-table';
import { Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useParams } from 'next/navigation';
import { useCampaign, useCampaignLogs } from 'src/api/campaigns';
import VoxcrowCampaignReportPhoneTable from './campaign-report-table';

const CampaignsLogsDetailsView = () => {
  const settings = useSettingsContext();
  const params = useParams();
  const { campaign } = useCampaign(params.id) || {};
  const { logs } = useCampaignLogs(params.id as unknown as number) || {};

  const renderLogs = (transportType: string) => {
    console.log('transportType', transportType);
    switch (transportType) {
      case 'Voxcrow':
        return !isEmpty(logs?.rows?.[0]?.details) ? (
          <VoxcrowCampaignReportPhoneTable data={logs.rows[0].details} />
        ) : (
          <>
            <Typography variant="h4">No Logs Found for this campaign</Typography>
            <Typography variant="caption">PS: Campaign should be triggerd to show logs</Typography>
          </>
        );

      case 'Prabhu':
        const data = logs?.rows.map((item) => ({
          audiencePhone: item.audience?.details?.phone,
          status: item.status,
          id: item?.id,
        }));

        return (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item) => (
                <TableRow key={item?.id}>
                  <TableCell>{item.audiencePhone}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );

      default:
        return <JsonToTable json={logs?.rows} />;
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="column" spacing={2}>
        {
          renderLogs(campaign?.transport?.name)
          //   campaign?.transport?.name === 'Voxcrow' &&
          // logs?.rows &&
          // !isEmpty(logs.rows[0]?.details) ? (
          //   <VoxcrowCampaignReportPhoneTable data={logs.rows[0].details} />
          // ) : logs?.rows && logs.rows.length > 0 ? (
          //   <JsonToTable json={logs.rows} />
          // )
          // :
          // (
          //   <>
          //     <Typography variant="h4">No Logs Found for this campaign</Typography>
          //     <Typography variant="caption">PS: Campaign should be triggerd to show logs</Typography>
          //   </>
          // )
        }
      </Stack>
    </Container>
  );
};

export default CampaignsLogsDetailsView;
