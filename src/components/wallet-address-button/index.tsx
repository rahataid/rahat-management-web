import { useCopyToClipboard } from '@hooks/use-copy-to-clipboard';
import { Button, Stack, Tooltip } from '@mui/material';
import { truncateEthAddress } from '@utils/strings';
import React from 'react';

interface IProps {
  address: string;
  type?: 'address' | 'txHash';
}

const WalletAddressButton: React.FC<IProps> = ({ address, type = 'address' }) => {
  const { copiedText, copy } = useCopyToClipboard();
  const baseUrl = 'https://goerli.arbiscan.io';

  const handleClick = () => {
    const url = type === 'address' ? `${baseUrl}/address/${address}` : `${baseUrl}/tx/${address}`;
    window.open(`${url}`, '_blank');
  };
  // const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Tooltip title={copiedText ? 'Copied!' : address}>
      <Stack direction="row">
        <Button variant="text" onClick={handleClick}>
          {truncateEthAddress(address)}
        </Button>
        <Button variant="outlined" onClick={() => copy(address)}>
          Copy
        </Button>
      </Stack>
    </Tooltip>
  );
};

export default WalletAddressButton;
