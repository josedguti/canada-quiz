import { QuizAttempt } from "@/lib/types";
import { topicLabel } from "@/lib/quiz-utils";
import { Badge } from "@/components/ui/Badge";

interface ScoreSummaryProps {
  attempt: QuizAttempt;
}

export function ScoreSummary({ attempt }: ScoreSummaryProps) {
  const { scorePercent, correctCount, totalQuestions, passed, topicBreakdown } = attempt;

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white shadow-sm p-6 md:p-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="text-6xl font-bold text-zinc-900">{scorePercent}%</div>
        <p className="text-zinc-500 text-sm">
          {correctCount} of {totalQuestions} correct
        </p>
        <Badge variant={passed ? "pass" : "fail"}>
          {passed ? "Passed" : "Not passed"}
        </Badge>
      </div>

      {topicBreakdown.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
            By Topic
          </p>
          {topicBreakdown.map((tb) => {
            const pct = tb.total > 0 ? Math.round((tb.correct / tb.total) * 100) : 0;
            return (
              <div key={tb.topic} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-700">{topicLabel(tb.topic)}</span>
                  <span className="text-zinc-500 tabular-nums">
                    {tb.correct}/{tb.total}
                  </span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${pct >= 75 ? "bg-emerald-500" : "bg-red-400"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
