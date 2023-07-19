import { SplashScreen } from '@components/loading-screen';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { useFlickr } from 'src/api/flickr';
import CarouselThumbnail from './carousel-thumbnail';

const GalleryView = () => {
  const { flickr, isLoading } = useFlickr();
  return (
    <Stack spacing={3}>
      <Card>
        <CardHeader title="Photo Gallery" />
        <CardContent>
          {isLoading ? <SplashScreen /> : <CarouselThumbnail data={flickr?.photo} />}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default GalleryView;
