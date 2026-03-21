import Link from "next/link";
import { NUM_TESTS } from "@/lib/quiz-config";

export function HeroSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🍁</span>
        <h1 className="text-2xl font-bold text-zinc-900">Canada Citizenship Quiz</h1>
      </div>
      <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
        Practice with 400 Discover Canada questions split into 20 fixed tests.
        Each test has 20 unique questions with instant explanations and score history.
      </p>
      <div className="pt-1">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">
          Choose a Practice Test
        </p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: NUM_TESTS }, (_, i) => i + 1).map((n) => (
            <Link key={n} href={`/quiz?test=${n}`}>
              <div className="rounded-xl border border-zinc-200 bg-white hover:border-red-400 hover:bg-red-50 transition-colors cursor-pointer px-3 py-3 text-center shadow-sm">
                <p className="text-xs text-zinc-400 font-medium">Test</p>
                <p className="text-lg font-bold text-zinc-900">{n}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
