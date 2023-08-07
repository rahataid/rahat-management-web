import SummaryCard from '@components/summary-card';
import { Grid } from '@mui/material';

interface Props {
  tokenAllowance: number;
  totalBeneficiaries: number;
  distributedTokens: number;
  tokenName: string;
}
const ProjectStatsCard = ({
  tokenAllowance = 0,
  tokenName = '',
  totalBeneficiaries = 0,
  distributedTokens = 0,
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
            total={tokenAllowance}
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
