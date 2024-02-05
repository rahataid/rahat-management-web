'use client';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import useAppStore from 'src/store/app';

const WrongNetworkSwitcher = () => {
  const { chainId, connector, isActive } = useWeb3React();
  const blockchain = useAppStore((state) => state.blockchain);

  const [wrongNetwork, setWrongNetwork] = useState(false);

  useEffect(() => {
    if (isActive && chainId && blockchain?.chainId && chainId !== blockchain.chainId) {
      setWrongNetwork(true);
    } else {
      setWrongNetwork(false);
    }
  }, [chainId, blockchain, isActive]);

  const handleSwitch = () => {
    connector.activate(blockchain);
  };

  return (
    <Dialog open={wrongNetwork}>
      <DialogTitle>Wrong Network</DialogTitle>
      <DialogContent>
        You are on the wrong network. Please switch to the correct network.
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSwitch}>
          Switch
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WrongNetworkSwitcher;
