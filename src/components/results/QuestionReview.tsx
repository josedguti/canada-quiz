import { AnsweredQuestion, Question } from "@/lib/types";
import { topicLabel } from "@/lib/quiz-utils";

interface QuestionReviewProps {
  answers: AnsweredQuestion[];
  questions: Question[];
}

export function QuestionReview({ answers, questions }: QuestionReviewProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">
        Question Review
      </h2>
      {answers.map((answer, i) => {
        const q = questions.find((q) => q.id === answer.questionId);
        if (!q) return null;

        return (
          <div
            key={answer.questionId}
            className="rounded-2xl border border-zinc-100 bg-white shadow-sm p-5 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-zinc-900 leading-relaxed">
                {i + 1}. {q.question}
              </p>
              <span className="text-xs text-zinc-400 whitespace-nowrap">
                {topicLabel(q.topic)}
              </span>
            </div>

            <div className="space-y-1.5">
              {q.options.map((opt, idx) => {
                const isCorrect = idx === q.correctIndex;
                const isSelected = idx === answer.selectedIndex;

                let cls = "rounded-lg px-3 py-2 text-sm";
                if (isCorrect) {
                  cls += " bg-emerald-50 text-emerald-900 font-medium";
                } else if (isSelected && !isCorrect) {
                  cls += " bg-red-50 text-red-800 line-through";
                } else {
                  cls += " text-zinc-400";
                }

                return (
                  <div key={idx} className={cls}>
                    {isCorrect && <span className="mr-1">✓</span>}
                    {isSelected && !isCorrect && <span className="mr-1">✗</span>}
                    {opt}
                  </div>
                );
              })}
            </div>

            <div className={`rounded-xl border-l-4 px-3 py-2 text-xs ${answer.isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-900" : "border-red-400 bg-red-50 text-red-900"}`}>
              {q.explanation}
            </div>
          </div>
        );
      })}
    </div>
  );
}
