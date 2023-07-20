import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IProjectItem } from 'src/types/project';

type IProjectCard = {
  card: IProjectItem;
};

export default function ProjectCard({ card }: IProjectCard) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 240 }} image={card.image} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {card.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" gutterBottom>
            {card.createdAt}
          </Typography>
          <Typography variant="body2" gutterBottom>
            ${card.budget}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
