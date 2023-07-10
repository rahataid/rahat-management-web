"use client"

import { useSettingsContext } from "@components/settings";
import { Container, Grid } from "@mui/material";
import { _mock } from 'src/_mock';
import { useTransactions } from "src/api/transactions";
import { ProjectDetailsCard } from './project-details-card';
import CarouselBasic4 from "./project-gallery-view";
import ProjectStatsCard from "./project-stats-card";

const _carouselsExample = [...Array(20)].map((_, index) => ({
    id: _mock.id(index),
    title: _mock.postTitle(index),
    coverUrl: _mock.image.cover(index),
    description: _mock.description(index),
}));

export default function ProjectDetailsView() {
    const settings = useSettingsContext();
    const { transactionDetails, } = useTransactions();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={8}>
                    <CarouselBasic4 data={_carouselsExample.slice(0, 4)} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <ProjectDetailsCard />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    <ProjectStatsCard data={transactionDetails} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <ProjectDetailsCard />
                </Grid>
            </Grid>
        </Container>

    )
}


