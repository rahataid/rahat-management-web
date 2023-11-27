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
import { Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useParams } from 'next/navigation';
import { useCampaign, useCampaignLogs } from 'src/api/campaigns';
import CampaignReportPhoneTable from './campaign-report-table';

const CampaignsLogsDetailsView = () => {
  const settings = useSettingsContext();
  const params = useParams();
  const { campaign } = useCampaign(params.id) || {};
  const { logs } = useCampaignLogs(params.id as unknown as number) || {};

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="column" spacing={2}>
        {campaign?.transport?.name === 'Voxcrow' &&
        logs?.rows &&
        !isEmpty(logs.rows[0]?.details) ? (
          <CampaignReportPhoneTable data={logs.rows[0].details} />
        ) : logs?.rows && logs.rows.length > 0 ? (
          <JsonToTable json={logs.rows} />
        ) : (
          <>
            <Typography variant="h4">No Logs Found for this campaign</Typography>
            <Typography variant="caption">PS: Campaign should be triggerd to show logs</Typography>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default CampaignsLogsDetailsView;
