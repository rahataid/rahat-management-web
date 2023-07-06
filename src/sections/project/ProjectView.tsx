"use client"
import { useSettingsContext } from '@components/settings';
import { useTheme } from '@emotion/react';
import { Button, Container, Typography } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid/Grid';
import ProjectCards from './project-cards';

const ProjectView = () => {
    const theme = useTheme();
    const settings = useSettingsContext();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Grid container>
                <Grid xs={10}>
                    <Typography variant='h4'>Project</Typography>
                </Grid>
                <Grid xs={2}>
                    <Button color="success" variant="outlined">Add Project</Button>
                </Grid>
                <ProjectCards />
            </Grid>
        </Container>
    )
}

export default ProjectView;