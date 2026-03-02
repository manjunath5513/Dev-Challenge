'use client';

import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-3.5rem)] bg-terra-dark flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-terra-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-terra-muted">Loading map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  return <MapView />;
}
