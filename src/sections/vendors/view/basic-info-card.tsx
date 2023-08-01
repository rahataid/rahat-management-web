import Iconify from '@components/iconify/iconify';
import { useBoolean } from '@hooks/use-boolean';
import { useCopyToClipboard } from '@hooks/use-copy-to-clipboard';
import { Button, Card, CardContent, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { truncateEthAddress } from '@utils/strings';
import { useCallback, useState } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import { IVendorDetails } from 'src/types/vendors';
import VendorAssignTokenModal from './vendors-assign-token-modal';

type Props = {
  data: IVendorDetails;
};
const copyBtn = {
  padding: '0 0 0 6px',
};

const BasicInfoCard = ({ data }: Props) => {
  const [isVendorActivated, setIsVendorActivated] = useState(false);
  const { phone, walletAddress, name } = data;
  const assignTokenDialog = useBoolean();
  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();

  const handleCopy = useCallback(
    (address: string) => {
      if (address) {
        copy(address);
        enqueueSnackbar('Copied!');
      }
    },
    [copy, enqueueSnackbar]
  );

  const handleActivateVendor = () => {
    setIsVendorActivated(true);
  };

  return (
    <Card>
      <VendorAssignTokenModal
        onClose={assignTokenDialog.onFalse}
        open={assignTokenDialog.value}
        onOk={() => {
          console.log('assigned');
        }}
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="subtitle1">{name || '-'}</Typography>
          {isVendorActivated ?
            <Button
              variant="outlined"
              size="small"
              color="success"
              onClick={assignTokenDialog.onTrue}
              sx={{ fontSize: 'x-small' }}
            >
              Assign Token
            </Button>
            :

            <Button variant="contained" onClick={handleActivateVendor}>
              Activate Vendor
            </Button>
          }

        </Stack>

        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {phone || '-'}
            </Typography>
            <Typography variant="body2">Phone</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {truncateEthAddress(walletAddress, 4) || '-'}
              <Tooltip title="Copy To Address" placement="top" arrow>
                <IconButton sx={copyBtn} color="success" onClick={() => handleCopy(walletAddress)}>
                  <Iconify icon="ph:copy" />
                </IconButton>
              </Tooltip>
            </Typography>
            <Typography variant="body2">Wallet Address</Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BasicInfoCard;
