'use client';

import { motion } from 'framer-motion';
import { Gift, MapPin, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { mockSponsorZones } from '@/lib/mock-data';

export default function SponsorsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <Gift className="w-6 h-6 text-terra-green" />
        Sponsor Zones
      </h1>
      <p className="text-terra-muted text-sm mb-8">
        Run through sponsor zones on the map to unlock exclusive deals and coupons.
      </p>

      {/* How it works */}
      <div className="bg-terra-card border border-terra-border rounded-2xl p-6 mb-8">
        <h2 className="font-bold mb-3">How Sponsor Zones Work</h2>
        <div className="space-y-3 text-sm text-terra-muted">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-terra-green/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-terra-green text-xs font-bold">1</span>
            </div>
            <p>Find sponsor zones on the map marked with brand colors and icons</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-terra-green/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-terra-green text-xs font-bold">2</span>
            </div>
            <p>Run a loop that passes through or encloses the sponsor zone</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-terra-green/10 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-terra-green text-xs font-bold">3</span>
            </div>
            <p>Unlock the coupon code and redeem with the brand</p>
          </div>
        </div>
      </div>

      {/* Sponsor cards */}
      <div className="space-y-4">
        {mockSponsorZones.map((sponsor, i) => (
          <motion.div
            key={sponsor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-terra-card border border-terra-border rounded-2xl overflow-hidden"
          >
            <div
              className="h-1.5"
              style={{ background: sponsor.color }}
            />
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold"
                    style={{ background: sponsor.color }}
                  >
                    {sponsor.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{sponsor.brand}</h3>
                    <div className="flex items-center gap-1 text-terra-muted text-xs">
                      <MapPin className="w-3 h-3" />
                      Central Park Area
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-terra-muted mb-4">
                {sponsor.couponDescription}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-terra-dark rounded-lg px-3 py-2">
                  <Tag className="w-4 h-4 text-terra-green" />
                  <code className="text-terra-green text-sm font-mono">
                    {sponsor.couponCode}
                  </code>
                </div>
                <Link
                  href="/map"
                  className="flex items-center gap-1 text-sm text-terra-green hover:underline"
                >
                  View on map
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
