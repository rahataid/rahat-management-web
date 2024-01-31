import Iconify from '@components/iconify/iconify';
import LoadingButton from '@mui/lab/LoadingButton';
import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';

interface IProjectAlert {
  isApproved: boolean | undefined;
  tokenAllowance: number | undefined;
  tokenName: string | undefined;
  onTokenAccept: VoidFunction;
  loading: boolean;
}

const ProjectAlerts = ({
  isApproved = true,
  tokenAllowance = 0,
  tokenName = '',
  onTokenAccept,
  loading,
}: IProjectAlert) => {
  // if (!isApproved) {
  //   return (
  //     <Alert sx={{ mb: 2 }} title="" severity="warning">
  //       <AlertTitle>Waiting for approval</AlertTitle>
  //       Project has not yet been approved by the community.
  //     </Alert>
  //   );
  // }

  if (tokenAllowance > 0) {
    return (
      <Card sx={{ mb: 2 }}>
        <CardHeader
          action={
            <Stack>
              <LoadingButton variant="contained" onClick={onTokenAccept} loading={loading}>
                Accept
              </LoadingButton>
            </Stack>
          }
          title={
            <Stack direction="row" spacing={1}>
              <Iconify icon="charm:info" />
              <Typography variant="h6">Claim your tokens</Typography>
            </Stack>
          }
        />
        <CardContent>
          <Typography color="InfoText">
            You have{' '}
            <strong>
              {' '}
              {tokenAllowance} {tokenName}{' '}
            </strong>{' '}
            tokens remaining to be claimed
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return '';
};

export default ProjectAlerts;
