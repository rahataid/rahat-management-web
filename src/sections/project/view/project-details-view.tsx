"use client"

import { useSettingsContext } from "@components/settings";
import { Container, Grid } from "@mui/material";
import { _mock } from 'src/_mock';
import CarouselBasic4 from "./project-gallery-view";

const _carouselsExample = [...Array(20)].map((_, index) => ({
    id: _mock.id(index),
    title: _mock.postTitle(index),
    coverUrl: _mock.image.cover(index),
    description: _mock.description(index),
}));

export default function ProjectDetailsView() {
    const settings = useSettingsContext();
    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <CarouselBasic4 data={_carouselsExample.slice(0, 4)} />
                </Grid>
                <Grid item xs={4}>
                    <h1>lol</h1>
                </Grid>

            </Grid>
        </Container>

    )
}


