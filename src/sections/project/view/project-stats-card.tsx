import Iconify from '@components/iconify/iconify';
import SummaryCard from '@components/summary-card';
import { Button, Grid } from '@mui/material';

interface Props {
  balance: number | undefined;
  totalBeneficiaries: number | undefined;
  distributedTokens: number | undefined;
  tokenName: string | undefined;
  onCreateToken: () => void;
}
const ProjectStatsCard = ({
  balance = 0,
  tokenName = '',
  totalBeneficiaries,
  distributedTokens,
  onCreateToken,
}: Props) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={12}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <SummaryCard
            color="success"
            icon="material-symbols:paid"
            title="Beneficiaries"
            total={totalBeneficiaries || '-'}
            subtitle="total"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCard
            color="success"
            icon="material-symbols:paid"
            title="Balance"
            total={
              balance > 0 ? (
                balance
              ) : (
                <Button
                  sx={{ mt: 1, mb: 1 }}
                  variant="outlined"
                  startIcon={<Iconify icon="ic:baseline-generating-tokens" />}
                  onClick={onCreateToken}
                  size="small"
                >
                  Create Token
                </Button>
              )
            }
            subtitle={tokenName}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCard
            color="warning"
            icon="material-symbols:token"
            title="Distributed"
            total={distributedTokens || '-'}
            subtitle={tokenName}
          />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default ProjectStatsCard;
