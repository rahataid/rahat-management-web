import { Box, Card, CardContent, CardHeader, Chip, Stack, Typography } from '@mui/material';

const logsInfo = {
  date: '29 Nov, 2023',
  duration: 4,
  method: 'Call',
  attempts: 5,
};

export default function LogsDetailsInfoCard() {
  return (
    <Card>
      <CardHeader title="Latest Log" />
      <CardContent>
        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={12}
          flexWrap={'wrap'}
        >
          <Box>
            <Typography variant="body1">{logsInfo.date}</Typography>
            <Typography variant="caption">Date</Typography>
          </Box>
          <Box>
            <Typography variant="body1">{logsInfo.duration} seconds</Typography>
            <Typography variant="caption">Duration</Typography>
          </Box>
          <Box>
            <Typography variant="body1">{logsInfo.method}</Typography>
            <Typography variant="caption">Method</Typography>
          </Box>
          <Box>
            <Typography variant="body1">{logsInfo.attempts}</Typography>
            <Typography variant="caption">Total Attempts</Typography>
          </Box>
          <Box>
            <Chip sx={{ fontWeight: 'bold' }} label="Success" color="success" />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
