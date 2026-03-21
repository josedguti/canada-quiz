"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useMemo } from "react";
import { getAttemptById } from "@/lib/storage";
import { questions } from "@/lib/questions";
import { ScoreSummary } from "@/components/results/ScoreSummary";
import { QuestionReview } from "@/components/results/QuestionReview";
import { Button } from "@/components/ui/Button";

function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const attempt = useMemo(() => {
    if (!id) {
      return null;
    }

    return getAttemptById(id);
  }, [id]);

  const notFound = !id || !attempt;

  if (notFound) {
    return (
      <div className="min-h-screen bg-zinc-50">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
          <p className="text-zinc-500">Result not found.</p>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const orderedQuestions = attempt.answers.map(
    (a) => questions.find((q) => q.id === a.questionId)!
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-16 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold text-zinc-900">Your Results</h1>
          <Button variant="secondary" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>

        <ScoreSummary attempt={attempt} />
        <QuestionReview answers={attempt.answers} questions={orderedQuestions} />

        <div className="flex gap-3 pt-2">
          <Button onClick={() => router.push("/quiz")}>Practice Again</Button>
          <Button variant="secondary" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <p className="text-zinc-400 text-sm">Loading…</p>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  );
}
