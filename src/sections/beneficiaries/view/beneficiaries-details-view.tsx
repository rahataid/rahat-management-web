'use client';

import { useBeneficiary } from 'src/api/beneficiaries';
// mui
import Container from '@mui/material/Container';
// routes
import { paths } from '@routes/paths';
import { useParams } from 'src/routes/hook';
// components
import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';

import { CONTRACTS } from '@config';
import useChainTransactions from '@hooks/useChainTransactions';
import useProjectContract from '@services/contracts/useProject';
import { memo, useCallback, useEffect } from 'react';
import { useVendors } from 'src/api/vendors';
import useAppStore from 'src/store/app';
import useBeneficiaryStore from 'src/store/beneficiaries';
import BeneficiariesDetailsCard from './beneficiaries-details-card';
import BeneficiariesDetailsClaimsCard from './beneficiaries-details-claims-card';
import BeneficiaryDetailsTableView from './beneficiaries-details-table-view';
import ProjectsInvolved from './project-involved';

function BeneficiariesDetailsView() {
  const { uuid } = useParams();
  const { beneficiary } = useBeneficiary(uuid as string);
  const settings = useSettingsContext();
  const appContracts = useAppStore((state) => state.contracts);

  const { getBeneficiaryChainData, projectContractWS: ProjectContractWS } = useProjectContract();
  const { chainData, setChainData } = useBeneficiaryStore((state) => ({
    chainData: state.chainData,
    setChainData: state.setChainData,
  }));
  const rpcUrl = useAppStore((state) => state.blockchain?.rpcUrls[0]) as string;

  const { vendors } = useVendors();

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
        topic0s: ['ClaimAssigned', 'ClaimProcessed'],
      },
    ],
    transform: (data) =>
      data
        .filter(
          (item) => item?.beneficiary?.toLowerCase() === beneficiary?.walletAddress?.toLowerCase()
        )
        .map((item) => {
          const vendor = vendors.find(
            (v) => v.walletAddress?.toLowerCase() === item?.vendor?.toLowerCase()
          );
          return {
            ...item,
            vendor: vendor?.name || item?.vendor,
          };
        }),
  });

  console.log('first', transactions);

  const handleChainData = useCallback(async () => {
    if (!uuid) return;
    if (!beneficiary.walletAddress) return;
    if (chainData.isBeneficiary !== null) return;

    const data = await getBeneficiaryChainData(beneficiary.walletAddress);
    setChainData(data);
  }, [
    beneficiary.walletAddress,
    chainData.isBeneficiary,
    getBeneficiaryChainData,
    setChainData,
    uuid,
  ]);

  useEffect(() => {
    handleChainData();
  }, [handleChainData, beneficiary.walletAddress]);

  // useEffect(() => {
  //   ProjectContractWS?.on('BeneficiaryAdded', handleChainData);
  //   ProjectContractWS?.on('BeneficiaryRemoved', handleChainData);
  //   ProjectContractWS?.on('ClaimAdjusted', handleChainData);
  //   ProjectContractWS?.on('ClaimAssigned', handleChainData);
  //   ProjectContractWS?.on('ClaimProcessed', handleChainData);
  //   ProjectContractWS?.on('BeneficiaryAdded', handleChainData);

  //   return () => {
  //     ProjectContractWS?.removeAllListeners();
  //   };
  // }, [ProjectContractWS, handleChainData]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Beneficiaries: Details"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Details' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Grid
        container
        spacing={2}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Grid item xs={12} md={7}>
          <BeneficiariesDetailsCard beneficiary={beneficiary} isActive={chainData.isBeneficiary} />
        </Grid>
        <Grid item xs={12} md={5}>
          <BeneficiariesDetailsClaimsCard
            walletAddress={beneficiary?.walletAddress}
            balance={chainData.balance}
            claimed={chainData.claimed}
          />
        </Grid>
      </Grid>

      <Stack mb={5}>
        <ProjectsInvolved projectsInvolved={beneficiary?.projects} />
      </Stack>

      <Card>
        <Typography variant="subtitle2" sx={{ pl: 5, pt: 3, mb: 2 }}>
          Transaction History
        </Typography>
        <BeneficiaryDetailsTableView data={transactions} />
      </Card>
    </Container>
  );
}

export default memo(BeneficiariesDetailsView);
