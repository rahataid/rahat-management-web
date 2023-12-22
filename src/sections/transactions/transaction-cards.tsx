import SummaryCard from '@components/summary-card';
import { Stack } from '@mui/material';

type Props = {
  cashDistributed: number;
  cashIssued: number;
  issuedCount: number;
  distributedCount: number;
};

const TransactionsCards = ({
  cashDistributed,
  cashIssued,
  distributedCount,
  issuedCount,
}: Props) => (
  <Stack direction="row" spacing={2}>
    <SummaryCard
      color="success"
      icon="material-symbols:paid"
      title="Cash Issued"
      total={'Rs.' + cashIssued}
      subtitle="To Banked Beneficiary"
    />
    <SummaryCard
      color="warning"
      icon="material-symbols:token"
      title="Issued To"
      total={distributedCount}
      subtitle="Banked Beneficiaries"
    />
    <SummaryCard
      color="warning"
      icon="material-symbols:token"
      title="Distributed Beneficiaries"
      total={'Rs.' + cashDistributed}
      subtitle="To Banked Beneficiary"
    />

    <SummaryCard
      color="success"
      icon="material-symbols:paid"
      title="Distributed To"
      total={issuedCount}
      subtitle="Banked Beneficiaries"
    />
    {/* <Grid item xs={12} md={3}>
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color="warning"
              icon="material-symbols:token"
              title="Token Issued"
              total={unbankedToken}
              subtitle="Unbanked Beneficiary"
            />
          </Grid> */}
  </Stack>
);

export default TransactionsCards;
