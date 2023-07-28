import TruncatedAddressButton from '@components/wallet-address-button';
import { useBoolean } from '@hooks/use-boolean';
import { IApiResponseError } from '@hooks/user-error-handler';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import BeneficiaryService from '@services/beneficiaries';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useProjects } from 'src/api/project';
import {
  IAssignProjectDetails,
  IAssignProjectItem,
  IBeneficiaryClaimsDetails,
} from 'src/types/beneficiaries';
import BeneficiariesAssignProjectModal from './beneficiaries-assign-project-modal';
import BeneficiariesAssignTokenModal from './beneficiaries-assign-token-modal';

export default function BeneficiariesDetailsCard({ walletAddress }: IBeneficiaryClaimsDetails) {
  const assignProjectDialog = useBoolean();
  const assignTokenDialog = useBoolean();
  const { projects } = useProjects();
  const { uuid } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const { error, isLoading, mutate } = useMutation<
    IAssignProjectDetails,
    IApiResponseError,
    IAssignProjectItem
  >({
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

  const handleProjectAssign = (data) => mutate(data);

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
        onOk={() => {
          console.log('assigned');
        }}
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

          <Typography variant="body2">{20}</Typography>
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

          <Typography variant="body2">{200}</Typography>
        </Stack>
        <Stack sx={{ p: 2 }} direction="row" alignItems="center" spacing={5}>
          <Typography variant="body2">Wallet</Typography>

          <TruncatedAddressButton address={walletAddress} />
        </Stack>
      </CardContent>
    </Card>
  );
}
