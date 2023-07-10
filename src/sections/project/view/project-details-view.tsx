"use client"

import { useSettingsContext } from "@components/settings";
import { Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";
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
                    <Card>
                        <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                <Button variant="outlined" color="success">
                                    Beneficiary List
                                </Button>
                                <Button variant="outlined" color="primary">
                                    Actions
                                </Button>
                            </Stack>
                            <Stack
                                sx={{ p: 2 }}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={5}
                            >
                                <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                                    <Typography>Rumee Singh</Typography>
                                    <Typography variant="body2">Project Manager</Typography>
                                </Grid>

                                <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                                    <Typography variant="body2">12-Jul-2023</Typography>
                                    <Typography variant="body2">Created At</Typography>
                                </Grid>
                            </Stack>
                            <Stack
                                sx={{ p: 2 }}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={5}
                            >
                                <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                                    <Typography>Location</Typography>
                                </Grid>

                                <Grid container direction="column" justifyContent="center" alignItems="flex-start">
                                    <Typography variant="body2">Jaleshwor</Typography>
                                </Grid>
                            </Stack>
                            <Stack
                                sx={{ p: 2 }}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={5}
                            >
                                <Grid container direction="column" justifyContent="center" alignItems="center">
                                    <Button variant="contained" color="error" sx={{ borderRadius: '25px', padding: '5px 25px' }} >
                                        Response Not Triggered
                                    </Button>
                                </Grid>
                            </Stack>
                            <Stack
                                sx={{ p: 2 }}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={5}
                            >
                                <Grid container direction="column" justifyContent="center" alignItems="center">
                                    <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nulla, odio natus similique minus voluptatum corrupti ducimus suscipit quae animi </Typography>
                                </Grid>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Container>

    )
}


