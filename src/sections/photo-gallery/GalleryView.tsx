import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { _mock } from 'src/_mock';
import CarouselThumbnail from './carousel-thumbnail';

const _carouselsExample = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  coverUrl: _mock.image.cover(index),
  description: _mock.description(index),
}));

const GalleryView = () => {
  return (
    <Stack spacing={3}>
      <Card>
        <CardHeader title="Carousel Thumbnail" />
        <CardContent>
          <CarouselThumbnail data={_carouselsExample.slice(0, 12)} />
        </CardContent>
      </Card>
    </Stack>
  );
};

export default GalleryView;
