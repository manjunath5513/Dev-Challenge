'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Map, Satellite, Trees, Layers } from 'lucide-react';
import { MAP_STYLES } from '@/lib/constants';
import { useMapStore } from '@/store/useMapStore';

const iconMap: Record<string, typeof Moon> = {
  moon: Moon,
  map: Map,
  satellite: Satellite,
  trees: Trees,
};

export default function MapStyleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { mapStyle, setMapStyle } = useMapStore();

  return (
    <div className="absolute top-20 right-4 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
        title="Map Style"
      >
        <Layers className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute right-0 mt-2 glass rounded-xl overflow-hidden"
          >
            {MAP_STYLES.map((style) => {
              const Icon = iconMap[style.icon] || Map;
              const isActive = mapStyle === style.url;
              return (
                <button
                  key={style.id}
                  onClick={() => {
                    setMapStyle(style.url);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-terra-green/10 text-terra-green'
                      : 'text-terra-muted hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {style.name}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
