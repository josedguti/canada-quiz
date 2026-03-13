"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QuizAttempt } from "@/lib/types";

interface HistoryListProps {
  attempts: QuizAttempt[];
  onClear: () => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HistoryList({ attempts, onClear }: HistoryListProps) {
  if (attempts.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-100 bg-white shadow-sm p-6 text-center">
        <p className="text-sm text-zinc-400">No quiz history yet. Take a quiz to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
          Recent History
        </h2>
        <Button variant="ghost" onClick={onClear} className="h-7 px-2 text-xs text-red-500 hover:text-red-700 hover:bg-red-50">
          Clear history
        </Button>
      </div>

      <div className="space-y-2">
        {attempts.map((attempt) => (
          <div
            key={attempt.id}
            className="rounded-xl border border-zinc-100 bg-white shadow-sm px-4 py-3 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-base font-bold text-zinc-900 tabular-nums w-12 shrink-0">
                {attempt.scorePercent}%
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-500">
                  Practice Test {attempt.testNumber ?? "—"}
                </p>
                <p className="text-xs text-zinc-400 truncate">{formatDate(attempt.completedAt)}</p>
                <p className="text-xs text-zinc-500">
                  {attempt.correctCount}/{attempt.totalQuestions} correct
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant={attempt.passed ? "pass" : "fail"}>
                {attempt.passed ? "Pass" : "Fail"}
              </Badge>
              <Link
                href={`/results?id=${attempt.id}`}
                className="text-xs font-medium text-zinc-600 hover:text-zinc-900 underline underline-offset-2"
              >
                Review
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
