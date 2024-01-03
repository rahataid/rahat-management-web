import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { CONTRACTS } from '@config';
import { useBoolean } from '@hooks/use-boolean';
import useChainTransactions from '@hooks/useChainTransactions';
import { Container, Grid, Stack } from '@mui/material';
import { paths } from '@routes/paths';
import MapView from '@sections/map-view';
import useProjectContract from '@services/contracts/useProject';
import { interruptChainActions } from '@utils/chainActionInterrupt';
import { useCallback, useEffect, useState } from 'react';
import { useBeneficiaries } from 'src/api/beneficiaries';
import { useVendor } from 'src/api/vendors';
import { useParams } from 'src/routes/hook';
import useAppStore from 'src/store/app';
import useVendorStore from 'src/store/vendors';
import BasicInfoCard from './basic-info-card';
import VendorsCards from './transaction-info-card';
import TransactionTable from './transaction-list-card';

const VendorView = () => {
  const settings = useSettingsContext();
  const { address } = useParams();
  const { vendor } = useVendor(address);
  const assignTokenDialog = useBoolean();
  const { beneficiaries } = useBeneficiaries();
  const {
    getVendorChainData,
    activateVendor,
    sendAllowanceToVendor,
    projectContractWS: ProjectContractWS,
  } = useProjectContract();
  const appContracts = useAppStore((state) => state.contracts);
  const rpcUrl = useAppStore((state) => state.blockchain?.rpcUrls[0]) as string;
  const [isSendingToken, setIsSendingToken] = useState(false);
  const [isActivatingVendor, setIsActivatingVendor] = useState(false);

  const { data: transactions } = useChainTransactions({
    action: 'getLogs',
    fromBlock: 0,
    toBlock: 'latest',
    module: 'logs',
    appContracts,
    source: 'rpcCall',
    rpcUrl,

    events: [
      {
        contractName: CONTRACTS.CVAPROJECT,
        topic0s: ['ClaimAssigned', 'ClaimProcessed', 'VendorAllowanceAccept', 'VendorAllowance'],
      },
    ],
    transform: (data) =>
      data
        .filter((item) => item?.vendor?.toLowerCase() === address?.toLowerCase())
        .map((item) => {
          const ben = beneficiaries.find(
            (b) => b.walletAddress?.toLowerCase() === item?.beneficiary?.toLowerCase()
          );
          return { ...item, beneficiary: ben?.phone || item?.beneficiary };
        }),
  });

  const { chainData, setChainData } = useVendorStore((state) => ({
    chainData: state.chainData,
    setChainData: state.setChainData,
  }));

  const handleVendorChainData = useCallback(() => {
    if (!vendor.address) return;
    if (chainData.isVendor !== null) return;
    getVendorChainData(vendor?.walletAddress).then((data) => {
      setChainData(data);
    });
  }, [chainData.isVendor, getVendorChainData, setChainData, vendor.address, vendor?.walletAddress]);

  useEffect(() => {
    handleVendorChainData();
  }, [handleVendorChainData]);

  useEffect(() => {
    ProjectContractWS?.on('VendorAllowanceAccept', handleVendorChainData);
    ProjectContractWS?.on('VendorAllowance', handleVendorChainData);

    return () => {
      ProjectContractWS?.removeAllListeners();
    };
  }, [ProjectContractWS, handleVendorChainData]);

  const handleActivateVendor = async (walletAddress: string) => {
    setIsActivatingVendor(true);
    try {
      // TODO:Interrupted chain actions temporarily disabled
      interruptChainActions(activateVendor, walletAddress);

      // activateVendor(walletAddress).then(() => {
      handleVendorChainData();
      // });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsActivatingVendor(false);
    }
  };

  const handleTokenSend = async (walletAddress: string, tokenAmount: string) => {
    setIsSendingToken(true);
    try {
      // TODO:Interrupted chain actions temporarily disabled

      await interruptChainActions(sendAllowanceToVendor, walletAddress, tokenAmount);
      // await sendTokensToVendor(walletAddress, tokenAmount);
      assignTokenDialog.onFalse();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSendingToken(false);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Vendors: Details"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Details' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack direction="column" spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <VendorsCards
              balance={chainData.balance}
              disbursed={chainData.disbursed}
              pending={chainData.pending}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BasicInfoCard
              data={vendor}
              isVendor={chainData.isVendor}
              assignTokenModal={assignTokenDialog}
              onActivateVendor={handleActivateVendor}
              onSendToken={handleTokenSend}
              sendingToken={isSendingToken}
              activatingVendor={isActivatingVendor}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TransactionTable rows={transactions} />
          </Grid>
          <Grid item xs={12} md={4}>
            <MapView />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default VendorView;
