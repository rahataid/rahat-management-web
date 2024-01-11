import { Box, Card, CardContent, CardHeader, Chip, Stack, Typography } from '@mui/material';
import { fDateTime } from '@utils/format-time';

export default function LogsDetailsInfoCard({ latestLog }: any) {
  return (
    <Card>
      <CardHeader title="Latest Attempt" />
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
            <Typography variant="body1">
              {fDateTime(latestLog?.callDate, 'dd MMM, yyyy p')}
            </Typography>
            <Typography variant="caption">Date</Typography>
          </Box>
          <Box>
            <Typography variant="body1">{latestLog?.duration} seconds</Typography>
            <Typography variant="caption">Duration</Typography>
          </Box>
          <Box>
            <Typography variant="body1">Call</Typography>
            <Typography variant="caption">Method</Typography>
          </Box>
          <Box>
            <Typography variant="body1">{latestLog?.attempts}</Typography>
            <Typography variant="caption">Total Attempts</Typography>
          </Box>
          <Box>
            <Chip
              sx={{ fontWeight: 'bold' }}
              label={latestLog?.disposition === 'ANSWERED' ? 'Success' : 'Fail'}
              color={latestLog?.disposition === 'ANSWERED' ? 'success' : 'error'}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
