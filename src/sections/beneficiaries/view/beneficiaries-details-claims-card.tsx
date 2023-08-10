import TruncatedAddressButton from '@components/wallet-address-button';
import { useBoolean } from '@hooks/use-boolean';
import { RSErrorData } from '@hooks/user-error-handler';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import BeneficiaryService from '@services/beneficiaries';
import useProjectContract from '@services/contracts/useProject';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useProjects } from 'src/api/project';
import { IAssignProjectDetails, IAssignProjectItem } from 'src/types/beneficiaries';
import BeneficiariesAssignProjectModal from './beneficiaries-assign-project-modal';
import BeneficiariesAssignTokenModal from './beneficiaries-assign-token-modal';

interface IBeneficiaryClaimsDetails {
  walletAddress: string;
  balance: number;
  tokenAllowance: number;
}

export default function BeneficiariesDetailsCard({
  walletAddress,
  balance,
  tokenAllowance,
}: IBeneficiaryClaimsDetails) {
  const assignProjectDialog = useBoolean();
  const assignTokenDialog = useBoolean();
  const { projects } = useProjects();
  const { uuid } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { assignClaimsToBeneficiaries, activateBeneficiary } = useProjectContract();

  const { mutate } = useMutation<IAssignProjectDetails, RSErrorData, IAssignProjectItem>({
    mutationFn: async (updateData: IAssignProjectItem) => {
      const response = await BeneficiaryService.assignProject(uuid, updateData);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error Assigning Project', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Project Assigned Successfully', { variant: 'success' });
    },
  });

  const handleProjectAssign = (data: IAssignProjectItem) => mutate(data);

  const handleBeneficiaryTokenAssign = async (token: string) => {
    const activated = await activateBeneficiary(walletAddress);
    console.log('activated', activated);

    // console.log('activated', activated);
    // if (activated) {
    const assigned = await assignClaimsToBeneficiaries(walletAddress, token);
    console.log('assigned', assigned);

    // }
  };

  return (
    <Card>
      <BeneficiariesAssignProjectModal
        onClose={assignProjectDialog.onFalse}
        open={assignProjectDialog.value}
        onOk={handleProjectAssign}
        projects={projects}
      />
      <BeneficiariesAssignTokenModal
        onClose={assignTokenDialog.onFalse}
        open={assignTokenDialog.value}
        onOk={handleBeneficiaryTokenAssign}
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
          <Typography variant="body2">Claimed</Typography>

          <Typography variant="body2">Jan 16, 2023</Typography>

          <Typography variant="body2">{tokenAllowance.toString()}</Typography>
        </Stack>
        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={5}
        >
          <Typography variant="body2">Received</Typography>

          <Typography variant="body2">Jan 16, 2023</Typography>

          <Typography variant="body2">{balance.toString()}</Typography>
        </Stack>
        <Stack sx={{ p: 2 }} direction="row" alignItems="center" spacing={5}>
          <Typography variant="body2">Wallet</Typography>

          <TruncatedAddressButton address={walletAddress} />
        </Stack>
      </CardContent>
    </Card>
  );
}
