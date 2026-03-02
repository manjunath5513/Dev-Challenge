'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Trophy, Medal } from 'lucide-react';
import { mockUsers } from '@/lib/mock-data';

const tabs = ['All Time', 'This Week', 'Nearby'] as const;

const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
const rankLabels = ['1st', '2nd', '3rd'];

export default function LeaderboardTable() {
  const [activeTab, setActiveTab] = useState<string>('All Time');
  const [search, setSearch] = useState('');

  // Sort users by territories descending
  const sorted = [...mockUsers]
    .sort((a, b) => b.stats.territories - a.stats.territories)
    .filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-terra-green" />
        Leaderboard
      </h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terra-muted" />
        <input
          type="text"
          placeholder="Search runners..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-terra-card border border-terra-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-terra-green/50"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-terra-card rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-terra-green/10 text-terra-green'
                : 'text-terra-muted hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {sorted.slice(0, 3).map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-terra-card border border-terra-border rounded-2xl p-4 text-center ${
              i === 0 ? 'border-yellow-500/30' : i === 1 ? 'border-gray-400/30' : 'border-amber-700/30'
            }`}
          >
            <div className="text-3xl mb-2">{user.avatar}</div>
            <Medal className="w-5 h-5 mx-auto mb-1" style={{ color: rankColors[i] }} />
            <p className="font-bold text-sm truncate">{user.name}</p>
            <p className="text-xs text-terra-muted mt-1">
              {user.stats.territories} territories
            </p>
            <p className="text-xs text-terra-muted">
              {user.stats.totalArea} km&sup2;
            </p>
          </motion.div>
        ))}
      </div>

      {/* Full rankings */}
      <div className="space-y-2">
        {sorted.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 bg-terra-card border border-terra-border rounded-xl px-4 py-3"
          >
            <span
              className={`w-8 text-center font-bold text-sm ${
                i < 3 ? '' : 'text-terra-muted'
              }`}
              style={i < 3 ? { color: rankColors[i] } : undefined}
            >
              {i < 3 ? rankLabels[i] : `#${i + 1}`}
            </span>
            <span className="text-2xl">{user.avatar}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user.name}</p>
              <p className="text-xs text-terra-muted">Level {user.level}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">{user.stats.territories}</p>
              <p className="text-xs text-terra-muted">{user.stats.totalArea} km&sup2;</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="font-bold text-sm">{user.stats.totalRuns}</p>
              <p className="text-xs text-terra-muted">runs</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
