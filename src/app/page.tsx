import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';

export default function Home() {
  return (
    <div className="-mt-14">
      <Hero />
      <Features />
      <HowItWorks />
      <footer className="py-12 px-4 text-center border-t border-terra-border">
        <p className="text-terra-muted text-sm">
          Built for DEV Weekend Challenge 2026 &middot; TerraRun
        </p>
      </footer>
    </div>
  );
}
