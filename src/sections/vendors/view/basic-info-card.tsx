import Iconify from '@components/iconify/iconify';
import { useCopyToClipboard } from '@hooks/use-copy-to-clipboard';
import { Card, CardContent, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { truncateEthAddress } from '@utils/strings';
import { useCallback } from 'react';
import { useSnackbar } from 'src/components/snackbar';
import { IVendorDetails } from 'src/types/vendors';

type Props = {
  data: IVendorDetails;
};
const copyBtn = {
  padding: '0 0 0 6px',
};

const BasicInfoCard = ({ data }: Props) => {
  const { phone, walletAddress, name } = data;
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

  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="subtitle1">{name || '-'}</Typography>
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
