import Iconify from '@components/iconify/iconify';
import SummaryCard from '@components/summary-card';
import { Button, Grid } from '@mui/material';

interface Props {
  tokenAllowance: number | undefined;
  totalBeneficiaries: number | undefined;
  distributedTokens: number | undefined;
  tokenName: string | undefined;
  onCreateToken: () => void;
}
const ProjectStatsCard = ({
  tokenAllowance = 0,
  tokenName = '',
  totalBeneficiaries = 0,
  distributedTokens = 0,
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
            total={totalBeneficiaries}
            subtitle="total"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SummaryCard
            color="success"
            icon="material-symbols:paid"
            title="Tokens Issued"
            total={
              tokenAllowance > 0 ? (
                tokenAllowance
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
            total={distributedTokens}
            subtitle={tokenName}
          />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

export default ProjectStatsCard;
