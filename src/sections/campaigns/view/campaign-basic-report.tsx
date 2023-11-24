import SummaryCard from '@components/summary-card';
import { Stack } from '@mui/system';

const CampaignBasicReport = ({ logs }) => {
  console.log('logs', logs);
  return (
    <Stack direction={'row'} spacing={2}>
      <SummaryCard subtitle="Total Calls" total={logs[0]?.details?.length} />
      <SummaryCard subtitle="Campaign Basic Report" total={0} />
    </Stack>
  );
};

export default CampaignBasicReport;
