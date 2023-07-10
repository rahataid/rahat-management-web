import { Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";


export const ProjectDetailsCard = () => {
    return (
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
    )
}
