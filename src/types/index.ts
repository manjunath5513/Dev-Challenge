export interface User {
  id: string;
  name: string;
  avatar: string;
  color: string;
  stats: {
    totalRuns: number;
    territories: number;
    totalArea: number; // km²
    distance: number; // km
    activeStreak: number; // days
  };
  level: number;
  badges: string[];
  joinedAt: string;
}

export interface Territory {
  id: string;
  ownerId: string;
  color: string;
  polygon: [number, number][]; // closed ring of [lng, lat] pairs
  area: number; // km²
  name: string;
  capturedAt: string;
  isSponsor?: boolean;
  sponsorId?: string;
}

export interface RoutePoint {
  lng: number;
  lat: number;
  timestamp?: number;
}

export interface RunRoute {
  id: string;
  userId: string;
  name: string;
  points: RoutePoint[];
  distance: number; // km
  duration: number; // minutes
  createdAt: string;
}

export interface SponsorZone {
  id: string;
  brand: string;
  logo: string;
  color: string;
  couponCode: string;
  couponDescription: string;
  center: { lng: number; lat: number };
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  territories: number;
  totalArea: number;
  runs: number;
}

export interface MapStyle {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Activity {
  id: string;
  userId: string;
  type: 'capture' | 'run' | 'badge' | 'reclaim';
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}
