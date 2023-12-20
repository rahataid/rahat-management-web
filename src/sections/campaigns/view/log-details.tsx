'use client';

import Iconify from '@components/iconify';
import { useSettingsContext } from '@components/settings';
import { Container, Stack, Typography } from '@mui/material';
import { useParams, useRouter } from '@routes/hook';
import { useCampaignLogs, useCampaignLogsDetail } from 'src/api/campaigns';
import LogsDetailsInfoCard from '../logs-details-info-card';
import LogsDetailsTable from '../logs-details-table';

export default function LogDetails() {
  const settings = useSettingsContext();
  const router = useRouter();
  const params = useParams();
  const { logs } = useCampaignLogs(params.logId as unknown as number) || {};
  const logsDetail =
    useCampaignLogsDetail(
      logs?.rows?.[0]?.id as unknown as number,
      'phoneNumber',
      params.id as unknown as string
    ) || {};

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack sx={{ position: 'relative' }} marginBottom={5}>
        <Iconify
          sx={{ position: 'absolute', left: -50, bottom: 8, cursor: 'pointer' }}
          icon="mingcute:left-line"
          onClick={() => router.back()}
          width={30}
        />
        <Typography variant="h3">Logs Detail</Typography>
      </Stack>
      <Stack spacing={3}>
        <LogsDetailsInfoCard latestLog={logsDetail?.latestSummary} />
        <LogsDetailsTable data={logsDetail?.logs} />
      </Stack>
    </Container>
  );
}
