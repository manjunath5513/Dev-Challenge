'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, Check, MessageCircle, Send, Share2 } from 'lucide-react';
import type { RoutePoint } from '@/types';

interface ShareModalProps {
  routeName: string;
  points: RoutePoint[];
  distance: number;
  duration: number;
  area: number;
  onClose: () => void;
}

// X (Twitter) icon as inline SVG
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function ShareModal({
  routeName,
  points,
  distance,
  duration,
  area,
  onClose,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  // Render the route as an SVG path
  const svgPath = useMemo(() => {
    if (points.length < 2) return '';

    const lngs = points.map((p) => p.lng);
    const lats = points.map((p) => p.lat);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    const padding = 20;
    const width = 260;
    const height = 200;

    const scaleX = (width - padding * 2) / (maxLng - minLng || 1);
    const scaleY = (height - padding * 2) / (maxLat - minLat || 1);
    const scale = Math.min(scaleX, scaleY);

    const cx = (maxLng + minLng) / 2;
    const cy = (maxLat + minLat) / 2;

    const toSVG = (lng: number, lat: number) => {
      const x = width / 2 + (lng - cx) * scale;
      const y = height / 2 - (lat - cy) * scale; // flip Y
      return `${x},${y}`;
    };

    const d = points
      .map((p, i) => `${i === 0 ? 'M' : 'L'}${toSVG(p.lng, p.lat)}`)
      .join(' ');

    return d + ' Z';
  }, [points]);

  const shareText = `🏃 Just captured "${routeName}" on TerraRun!\n📏 ${distance} km run in ${duration} min\n🗺️ ${area} km² territory claimed\n\n#TerraRun #RunLoopConquer`;
  const shareUrl = 'https://terrarun.app';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
      '_blank',
    );
  };

  const shareTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      '_blank',
    );
  };

  const shareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank',
    );
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'TerraRun', text: shareText, url: shareUrl });
      } catch {
        // user cancelled
      }
    }
  };

  const pace = duration > 0 && distance > 0
    ? `${Math.floor(duration / distance)}'${Math.round(((duration / distance) % 1) * 60).toString().padStart(2, '0')}"`
    : '--';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-terra-card border border-terra-border rounded-3xl w-full max-w-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-end p-3 pb-0">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-terra-muted hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Route visualization */}
        <div className="px-6">
          <div className="relative bg-terra-dark rounded-2xl border border-terra-border overflow-hidden">
            <svg
              viewBox="0 0 260 200"
              className="w-full"
              style={{ height: 180 }}
            >
              {/* Grid dots */}
              {Array.from({ length: 6 }).map((_, i) =>
                Array.from({ length: 8 }).map((_, j) => (
                  <circle
                    key={`${i}-${j}`}
                    cx={20 + j * 32}
                    cy={15 + i * 35}
                    r="1"
                    fill="#1e1e30"
                  />
                )),
              )}
              {/* Route fill */}
              <path d={svgPath} fill="#00FF8820" stroke="none" />
              {/* Route glow */}
              <path
                d={svgPath}
                fill="none"
                stroke="#00FF88"
                strokeWidth="4"
                strokeOpacity="0.3"
                strokeLinejoin="round"
                filter="url(#glow)"
              />
              {/* Route line */}
              <path
                d={svgPath}
                fill="none"
                stroke="#00FF88"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* Start/end dot */}
              {points.length > 0 && (() => {
                const lngs = points.map((p) => p.lng);
                const lats = points.map((p) => p.lat);
                const minLng = Math.min(...lngs);
                const maxLng = Math.max(...lngs);
                const minLat = Math.min(...lats);
                const maxLat = Math.max(...lats);
                const scaleX = 220 / (maxLng - minLng || 1);
                const scaleY = 160 / (maxLat - minLat || 1);
                const scale = Math.min(scaleX, scaleY);
                const cx = (maxLng + minLng) / 2;
                const cy = (maxLat + minLat) / 2;
                const x = 130 + (points[0].lng - cx) * scale;
                const y = 100 - (points[0].lat - cy) * scale;
                return (
                  <>
                    <circle cx={x} cy={y} r="5" fill="#00FF88" opacity="0.3" />
                    <circle cx={x} cy={y} r="3" fill="#00FF88" />
                  </>
                );
              })()}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        {/* Route name */}
        <div className="px-6 pt-4 pb-2">
          <h3 className="text-xl font-bold">{routeName}</h3>
          <p className="text-terra-muted text-sm">Territory Captured</p>
        </div>

        {/* Stats grid */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-4 gap-3">
            <div>
              <p className="text-lg font-bold">{distance}</p>
              <p className="text-[11px] text-terra-muted">km</p>
            </div>
            <div>
              <p className="text-lg font-bold">{duration}</p>
              <p className="text-[11px] text-terra-muted">min</p>
            </div>
            <div>
              <p className="text-lg font-bold">{pace}</p>
              <p className="text-[11px] text-terra-muted">/km pace</p>
            </div>
            <div>
              <p className="text-lg font-bold">{area}</p>
              <p className="text-[11px] text-terra-muted">km&sup2;</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-terra-border mx-6" />

        {/* Share buttons */}
        <div className="px-6 py-4">
          <p className="text-sm text-terra-muted mb-3">Share your run</p>
          <div className="flex items-center gap-3">
            <button
              onClick={shareWhatsApp}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span className="text-[11px] text-[#25D366]">WhatsApp</span>
            </button>
            <button
              onClick={shareTelegram}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl bg-[#26A5E4]/10 hover:bg-[#26A5E4]/20 transition-colors"
            >
              <Send className="w-5 h-5 text-[#26A5E4]" />
              <span className="text-[11px] text-[#26A5E4]">Telegram</span>
            </button>
            <button
              onClick={shareX}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <XIcon className="w-5 h-5 text-white" />
              <span className="text-[11px] text-white">X</span>
            </button>
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={shareNative}
                className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl bg-terra-green/10 hover:bg-terra-green/20 transition-colors"
              >
                <Share2 className="w-5 h-5 text-terra-green" />
                <span className="text-[11px] text-terra-green">More</span>
              </button>
            )}
            <button
              onClick={handleCopy}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              {copied ? (
                <Check className="w-5 h-5 text-terra-green" />
              ) : (
                <Copy className="w-5 h-5 text-terra-muted" />
              )}
              <span className="text-[11px] text-terra-muted">
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </div>
        </div>

        {/* Branding */}
        <div className="px-6 pb-4 text-center">
          <p className="text-[10px] text-terra-muted/50">
            terrarun.app &middot; Run. Loop. Conquer.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
