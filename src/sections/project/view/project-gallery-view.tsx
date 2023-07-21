// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
// theme
import { bgBlur } from 'src/theme/css';
// components
import Carousel, { CarouselArrows, useCarousel } from 'src/components/carousel';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

const StyledContentItem = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.grey[900] }),
  bottom: 0,
  zIndex: 9,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  justifyContent: 'space-between',
  flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row',
}));

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: number;
    title: string;
    coverUrl: string;
  }[];
};

export default function CarouselBasic4({ data }: Props) {
  const carousel = useCarousel({
    autoplay: true,
    fade: true,
  });

  return (
    <Card>
      <CarouselArrows filled shape="rounded" onNext={carousel.onNext} onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {data.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  title: string;
  description: string;
  coverUrl: string;
};

function CarouselItem({ item }: { item: CarouselItemProps }) {
  const { coverUrl, title } = item;

  return (
    <Box sx={{ position: 'relative', zIndex: 0 }}>
      <Image alt={title} src={coverUrl} ratio="16/9" />

      <StyledContentItem>
        <Typography variant="h6" sx={{ color: 'common.white' }}>
          {item.title}
        </Typography>
      </StyledContentItem>
    </Box>
  );
}
