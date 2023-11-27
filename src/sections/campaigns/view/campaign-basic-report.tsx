import SummaryCard from '@components/summary-card';
import { Stack } from '@mui/system';

const CampaignBasicReport = ({ logs }) => {
  console.log('logs', logs);
  return (
    <Stack direction={'row'} spacing={2}>
      {logs?.[0]?.totalSuccessfulAnswer && (
        <SummaryCard subtitle="Total Success" total={0 || logs?.[0].totalSuccessfulAnswer} />
      )}
      {logs?.[0]?.totalFailure && (
        <SummaryCard subtitle="Total Failure" total={0 || logs?.[0].totalFailure} />
      )}
    </Stack>
  );
};

export default CampaignBasicReport;
