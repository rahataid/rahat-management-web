import Iconify from '@components/iconify/iconify';
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { IBeneficiaryClaimsDetails } from 'src/types/beneficiaries';

type Props = {
  data: IBeneficiaryClaimsDetails;
};

const copyBtn = {
  padding: '0 0 0 6px',
};

export default function BeneficiariesDetailsCard({ data }: Props) {
  const { claimedDate, receivedDate, walletAddress, claimedAmount, receivedAmount } = data;

  const { copy } = useCopyToClipboard();

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="subtitle1">Claims Details</Typography>
          <Button variant="outlined" color="success">
            Assign Project
          </Button>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </Stack>
        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={5}
        >
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">Claimed</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">{claimedDate}</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">{claimedAmount}</Typography>
          </Grid>
        </Stack>
        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={5}
        >
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">Received</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">{receivedDate}</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">{receivedAmount}</Typography>
          </Grid>
        </Stack>
        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={5}
        >
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">Wallet</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography color="#118D57" variant="body2" sx={{ fontWeight: 'bold' }}>
              {walletAddress}
            </Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Tooltip title="Copy Address" placement="top" arrow>
              <IconButton sx={copyBtn} color="success" onClick={() => copy(walletAddress)}>
                <Iconify icon="ph:copy" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
