import { area as turfArea, polygon as turfPolygon } from '@turf/turf';
import type { Territory } from '@/types';
import type { RunRoute } from '@/types';
import { mockUsers, mockRoutes } from './mock-data';

function routeToTerritory(route: RunRoute): Territory | null {
  const user = mockUsers.find((u) => u.id === route.userId);
  if (!user) return null;

  // Build the closed polygon ring as [lng, lat] pairs
  const ring: [number, number][] = route.points.map((p) => [p.lng, p.lat]);
  // Ensure it's closed
  if (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1]) {
    ring.push([...ring[0]] as [number, number]);
  }

  // Calculate area in km² using turf
  let areaKm2 = 0;
  try {
    const poly = turfPolygon([ring]);
    areaKm2 = turfArea(poly) / 1_000_000;
  } catch {
    areaKm2 = 0;
  }

  return {
    id: route.id,
    ownerId: user.id,
    color: user.color,
    polygon: ring,
    area: +areaKm2.toFixed(2),
    name: route.name,
    capturedAt: route.createdAt,
  };
}

let cachedTerritories: Territory[] | null = null;

export function getAllTerritories(): Territory[] {
  if (cachedTerritories) return cachedTerritories;

  const territories: Territory[] = [];
  for (const route of mockRoutes) {
    const t = routeToTerritory(route);
    if (t) territories.push(t);
  }

  cachedTerritories = territories;
  return cachedTerritories;
}

export function routeToNewTerritory(
  routePoints: { lng: number; lat: number }[],
  ownerId: string,
  color: string,
  name: string,
): Territory {
  const ring: [number, number][] = routePoints.map((p) => [p.lng, p.lat]);
  if (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1]) {
    ring.push([...ring[0]] as [number, number]);
  }

  let areaKm2 = 0;
  try {
    const poly = turfPolygon([ring]);
    areaKm2 = turfArea(poly) / 1_000_000;
  } catch {
    areaKm2 = 0;
  }

  return {
    id: `territory-${Date.now()}`,
    ownerId,
    color,
    polygon: ring,
    area: +areaKm2.toFixed(2),
    name,
    capturedAt: new Date().toISOString(),
  };
}
