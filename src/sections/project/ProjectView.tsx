"use client"
import { useSettingsContext } from '@components/settings';
import { useTheme } from '@emotion/react';
import { Container } from '@mui/material';

const ProjectView = () => {
    const theme = useTheme();
    const settings = useSettingsContext();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <h1>Project</h1>
        </Container>
    )
}

export default ProjectView;