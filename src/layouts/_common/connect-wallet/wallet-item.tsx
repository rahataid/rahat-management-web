// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { Status } from '@web3/components/Status';
import { hooks, metaMask } from '@web3/connectors/metaMask';
import Iconify from 'src/components/iconify/iconify';
import { truncateEthAddress } from 'src/utils/strings';

// utils
// components

// ----------------------------------------------------------------------

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

type WalletItemProps = {
  walletAvatar: string;
  title: string;
  description: string;
  connector: typeof metaMask;
  activeChainId: ReturnType<typeof useChainId>;
  isActivating: ReturnType<typeof useIsActivating>;
  isActive: ReturnType<typeof useIsActive>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
  accounts: ReturnType<typeof useAccounts>;
  provider: ReturnType<typeof useProvider>;
  ENSNames: ReturnType<typeof useENSNames>;
};

export default function WalletItem({
  title,
  walletAvatar,
  description,
  isActivating,
  isActive,
  connector,
  provider,
  setError,
  accounts,
  error,
  activeChainId,
  ENSNames,
  chainIds,
}: WalletItemProps) {
  const renderAvatar = (
    <ListItemAvatar>
      {walletAvatar && (
        <Iconify icon={walletAvatar} sx={{ bgcolor: 'background.neutral', fontSize: 24 }} />
      )}
    </ListItemAvatar>
  );

  const renderText = (
    <ListItemText
      disableTypography
      primary={reader(title)}
      secondary={
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{ width: 2, height: 2, bgcolor: 'currentColor', mx: 0.5, borderRadius: '50%' }}
            />
          }
        >
          {isActive && <Status isActivating={isActivating} isActive={isActive} error={error} />}
          {isActive ? truncateEthAddress(accounts?.[0] as string, 8) : description}
        </Stack>
      }
    />
  );

  const walletAction = (
    <Stack spacing={1} direction="row" sx={{ mt: 1.5 }}>
      {isActive ? (
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            if (connector?.deactivate) {
              void connector.deactivate();
            } else {
              void connector.resetState();
            }
          }}
        >
          Disconnect
        </Button>
      ) : (
        <Button
          size="small"
          variant="contained"
          onClick={async () => {
            await connector.activate();
          }}
        >
          Connect
        </Button>
      )}
    </Stack>
  );

  return (
    <>
      <ListItemButton
        disableRipple
        sx={{
          p: 2.5,
          alignItems: 'flex-start',
          borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {renderAvatar}
        <Stack sx={{ flexGrow: 1 }}>{renderText}</Stack>
        {walletAction}
      </ListItemButton>
      {/* TODO: for testing only */}
      {/* <ConnectWithSelect
        connector={connector}
        activeChainId={activeChainId}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      /> */}
    </>
  );
}

// ----------------------------------------------------------------------

function reader(data: string) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: data }}
      sx={{
        mb: 0.5,
        '& p': { typography: 'body2', m: 0 },
        '& a': { color: 'inherit', textDecoration: 'none' },
        '& strong': { typography: 'subtitle2' },
      }}
    />
  );
}
