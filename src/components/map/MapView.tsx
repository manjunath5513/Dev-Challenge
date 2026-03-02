'use client';

import { useState, useCallback } from 'react';
import MapGL, { NavigationControl, GeolocateControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapStore } from '@/store/useMapStore';
import { MAP_CENTER, MAP_ZOOM } from '@/lib/constants';
import TerritoryLayer, { TerritoryPopup } from './TerritoryLayer';
import RouteLayer from './RouteLayer';
import SponsorZones from './SponsorZones';
import MapStyleSwitcher from './MapStyleSwitcher';
import RunSimulation from './RunSimulation';
import { mockUsers } from '@/lib/mock-data';
import { MapPin, Play, BarChart3 } from 'lucide-react';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export default function MapView() {
  const { mapStyle, territories, isSimulating } = useMapStore();
  const [viewState, setViewState] = useState({
    longitude: MAP_CENTER.lng,
    latitude: MAP_CENTER.lat,
    zoom: MAP_ZOOM,
    pitch: 0,
    bearing: 0,
  });

  const togglePitch = useCallback(() => {
    setViewState((prev) => ({
      ...prev,
      pitch: prev.pitch > 0 ? 0 : 60,
    }));
  }, []);

  // Stats from actual territory data
  const totalTerritories = territories.length;
  const totalArea = territories.reduce((sum, t) => sum + t.area, 0).toFixed(1);
  const activeRunners = mockUsers.length;

  return (
    <div className="relative w-full h-[calc(100vh-3.5rem)]">
      <MapGL
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={mapStyle}
        style={{ width: '100%', height: '100%' }}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" showCompass={false} />
        <GeolocateControl position="bottom-right" />

        <TerritoryLayer />
        <RouteLayer />
        <SponsorZones />
        <RunSimulation />
      </MapGL>

      {/* Stats bar */}
      <div className="absolute top-2 left-4 right-16 z-10">
        <div className="glass rounded-xl px-4 py-2.5 flex items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-terra-green" />
            <span className="text-terra-muted">Territories</span>
            <span className="font-bold">{totalTerritories}</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span className="text-terra-muted">Area</span>
            <span className="font-bold">{totalArea} km&sup2;</span>
          </div>
          <div className="flex items-center gap-2 hidden sm:flex">
            <div className="w-2 h-2 rounded-full bg-terra-green animate-pulse" />
            <span className="text-terra-muted">Runners</span>
            <span className="font-bold">{activeRunners}</span>
          </div>
        </div>
      </div>

      <MapStyleSwitcher />
      <TerritoryPopup />

      {/* 3D toggle — positioned above the Mapbox zoom/geolocate controls with spacing */}
      <div className="absolute bottom-44 md:bottom-32 right-4 z-10">
        <button
          onClick={togglePitch}
          className="glass w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors text-sm font-bold"
          title="Toggle 3D"
        >
          3D
        </button>
      </div>

      {/* Demo Run Button */}
      {!isSimulating && <DemoRunButton />}
    </div>
  );
}

function DemoRunButton() {
  const { setIsSimulating } = useMapStore();

  return (
    <button
      onClick={() => setIsSimulating(true)}
      className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-10 glass rounded-2xl px-6 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors group"
    >
      <div className="w-8 h-8 rounded-full bg-terra-green/20 flex items-center justify-center group-hover:bg-terra-green/30 transition-colors">
        <Play className="w-4 h-4 text-terra-green fill-terra-green" />
      </div>
      <span className="font-medium">Watch Demo Run</span>
    </button>
  );
}
