'use client';

import { SplashScreen } from '@components/loading-screen';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { useFlickr } from 'src/api/flickr';
import CarouselThumbnail from './carousel-thumbnail';

const GalleryView = () => {
  const { flickr, isLoading } = useFlickr();
  return (
    <Stack spacing={3}>
      <Card>
        {/* todo: wrap with container and bread crumbs,:refer to section of other page views,  remove  card header and wrapping of cards */}
        {/* TODO: the images are all cropped,show the full images */}
        <CardHeader title="Photo Gallery" />
        <CardContent>
          {isLoading ? <SplashScreen /> : <CarouselThumbnail data={flickr?.photo} />}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default GalleryView;
