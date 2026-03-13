"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { HistoryList } from "@/components/home/HistoryList";
import { useHistory } from "@/hooks/useHistory";

export default function HomePage() {
  const { history, clear } = useHistory();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-16 space-y-10">
        <HeroSection />
        <HistoryList attempts={history.attempts} onClear={clear} />
      </div>
    </div>
  );
}
