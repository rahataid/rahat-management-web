import TruncatedAddressButton from '@components/wallet-address-button';
import { useBoolean } from '@hooks/use-boolean';
import { RSErrorData } from '@hooks/user-error-handler';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { paths } from '@routes/paths';
import BeneficiaryService from '@services/beneficiaries';
import useProjectContract from '@services/contracts/useProject';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDisableBeneficiaries } from 'src/api/beneficiaries';
import { useProjects } from 'src/api/project';
import { useRouter } from 'src/routes/hook';
import { IAssignProjectDetails, IAssignProjectItem } from 'src/types/beneficiaries';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
import BeneficiariesAssignTokenModal from './beneficiaries-assign-token-modal';
import BeneficiariesAssignProjectModal from './beneficiaries-assign-project-modal';
import BeneficiaryDeleteModal from '../beneficiaries-delete-modal';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const assignProjectDialog = useBoolean();
  const assignTokenDialog = useBoolean();
  const removeBeneficiaryDialog = useBoolean();
  const { projects } = useProjects();
  const { uuid } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { assignClaimsToBeneficiaries, addBeneficiaryToProject } = useProjectContract();
  const disableBeneficiary = useDisableBeneficiaries();
  const router = useRouter();

  const { mutateAsync } = useMutation<IAssignProjectDetails, RSErrorData, IAssignProjectItem>({
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

  const handleProjectAssign = async (data: IAssignProjectItem) => {
    const added = await addBeneficiaryToProject(walletAddress);

    if (added) {
      await mutateAsync(data);
      assignProjectDialog.onFalse();
    }
  };

  const handleBeneficiaryTokenAssign = async (token: string) => {
    const assigned = await assignClaimsToBeneficiaries(walletAddress, token);
    if (assigned) assignTokenDialog.onFalse();
    // }
  };
  const handleBeneficiaryDelete = () => {
    disableBeneficiary.mutate(walletAddress);
    router.push(paths.dashboard.general.beneficiaries.list);
  };

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
          <BeneficiaryDeleteModal
            open={removeBeneficiaryDialog.value}
            onClose={removeBeneficiaryDialog.onFalse}
            onOk={handleBeneficiaryDelete}
          />
          <Typography variant="subtitle1">Claims Details</Typography>
          <IconButton
            onClick={handleMenuOpen}
            sx={{ position: 'absolute', top: '5px', right: '5px' }}
          >
            <Icon icon="zondicons:dots-horizontal-triple" />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
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

              <Button
                variant="outlined"
                size="small"
                color="error"
                sx={{ fontSize: 'x-small' }}
                onClick={removeBeneficiaryDialog.onTrue}
              >
                Delete
              </Button>
            </Stack>
          </Popover>
        </Stack>
        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={5}
        >
          <Typography variant="body2">Claimed</Typography>

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
