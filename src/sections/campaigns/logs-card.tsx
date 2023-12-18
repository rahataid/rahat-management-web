import SummaryCard from '@components/summary-card';
import { Grid } from '@mui/material';

type CardProps = {
  data: DataProps[];
};

type DataProps = {
  icon: string;
  total: number;
  subTitle: string;
};

const LogsCards = ({ data }: CardProps) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          {data?.map((item) => (
            <Grid item xs={12} md={4}>
              <SummaryCard
                color="warning"
                icon={item.icon}
                title=""
                total={item.total}
                subtitle={item.subTitle}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LogsCards;
