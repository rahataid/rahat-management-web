// list cards

import { Grid } from "@mui/material";
import { useGetProjects } from "src/api/project";
import ProjectCard from "./project-card-item";

const ProjectCards = () => {
    const { projects } = useGetProjects();
    return (
        <Grid container spacing={1}>
            {projects.map((project) => (
                <Grid item xs={12} md={4} mt={3}>
                    <ProjectCard
                        key={project.id}
                        card={project}
                    />
                </Grid>
            ))}
        </Grid >
    )
}

export default ProjectCards
