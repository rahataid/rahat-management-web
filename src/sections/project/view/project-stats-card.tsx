import SummaryCard from '@components/summary-card';
import { Grid } from '@mui/material';
import { ITransactionStats } from 'src/types/transactions';

interface Props {
    data: ITransactionStats
}

const ProjectStatsCard = ({ data }: Props) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <SummaryCard
                            color="success"
                            icon="material-symbols:paid"
                            title="Cash Distributed"
                            total={data.bankedCash}
                            subtitle="Banked Beneficiary"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SummaryCard
                            color="success"
                            icon="material-symbols:paid"
                            title="Cash Distributed"
                            total={data.unbankedCash}
                            subtitle="Unbanked Beneficiary"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <SummaryCard
                            color="warning"
                            icon="material-symbols:token"
                            title="Token Issued"
                            total={data.bankedToken}
                            subtitle="Banked Beneficiary"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProjectStatsCard;
