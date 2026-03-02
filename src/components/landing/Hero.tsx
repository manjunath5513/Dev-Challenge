'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Footprints } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-terra-green/5 via-transparent to-terra-dark" />
        {/* Hex grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <pattern id="hex" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="#00FF88" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
        {/* Floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-terra-green/10 blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-blue-500/10 blur-[80px]"
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <Footprints className="w-10 h-10 text-terra-green" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Terra<span className="text-terra-green">Run</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-4xl font-bold gradient-text mb-4"
        >
          Run. Loop. Conquer.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-terra-muted mb-10 max-w-2xl mx-auto"
        >
          Claim territory by running closed loops. The world is your game board.
          Every run captures real hexagonal turf on the map.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/map"
            className="inline-flex items-center gap-2 bg-terra-green text-terra-dark font-bold px-8 py-4 rounded-2xl text-lg hover:bg-terra-green-dim transition-colors shadow-lg shadow-terra-green/20"
          >
            Explore the Map
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
