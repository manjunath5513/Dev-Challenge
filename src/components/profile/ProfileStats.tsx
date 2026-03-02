'use client';

import { motion } from 'framer-motion';
import {
  Footprints,
  MapPin,
  Maximize2,
  Route,
  Flame,
  Award,
  Clock,
  Hexagon,
  Trophy,
} from 'lucide-react';
import { mockUsers, mockActivities } from '@/lib/mock-data';

const user = mockUsers[0]; // Alex Rivera as the current user

const statCards = [
  { label: 'Total Runs', value: user.stats.totalRuns, icon: Footprints, color: '#00FF88' },
  { label: 'Territories', value: user.stats.territories, icon: MapPin, color: '#4488FF' },
  { label: 'Total Area', value: `${user.stats.totalArea} km²`, icon: Maximize2, color: '#FFAA00' },
  { label: 'Distance', value: `${user.stats.distance} km`, icon: Route, color: '#AA44FF' },
  { label: 'Active Streak', value: `${user.stats.activeStreak} days`, icon: Flame, color: '#FF4444' },
  { label: 'Level', value: user.level, icon: Trophy, color: '#00DDFF' },
];

const badgeIcons: Record<string, string> = {
  'First Capture': '🎯',
  'Territory King': '👑',
  'Marathon Runner': '🏃',
  '7-Day Streak': '🔥',
  'Night Owl': '🦉',
};

export default function ProfileStats() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* User header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-5xl mb-3">{user.avatar}</div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Award className="w-4 h-4 text-terra-green" />
          <span className="text-terra-muted text-sm">Level {user.level} &middot; Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-terra-card border border-terra-border rounded-2xl p-4"
          >
            <stat.icon className="w-5 h-5 mb-2" style={{ color: stat.color }} />
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-xs text-terra-muted">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Badges */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Hexagon className="w-5 h-5 text-terra-green" />
          Achievements
        </h2>
        <div className="flex flex-wrap gap-2">
          {user.badges.map((badge) => (
            <div
              key={badge}
              className="bg-terra-card border border-terra-border rounded-xl px-4 py-2 flex items-center gap-2"
            >
              <span className="text-lg">{badgeIcons[badge] || '🏅'}</span>
              <span className="text-sm font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-terra-green" />
          Recent Activity
        </h2>
        <div className="space-y-2">
          {mockActivities.map((activity, i) => {
            const typeIcons: Record<string, string> = {
              capture: '🏴',
              run: '🏃',
              badge: '🏅',
              reclaim: '⚔️',
            };
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 bg-terra-card border border-terra-border rounded-xl px-4 py-3"
              >
                <span className="text-lg">{typeIcons[activity.type]}</span>
                <div className="flex-1">
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-terra-muted">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
