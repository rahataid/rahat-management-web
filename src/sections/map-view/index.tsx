'use client';

import { MapData } from '@components/map';
import { Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { MAPBOX_TOKEN } from 'src/config-global';

const MapClusters: any = dynamic(() => import('./clusters'));

const THEMES = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11',
};

const baseSettings = {
  mapboxAccessToken: MAPBOX_TOKEN,
  minZoom: 1,
  scrollZoom: false,
};

const StyledMapContainer = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 520,
  width: '100%',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

type MapViewProps = {
  geoData: MapData[];
};

export default function MapView({ geoData }: MapViewProps) {
  return (
    <Stack>
      <Card>
        <CardContent style={{ padding: 0 }}>
          <StyledMapContainer>
            <MapClusters {...baseSettings} mapStyle={THEMES.light} geoData={geoData} />
          </StyledMapContainer>
        </CardContent>
      </Card>
    </Stack>
  );
}
