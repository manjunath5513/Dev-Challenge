'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Run a Closed Loop',
    description: 'Start running and form a closed path. When your route connects back to the start, the loop closes.',
  },
  {
    number: '02',
    title: 'Capture Hexagons',
    description: 'Every hexagon inside your loop becomes your territory. The area lights up in your color on the map.',
  },
  {
    number: '03',
    title: 'Dominate the Leaderboard',
    description: 'The more territory you hold, the higher you rank. Defend your turf and expand your empire.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-terra-card/50">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16"
        >
          How It <span className="text-terra-green">Works</span>
        </motion.h2>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex gap-6 items-start"
            >
              <div className="shrink-0 w-16 h-16 rounded-2xl bg-terra-green/10 border border-terra-green/20 flex items-center justify-center">
                <span className="text-terra-green font-bold text-xl">{step.number}</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-terra-muted leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
