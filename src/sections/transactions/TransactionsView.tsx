import { useSettingsContext } from '@components/settings';
import { useTransactions } from 'src/api/transactions';

import SummaryCard from '@components/summary-card';
import { Container, Grid } from '@mui/material';


const TransactionsView = () => {

const settings = useSettingsContext();
const { transactionStats } = useTransactions();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <h1>Live Transactions</h1>
        <Grid container spacing={3}>
            <Grid item xs={12} md={12}> 
                <Grid container spacing={2}>
                    {
                        transactionStats?.length && transactionStats.map(el => (
                            <Grid item xs={12} md={3}>
                                <SummaryCard
                                    color= { el.beneficiaryType === "Banked Beneficiary"? 'warning' : 'success'}
                                    icon={ el.transactionType === 'Token Issued'? "material-symbols:token" : "material-symbols:paid"}
                                    title={el.transactionType}
                                    total={el.total.toString()}
                                    subtitle={el.beneficiaryType}
                                />
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>
    </Container>
    
  )
}

export default TransactionsView