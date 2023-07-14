import Iconify from '@components/iconify/iconify';
import { useBoolean } from '@hooks/use-boolean';
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
import { projectsList } from 'src/_mock/_project';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
import { IBeneficiaryClaimsDetails } from 'src/types/beneficiaries';
import BeneficiariesAssignProjectModal from './beneficiaries-assign-project-modal';
import BeneficiariesAssignTokenModal from './beneficiaries-assign-token-modal';

type Props = {
  data: IBeneficiaryClaimsDetails;
};
const copyBtn = {
  padding: '0 0 0 6px',
};

export default function BeneficiariesDetailsCard({ data }: Props) {
  const { claimedDate, receivedDate, walletAddress, claimedAmount, receivedAmount } = data;

  const { copy } = useCopyToClipboard();
  const assignProjectDialog = useBoolean();
  const assignTokenDialog = useBoolean();

  return (
    <Card>
      <BeneficiariesAssignProjectModal
        onClose={assignProjectDialog.onFalse}
        open={assignProjectDialog.value}
        onOk={() => {
          console.log('assigned');
        }}
        projects={projectsList}
      />
      <BeneficiariesAssignTokenModal
        onClose={assignTokenDialog.onFalse}
        open={assignTokenDialog.value}
        onOk={() => {
          console.log('assigned');
        }}
        projects={projectsList}
      />

      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="subtitle1">Claims Details</Typography>
          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={assignProjectDialog.onTrue}
            sx={{ fontSize: 'x-small' }}
          >
            Assign Project
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={assignTokenDialog.onTrue}
            sx={{ fontSize: 'x-small' }}
          >
            Assign Token
          </Button>

          <Button variant="outlined" size="small" color="error" sx={{ fontSize: 'x-small' }}>
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
