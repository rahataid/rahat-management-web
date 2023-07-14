"use client"

import { useSettingsContext } from "@components/settings";
import { Container, Grid } from "@mui/material";
import { project } from 'src/_mock/_project';
import { useTransactions } from "src/api/transactions";
import ProjectActions from "./project-actions-card";
import { ProjectDetailsCard } from './project-details-card';
import CarouselBasic4 from "./project-gallery-view";
import ProjectStatsCard from "./project-stats-card";

const _carouselsExample = [...Array(20)].map((_, index) => ({
    id: project.id,
    title: project.title,
    coverUrl: project.image,
    description: ''
}));

export default function ProjectDetailsView() {
    const settings = useSettingsContext();
    const { transactionStats } = useTransactions();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={8}>
                    <CarouselBasic4 data={_carouselsExample.slice(0, 4)} />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <ProjectActions />
                    <ProjectDetailsCard />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    <ProjectStatsCard data={transactionStats} />
                </Grid>
            </Grid>
        </Container>

    )
}


