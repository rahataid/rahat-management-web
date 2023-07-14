import { Button, Card, CardContent, Stack } from "@mui/material"

const ProjectActions = () => {
    return (
        <Card sx={{ mb: 2 }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Button variant="outlined" color="success">
                        Beneficiary List
                    </Button>
                    <Button variant="outlined" color="primary">
                        Actions
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ProjectActions