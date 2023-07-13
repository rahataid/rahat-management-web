import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import CarouselThumbnail from './carousel-thumbnail';

const _carouselsExample = [...Array(20)].map((_, index) => ({
  id: `${index}`,
  title: '23',
  coverUrl: '',
  description: 'sdas',
}));

const GalleryView = () => (
  <Stack spacing={3}>
    <Card>
      <CardHeader title="Carousel Thumbnail" />
      <CardContent>
        <CarouselThumbnail data={_carouselsExample.slice(0, 12)} />
      </CardContent>
    </Card>
  </Stack>
);

export default GalleryView;
