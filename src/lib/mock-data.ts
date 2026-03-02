import type { User, RunRoute, SponsorZone, Activity } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alex Rivera',
    avatar: '🏃',
    color: '#00FF88',
    stats: { totalRuns: 47, territories: 23, totalArea: 2.8, distance: 156, activeStreak: 12 },
    level: 8,
    badges: ['First Capture', 'Territory King', 'Marathon Runner', '7-Day Streak', 'Night Owl'],
    joinedAt: '2026-01-15',
  },
  {
    id: 'user-2',
    name: 'Maya Chen',
    avatar: '🏃‍♀️',
    color: '#4488FF',
    stats: { totalRuns: 62, territories: 31, totalArea: 3.5, distance: 203, activeStreak: 21 },
    level: 10,
    badges: ['First Capture', 'Territory Queen', 'Ultra Runner', '30-Day Streak', 'Sponsor Hunter'],
    joinedAt: '2025-12-08',
  },
  {
    id: 'user-3',
    name: 'Jordan Park',
    avatar: '🏃‍♂️',
    color: '#FF4444',
    stats: { totalRuns: 35, territories: 18, totalArea: 1.9, distance: 112, activeStreak: 5 },
    level: 6,
    badges: ['First Capture', 'Reclaimer', 'Speed Demon'],
    joinedAt: '2026-02-01',
  },
  {
    id: 'user-4',
    name: 'Sam Okafor',
    avatar: '🏅',
    color: '#FFAA00',
    stats: { totalRuns: 28, territories: 14, totalArea: 1.4, distance: 89, activeStreak: 3 },
    level: 5,
    badges: ['First Capture', 'Early Bird'],
    joinedAt: '2026-02-10',
  },
  {
    id: 'user-5',
    name: 'Priya Sharma',
    avatar: '💪',
    color: '#AA44FF',
    stats: { totalRuns: 41, territories: 20, totalArea: 2.3, distance: 134, activeStreak: 8 },
    level: 7,
    badges: ['First Capture', 'Park Patrol', 'Weekend Warrior'],
    joinedAt: '2026-01-20',
  },
  {
    id: 'user-6',
    name: 'Chris Taylor',
    avatar: '⚡',
    color: '#00DDFF',
    stats: { totalRuns: 19, territories: 9, totalArea: 0.9, distance: 58, activeStreak: 2 },
    level: 3,
    badges: ['First Capture'],
    joinedAt: '2026-02-20',
  },
];

// Demo run: an irregular street-grid shape — like a real Strava run
// Looks like a runner going north on 5th Ave, cutting west through the park,
// zig-zagging south, then looping back east — creates a boot/L-shape
export const demoRunRoute: RunRoute = {
  id: 'route-demo',
  userId: 'user-1',
  name: 'Midpark Zigzag',
  points: [
    // Start: east side, heading north along path
    { lng: -73.9660, lat: 40.7740 },
    { lng: -73.9658, lat: 40.7752 },
    { lng: -73.9655, lat: 40.7765 },
    // Sharp turn west across the park
    { lng: -73.9670, lat: 40.7770 },
    { lng: -73.9690, lat: 40.7775 },
    { lng: -73.9710, lat: 40.7778 },
    // Jog north
    { lng: -73.9712, lat: 40.7790 },
    { lng: -73.9715, lat: 40.7802 },
    // Cut back east
    { lng: -73.9700, lat: 40.7808 },
    { lng: -73.9685, lat: 40.7812 },
    // Notch: dip south then back north (creates interesting shape)
    { lng: -73.9678, lat: 40.7800 },
    { lng: -73.9670, lat: 40.7795 },
    // Continue east then south
    { lng: -73.9655, lat: 40.7798 },
    { lng: -73.9640, lat: 40.7795 },
    // Head south along east side path
    { lng: -73.9638, lat: 40.7782 },
    { lng: -73.9635, lat: 40.7770 },
    // Cut back west to close the loop
    { lng: -73.9642, lat: 40.7758 },
    { lng: -73.9650, lat: 40.7748 },
    { lng: -73.9660, lat: 40.7740 },
  ],
  distance: 2.6,
  duration: 15,
  createdAt: '2026-03-01T08:30:00Z',
};

// Pre-existing territories — all irregular, street-following shapes
export const mockRoutes: RunRoute[] = [
  {
    // L-shape along streets on the east side of the park
    id: 'route-1',
    userId: 'user-2',
    name: '5th Ave L-Run',
    points: [
      { lng: -73.9610, lat: 40.7830 },
      { lng: -73.9608, lat: 40.7845 },
      { lng: -73.9605, lat: 40.7858 },
      { lng: -73.9600, lat: 40.7862 },
      // Turn west
      { lng: -73.9620, lat: 40.7865 },
      { lng: -73.9640, lat: 40.7862 },
      { lng: -73.9648, lat: 40.7855 },
      // South along path
      { lng: -73.9645, lat: 40.7842 },
      { lng: -73.9640, lat: 40.7835 },
      // Cut back east
      { lng: -73.9628, lat: 40.7832 },
      { lng: -73.9610, lat: 40.7830 },
    ],
    distance: 1.4,
    duration: 8,
    createdAt: '2026-02-28T07:15:00Z',
  },
  {
    // Triangle shape — south-west of the park near Columbus Circle
    id: 'route-2',
    userId: 'user-3',
    name: 'Columbus Triangle',
    points: [
      { lng: -73.9810, lat: 40.7680 },
      // North along Broadway
      { lng: -73.9808, lat: 40.7695 },
      { lng: -73.9805, lat: 40.7710 },
      { lng: -73.9800, lat: 40.7720 },
      // Cut east along 61st-ish
      { lng: -73.9785, lat: 40.7718 },
      { lng: -73.9770, lat: 40.7712 },
      // Diagonal back south-west
      { lng: -73.9778, lat: 40.7700 },
      { lng: -73.9790, lat: 40.7688 },
      { lng: -73.9810, lat: 40.7680 },
    ],
    distance: 1.6,
    duration: 10,
    createdAt: '2026-02-27T17:45:00Z',
  },
  {
    // Elongated zigzag — running along paths in the Ramble
    id: 'route-3',
    userId: 'user-5',
    name: 'Ramble Zigzag',
    points: [
      { lng: -73.9720, lat: 40.7765 },
      { lng: -73.9710, lat: 40.7775 },
      { lng: -73.9725, lat: 40.7782 },
      { lng: -73.9715, lat: 40.7790 },
      { lng: -73.9730, lat: 40.7795 },
      { lng: -73.9738, lat: 40.7788 },
      { lng: -73.9745, lat: 40.7778 },
      { lng: -73.9735, lat: 40.7770 },
      { lng: -73.9720, lat: 40.7765 },
    ],
    distance: 1.1,
    duration: 7,
    createdAt: '2026-03-01T06:00:00Z',
  },
  {
    // Irregular diamond — around Conservatory Garden (north end)
    id: 'route-4',
    userId: 'user-4',
    name: 'Conservatory Diamond',
    points: [
      { lng: -73.9565, lat: 40.7940 },
      { lng: -73.9550, lat: 40.7950 },
      { lng: -73.9540, lat: 40.7960 },
      { lng: -73.9555, lat: 40.7968 },
      { lng: -73.9575, lat: 40.7965 },
      { lng: -73.9582, lat: 40.7955 },
      { lng: -73.9578, lat: 40.7945 },
      { lng: -73.9565, lat: 40.7940 },
    ],
    distance: 0.9,
    duration: 5,
    createdAt: '2026-02-26T09:00:00Z',
  },
  {
    // Wide T-shape — someone ran down a street then across
    id: 'route-5',
    userId: 'user-6',
    name: 'Harlem Meer T-Run',
    points: [
      { lng: -73.9540, lat: 40.7975 },
      { lng: -73.9535, lat: 40.7985 },
      { lng: -73.9530, lat: 40.7992 },
      // Cross piece of the T going west
      { lng: -73.9550, lat: 40.7995 },
      { lng: -73.9565, lat: 40.7993 },
      // Back east
      { lng: -73.9555, lat: 40.7988 },
      { lng: -73.9545, lat: 40.7985 },
      // East arm of the T
      { lng: -73.9520, lat: 40.7990 },
      { lng: -73.9510, lat: 40.7988 },
      // Close it back
      { lng: -73.9518, lat: 40.7980 },
      { lng: -73.9530, lat: 40.7978 },
      { lng: -73.9540, lat: 40.7975 },
    ],
    distance: 1.2,
    duration: 7,
    createdAt: '2026-02-25T16:30:00Z',
  },
  {
    // Crescent/hook shape — around the Reservoir west side
    id: 'route-6',
    userId: 'user-1',
    name: 'West Reservoir Hook',
    points: [
      { lng: -73.9720, lat: 40.7850 },
      { lng: -73.9725, lat: 40.7862 },
      { lng: -73.9722, lat: 40.7875 },
      { lng: -73.9715, lat: 40.7882 },
      // Hook curves east
      { lng: -73.9700, lat: 40.7885 },
      { lng: -73.9688, lat: 40.7880 },
      // Dip south
      { lng: -73.9692, lat: 40.7870 },
      { lng: -73.9700, lat: 40.7862 },
      // Back west to close
      { lng: -73.9710, lat: 40.7855 },
      { lng: -73.9720, lat: 40.7850 },
    ],
    distance: 1.0,
    duration: 6,
    createdAt: '2026-02-24T07:00:00Z',
  },
  {
    // Funky irregular shape — Sheep Meadow area, like a real street run
    id: 'route-7',
    userId: 'user-2',
    name: 'Sheep Meadow Drift',
    points: [
      { lng: -73.9755, lat: 40.7695 },
      { lng: -73.9740, lat: 40.7705 },
      { lng: -73.9720, lat: 40.7702 },
      { lng: -73.9705, lat: 40.7708 },
      { lng: -73.9698, lat: 40.7698 },
      { lng: -73.9710, lat: 40.7688 },
      { lng: -73.9725, lat: 40.7682 },
      { lng: -73.9742, lat: 40.7685 },
      { lng: -73.9755, lat: 40.7695 },
    ],
    distance: 1.3,
    duration: 8,
    createdAt: '2026-02-23T18:15:00Z',
  },
];

export const mockSponsorZones: SponsorZone[] = [
  {
    id: 'sponsor-nike',
    brand: 'Nike',
    logo: '✓',
    color: '#FF6B00',
    couponCode: 'TERRARUN-NIKE25',
    couponDescription: '25% off Nike Running Shoes',
    center: { lng: -73.9740, lat: 40.7680 },
  },
  {
    id: 'sponsor-adidas',
    brand: 'Adidas',
    logo: '△',
    color: '#00B4D8',
    couponCode: 'TERRARUN-ADI20',
    couponDescription: '20% off Adidas Apparel',
    center: { lng: -73.9650, lat: 40.7760 },
  },
  {
    id: 'sponsor-gatorade',
    brand: 'Gatorade',
    logo: '⚡',
    color: '#F77F00',
    couponCode: 'TERRARUN-GATOR30',
    couponDescription: 'Free Gatorade 12-Pack',
    center: { lng: -73.9600, lat: 40.7820 },
  },
  {
    id: 'sponsor-ua',
    brand: 'Under Armour',
    logo: 'U',
    color: '#E63946',
    couponCode: 'TERRARUN-UA15',
    couponDescription: '15% off Under Armour Gear',
    center: { lng: -73.9690, lat: 40.7850 },
  },
];

export const mockActivities: Activity[] = [
  {
    id: 'act-1', userId: 'user-1', type: 'capture',
    description: 'Captured Midpark Zigzag territory',
    timestamp: '2026-03-01T08:45:00Z',
  },
  {
    id: 'act-2', userId: 'user-1', type: 'run',
    description: 'Completed a 2.6 km run',
    timestamp: '2026-03-01T08:30:00Z',
  },
  {
    id: 'act-3', userId: 'user-1', type: 'badge',
    description: 'Earned "Night Owl" badge',
    timestamp: '2026-02-28T22:15:00Z',
  },
  {
    id: 'act-4', userId: 'user-1', type: 'reclaim',
    description: 'Reclaimed Sheep Meadow from Jordan Park',
    timestamp: '2026-02-28T07:30:00Z',
  },
  {
    id: 'act-5', userId: 'user-1', type: 'capture',
    description: 'Captured West Reservoir Hook territory',
    timestamp: '2026-02-27T18:00:00Z',
  },
  {
    id: 'act-6', userId: 'user-1', type: 'run',
    description: 'Completed a 5.1 km run',
    timestamp: '2026-02-27T17:30:00Z',
  },
];
