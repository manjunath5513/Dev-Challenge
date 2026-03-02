'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { Source, Layer, Marker } from 'react-map-gl/mapbox';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X } from 'lucide-react';
import { useMapStore } from '@/store/useMapStore';
import { demoRunRoute } from '@/lib/mock-data';
import { routeToNewTerritory } from '@/lib/territory';
import ShareModal from './ShareModal';

export default function RunSimulation() {
  const {
    isSimulating,
    setIsSimulating,
    simulationProgress,
    setSimulationProgress,
    addTerritory,
    capturedPolygon,
    setCapturedPolygon,
  } = useMapStore();

  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const [phase, setPhase] = useState<'running' | 'captured' | 'idle'>('idle');
  const [captureArea, setCaptureArea] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const route = demoRunRoute;
  const totalPoints = route.points.length;
  const DURATION = 8000;

  // Trail line drawn so far
  const trailGeoJSON = useMemo(() => {
    const visiblePoints = route.points.slice(0, currentPointIndex + 1);
    return {
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'LineString' as const,
        coordinates: visiblePoints.map((p) => [p.lng, p.lat]),
      },
    };
  }, [currentPointIndex, route.points]);

  // Captured polygon GeoJSON
  const capturedGeoJSON = useMemo(() => {
    if (!capturedPolygon) return null;
    return {
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'Polygon' as const,
        coordinates: [capturedPolygon],
      },
    };
  }, [capturedPolygon]);

  const safeIndex = Math.max(0, Math.min(currentPointIndex, totalPoints - 1));
  const currentPos = route.points[safeIndex] ?? route.points[0];

  // Animation loop
  useEffect(() => {
    if (!isSimulating) {
      return;
    }

    setPhase('running');
    setCurrentPointIndex(0);
    setCapturedPolygon(null);
    startTimeRef.current = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTimeRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const pointIndex = Math.floor(progress * (totalPoints - 1));

      setSimulationProgress(progress);
      setCurrentPointIndex(pointIndex);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        triggerCapture();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isSimulating]);

  const triggerCapture = () => {
    const newTerritory = routeToNewTerritory(
      route.points,
      'user-1',
      '#00FF88',
      route.name,
    );

    setCapturedPolygon(newTerritory.polygon);
    setCaptureArea(newTerritory.area);
    setPhase('captured');
    addTerritory(newTerritory);
  };

  const handleDismiss = () => {
    setPhase('idle');
    setIsSimulating(false);
    setSimulationProgress(0);
    setCapturedPolygon(null);
    setCurrentPointIndex(0);
    setShowShareModal(false);
  };

  if (!isSimulating && phase === 'idle') return null;

  return (
    <>
      {/* Trail line */}
      <Source id="sim-trail" type="geojson" data={trailGeoJSON}>
        <Layer
          id="sim-trail-glow"
          type="line"
          paint={{
            'line-color': '#00FF88',
            'line-width': 8,
            'line-opacity': 0.3,
            'line-blur': 6,
          }}
        />
        <Layer
          id="sim-trail-line"
          type="line"
          paint={{
            'line-color': '#00FF88',
            'line-width': 3,
            'line-opacity': 0.9,
          }}
        />
      </Source>

      {/* Captured area fill */}
      {capturedGeoJSON && (
        <Source id="sim-captured" type="geojson" data={capturedGeoJSON}>
          <Layer
            id="sim-captured-fill"
            type="fill"
            paint={{
              'fill-color': '#00FF88',
              'fill-opacity': 0.4,
            }}
          />
          <Layer
            id="sim-captured-border"
            type="line"
            paint={{
              'line-color': '#00FF88',
              'line-width': 3,
              'line-opacity': 0.9,
            }}
          />
        </Source>
      )}

      {/* Runner marker */}
      {currentPos && phase === 'running' && (
        <Marker longitude={currentPos.lng} latitude={currentPos.lat} anchor="center">
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-terra-green shadow-lg shadow-terra-green/50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
            <div className="absolute inset-0 w-6 h-6 rounded-full bg-terra-green/30 animate-ping" />
          </div>
        </Marker>
      )}

      {/* Progress bar (during run) */}
      {phase === 'running' && (
        <div className="absolute top-16 left-4 right-4 z-20">
          <div className="glass rounded-xl px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Demo Run in Progress...</span>
              <span className="text-sm text-terra-muted">
                {(simulationProgress * route.distance).toFixed(1)} / {route.distance} km
              </span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-terra-green rounded-full"
                style={{ width: `${simulationProgress * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Capture result overlay with Share button */}
      <AnimatePresence>
        {phase === 'captured' && !showShareModal && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute top-16 left-4 right-4 z-20"
          >
            <div className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-terra-green flex items-center gap-2">
                    🏆 Territory Captured!
                  </h3>
                  <p className="text-sm text-terra-muted mt-1">
                    {route.name} &middot; {route.distance} km &middot; {captureArea} km&sup2;
                  </p>
                </div>
                <button
                  onClick={handleDismiss}
                  className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-terra-muted hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-terra-green text-terra-dark font-bold py-3 rounded-xl hover:bg-terra-green-dim transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share Run
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-5 py-3 rounded-xl bg-white/5 text-terra-muted hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <ShareModal
            routeName={route.name}
            points={route.points}
            distance={route.distance}
            duration={route.duration}
            area={captureArea}
            onClose={() => {
              setShowShareModal(false);
              handleDismiss();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
