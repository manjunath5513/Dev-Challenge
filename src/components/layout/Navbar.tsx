'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Trophy, User, Gift, Footprints } from 'lucide-react';

const navItems = [
  { href: '/map', label: 'Map', icon: Map },
  { href: '/leaderboard', label: 'Ranks', icon: Trophy },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/sponsors', label: 'Sponsors', icon: Gift },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/" className="flex items-center gap-2">
            <Footprints className="w-6 h-6 text-terra-green" />
            <span className="font-bold text-lg tracking-tight">
              Terra<span className="text-terra-green">Run</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-terra-green/10 text-terra-green'
                      : 'text-terra-muted hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                  isActive
                    ? 'text-terra-green'
                    : 'text-terra-muted'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
