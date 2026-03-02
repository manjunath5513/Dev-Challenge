'use client';

import { useEffect, useMemo } from 'react';
import { Source, Layer, useMap } from 'react-map-gl/mapbox';
import { useMapStore } from '@/store/useMapStore';
import { getAllTerritories } from '@/lib/territory';
import { mockUsers, mockSponsorZones } from '@/lib/mock-data';

export default function TerritoryLayer() {
  const { territories, setTerritories, setSelectedTerritory } = useMapStore();
  const { current: map } = useMap();

  useEffect(() => {
    const all = getAllTerritories();
    setTerritories(all);
  }, [setTerritories]);

  const geojson = useMemo(() => {
    const features = territories.map((t) => ({
      type: 'Feature' as const,
      properties: {
        id: t.id,
        color: t.color,
        ownerId: t.ownerId,
        name: t.name,
        isSponsor: t.isSponsor || false,
      },
      geometry: {
        type: 'Polygon' as const,
        coordinates: [t.polygon],
      },
    }));

    return {
      type: 'FeatureCollection' as const,
      features,
    };
  }, [territories]);

  // Click handler for territory selection
  useEffect(() => {
    if (!map) return;

    const handleClick = (e: mapboxgl.MapMouseEvent) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['territory-fill'],
      });

      if (features.length > 0) {
        const props = features[0].properties;
        if (!props) return;

        const territory = territories.find((t) => t.id === props.id);
        if (territory) {
          setSelectedTerritory(territory);
        }
      }
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, territories, setSelectedTerritory]);

  return (
    <Source id="territories" type="geojson" data={geojson}>
      {/* Fill layer */}
      <Layer
        id="territory-fill"
        type="fill"
        paint={{
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.25,
        }}
      />
      {/* Border glow - outer */}
      <Layer
        id="territory-border-outer"
        type="line"
        paint={{
          'line-color': ['get', 'color'],
          'line-width': 6,
          'line-opacity': 0.15,
          'line-blur': 8,
        }}
      />
      {/* Border glow - mid */}
      <Layer
        id="territory-border-mid"
        type="line"
        paint={{
          'line-color': ['get', 'color'],
          'line-width': 3,
          'line-opacity': 0.35,
          'line-blur': 3,
        }}
      />
      {/* Border - core */}
      <Layer
        id="territory-border-core"
        type="line"
        paint={{
          'line-color': ['get', 'color'],
          'line-width': 2,
          'line-opacity': 0.8,
        }}
      />
    </Source>
  );
}

export function TerritoryPopup() {
  const { selectedTerritory, setSelectedTerritory } = useMapStore();

  if (!selectedTerritory) return null;

  const owner = selectedTerritory.isSponsor
    ? mockSponsorZones.find((s) => s.id === selectedTerritory.sponsorId)
    : mockUsers.find((u) => u.id === selectedTerritory.ownerId);

  const ownerName = selectedTerritory.isSponsor
    ? (owner as typeof mockSponsorZones[0])?.brand
    : (owner as typeof mockUsers[0])?.name;

  const date = new Date(selectedTerritory.capturedAt).toLocaleDateString();

  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 glass rounded-2xl p-4 min-w-[240px]">
      <button
        onClick={() => setSelectedTerritory(null)}
        className="absolute top-2 right-3 text-terra-muted hover:text-foreground text-lg"
      >
        &times;
      </button>
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-4 h-4 rounded-full"
          style={{ background: selectedTerritory.color }}
        />
        <span className="font-bold">{ownerName || 'Unknown'}</span>
      </div>
      <p className="text-sm font-medium mb-2">{selectedTerritory.name}</p>
      {selectedTerritory.isSponsor && (
        <div className="mb-2 text-sm">
          <span className="text-terra-muted">Sponsor Zone</span>
          <p className="text-terra-green font-mono text-xs mt-1">
            {(owner as typeof mockSponsorZones[0])?.couponCode}
          </p>
        </div>
      )}
      <div className="text-sm text-terra-muted space-y-1">
        <p>Captured: {date}</p>
        <p>Area: {selectedTerritory.area} km&sup2;</p>
      </div>
    </div>
  );
}
