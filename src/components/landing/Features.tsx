'use client';

import { motion } from 'framer-motion';
import { Hexagon, Swords, Gift } from 'lucide-react';

const features = [
  {
    icon: Hexagon,
    title: 'Claim Territory',
    description: 'Run a closed loop to capture hexagonal territory. The bigger your loop, the more turf you own.',
    color: '#00FF88',
  },
  {
    icon: Swords,
    title: 'Compete & Reclaim',
    description: 'Other runners can reclaim your territory by running through it. Defend your turf or conquer new land.',
    color: '#4488FF',
  },
  {
    icon: Gift,
    title: 'Earn Rewards',
    description: 'Run through sponsor zones to unlock exclusive coupons and deals from top running brands.',
    color: '#FFAA00',
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          Your Runs, <span className="text-terra-green">Your Turf</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-terra-card border border-terra-border rounded-2xl p-8 hover:border-terra-green/30 transition-colors group"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                style={{ background: `${feature.color}15` }}
              >
                <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-terra-muted leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
