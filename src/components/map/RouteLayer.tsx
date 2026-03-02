'use client';

import { useMemo } from 'react';
import { Source, Layer } from 'react-map-gl/mapbox';
import { mockRoutes } from '@/lib/mock-data';

export default function RouteLayer() {
  const geojson = useMemo(() => {
    const features = mockRoutes.map((route) => ({
      type: 'Feature' as const,
      properties: {
        routeId: route.id,
        userId: route.userId,
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: route.points.map((p) => [p.lng, p.lat]),
      },
    }));

    return {
      type: 'FeatureCollection' as const,
      features,
    };
  }, []);

  return (
    <Source id="routes" type="geojson" data={geojson}>
      <Layer
        id="route-lines"
        type="line"
        paint={{
          'line-color': '#ffffff',
          'line-width': 2,
          'line-opacity': 0.3,
          'line-dasharray': [4, 4],
        }}
      />
    </Source>
  );
}
