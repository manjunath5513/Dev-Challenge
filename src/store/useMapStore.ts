import { create } from 'zustand';
import type { Territory } from '@/types';
import { MAP_STYLES } from '@/lib/constants';

interface MapState {
  mapStyle: string;
  territories: Territory[];
  isSimulating: boolean;
  simulationProgress: number;
  selectedTerritory: Territory | null;
  capturedPolygon: [number, number][] | null;

  setMapStyle: (style: string) => void;
  setTerritories: (territories: Territory[]) => void;
  addTerritory: (territory: Territory) => void;
  setIsSimulating: (val: boolean) => void;
  setSimulationProgress: (val: number) => void;
  setSelectedTerritory: (territory: Territory | null) => void;
  setCapturedPolygon: (polygon: [number, number][] | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  mapStyle: MAP_STYLES[0].url,
  territories: [],
  isSimulating: false,
  simulationProgress: 0,
  selectedTerritory: null,
  capturedPolygon: null,

  setMapStyle: (style) => set({ mapStyle: style }),
  setTerritories: (territories) => set({ territories }),
  addTerritory: (territory) =>
    set((state) => ({
      territories: [...state.territories, territory],
    })),
  setIsSimulating: (val) => set({ isSimulating: val }),
  setSimulationProgress: (val) => set({ simulationProgress: val }),
  setSelectedTerritory: (territory) => set({ selectedTerritory: territory }),
  setCapturedPolygon: (polygon) => set({ capturedPolygon: polygon }),
}));
