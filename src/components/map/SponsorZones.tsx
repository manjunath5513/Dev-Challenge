'use client';

import { Marker } from 'react-map-gl/mapbox';
import { mockSponsorZones } from '@/lib/mock-data';

export default function SponsorZones() {
  return (
    <>
      {mockSponsorZones.map((sponsor) => (
        <Marker
          key={sponsor.id}
          longitude={sponsor.center.lng}
          latitude={sponsor.center.lat}
          anchor="center"
        >
          <div className="relative group cursor-pointer">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-dashed border-white/30 animate-pulse-glow"
              style={{ background: sponsor.color }}
            >
              {sponsor.logo}
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              <p className="font-bold text-sm">{sponsor.brand}</p>
              <p className="text-xs text-terra-muted">{sponsor.couponDescription}</p>
            </div>
          </div>
        </Marker>
      ))}
    </>
  );
}
