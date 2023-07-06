// list cards

import { Grid } from "@mui/material";
import ProjectCard from "./project-card-item";

const projectCards = () => {
    return (
        <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={12}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <ProjectCard />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <ProjectCard />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <ProjectCard />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <ProjectCard />
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default projectCards
