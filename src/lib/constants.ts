import type { MapStyle } from '@/types';

// Map center: Central Park area, New York City
export const MAP_CENTER = {
  lng: -73.968,
  lat: 40.7725,
};

export const MAP_ZOOM = 14;

export const H3_RESOLUTION = 9;

export const MAP_STYLES: MapStyle[] = [
  {
    id: 'dark',
    name: 'Dark',
    url: 'mapbox://styles/mapbox/dark-v11',
    icon: 'moon',
  },
  {
    id: 'streets',
    name: 'Streets',
    url: 'mapbox://styles/mapbox/streets-v12',
    icon: 'map',
  },
  {
    id: 'satellite',
    name: 'Satellite',
    url: 'mapbox://styles/mapbox/satellite-streets-v12',
    icon: 'satellite',
  },
  {
    id: 'outdoors',
    name: 'Outdoors',
    url: 'mapbox://styles/mapbox/outdoors-v12',
    icon: 'trees',
  },
];

export const TERRITORY_COLORS = {
  user: '#00FF88',
  red: '#FF4444',
  blue: '#4488FF',
  amber: '#FFAA00',
  purple: '#AA44FF',
  cyan: '#00DDFF',
};

export const BRAND_COLORS: Record<string, string> = {
  nike: '#FF6B00',
  adidas: '#00B4D8',
  gatorade: '#F77F00',
  underarmour: '#E63946',
};
