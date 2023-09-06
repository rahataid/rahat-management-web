'use client';

import { useSettingsContext } from '@components/settings';
import SummaryCard from '@components/summary-card';
import { Container, Grid } from '@mui/material';
import MapView from '@sections/map-view';
import { useBeneficiaryStats, useGeoLocation } from 'src/api/beneficiaries';
import { useFlickr } from 'src/api/flickr';
import { useDashBoardReports } from 'src/api/reports';
import Bargraph from './bar-graph';
import PhotoGallery from './photo-gallery';
import Piechart from './pie-chart';

const DashboardView = () => {
  const { flickr } = useFlickr({
    per_page: 3,
    page: 1,
  });

  const settings = useSettingsContext();
  const { data } = useDashBoardReports();
  const { bankStatusData, genderData, phoneOwnershipData, internetAccessData } =
    useBeneficiaryStats();
  const { geoData } = useGeoLocation();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SummaryCard
                color="primary"
                icon="material-symbols:person-4"
                title="Beneficiaries"
                total={data?.totalBeneficiaries}
                subtitle="households"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SummaryCard
                color="info"
                icon="mdi:wheel-barrow"
                title="Total Token"
                total={data?.totalTokens}
                subtitle="disbursed"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SummaryCard
                color="success"
                icon="pajamas:project"
                title="Projects"
                total={data?.totalProjects}
                subtitle="involved"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SummaryCard
                color="secondary"
                icon="maki:village"
                title="Village(s)"
                total={102}
                subtitle="impacted"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <PhotoGallery list={flickr} />
        </Grid>
      </Grid>
      <Grid mt={3} container spacing={3}>
        <Grid item xs={12} md={3}>
          <Piechart
            title="Gender-wise Distribution"
            chart={{
              series: genderData,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Piechart
            title="Banked or unbanked"
            chart={{
              series: bankStatusData,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Piechart
            title="Access to internet"
            chart={{
              series: internetAccessData,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Piechart
            title="Access to Phone"
            chart={{
              series: phoneOwnershipData,
            }}
          />
        </Grid>
      </Grid>
      <Grid container mt={3} spacing={2}>
        <Grid item xs={12} md={6}>
          <Bargraph
            title="Beneficiaries by distribution point"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2019',
                  data: [
                    {
                      name: 'Asia',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'America',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    {
                      name: 'Asia',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'America',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MapView geoData={geoData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardView;
