import { Question } from "@/lib/types";
import { OptionButton } from "./OptionButton";
import { ExplanationPanel } from "./ExplanationPanel";

interface QuestionCardProps {
  question: Question;
  selectedIndex: number | null;
  isRevealed: boolean;
  onSelect: (index: number) => void;
}

export function QuestionCard({
  question,
  selectedIndex,
  isRevealed,
  onSelect,
}: QuestionCardProps) {
  const isCorrect = selectedIndex === question.correctIndex;
  const questionTypeLabel =
    question.type === "true-false"
      ? "True or False"
      : question.type === "fill-in-the-blank"
        ? "Fill in the Blank"
        : "Multiple Choice";
  const badgeLabels = question.type === "true-false" ? ["T", "F"] : undefined;

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white shadow-sm p-6 md:p-8 space-y-5">
      <div className="space-y-2">
        <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
          {questionTypeLabel}
        </span>
        <p className="text-base font-semibold text-zinc-900 leading-relaxed">
          {question.question}
        </p>
      </div>

      <div className="space-y-2.5">
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            label={option}
            index={index}
            badgeLabel={badgeLabels?.[index]}
            isSelected={selectedIndex === index}
            isCorrect={index === question.correctIndex}
            isRevealed={isRevealed}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>

      {isRevealed && (
        <ExplanationPanel
          explanation={question.explanation}
          studyGuidePage={question.studyGuidePage}
          isCorrect={isCorrect}
        />
      )}
    </div>
  );
}
