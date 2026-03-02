import { latLngToCell, cellToBoundary, polygonToCells, gridDisk } from 'h3-js';
import { H3_RESOLUTION } from './constants';

export function pointToH3(lat: number, lng: number): string {
  return latLngToCell(lat, lng, H3_RESOLUTION);
}

export function h3ToGeoJSON(hexId: string): [number, number][] {
  const boundary = cellToBoundary(hexId, true); // true = GeoJSON format [lng, lat]
  // Close the polygon
  return [...boundary, boundary[0]];
}

export function polygonToH3Cells(polygon: [number, number][]): string[] {
  // polygon is array of [lat, lng] pairs for h3-js
  const h3Polygon = polygon.map(([lng, lat]) => [lat, lng] as [number, number]);
  try {
    return polygonToCells(h3Polygon, H3_RESOLUTION, true);
  } catch {
    return [];
  }
}

export function getNeighborHexes(hexId: string, rings: number = 1): string[] {
  return gridDisk(hexId, rings);
}

export function generateTerritoryGeoJSON(hexIds: string[], color: string, ownerId: string) {
  const features = hexIds.map((hexId) => {
    const boundary = h3ToGeoJSON(hexId);
    return {
      type: 'Feature' as const,
      properties: {
        hexId,
        color,
        ownerId,
      },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [boundary],
      },
    };
  });

  return {
    type: 'FeatureCollection' as const,
    features,
  };
}

export function routeToPolygon(points: { lng: number; lat: number }[]): [number, number][] {
  return points.map((p) => [p.lng, p.lat]);
}

export function generateHexesForArea(
  centerLat: number,
  centerLng: number,
  rings: number
): string[] {
  const centerHex = pointToH3(centerLat, centerLng);
  return gridDisk(centerHex, rings);
}
