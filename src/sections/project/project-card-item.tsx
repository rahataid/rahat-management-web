import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ProjectCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/06/guy-chatting.jpg?q=50&fit=crop&w=200&h=140&dpr=1.5"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Typography variant="body2" gutterBottom>
                        Jul-06-2023
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        $5000
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}