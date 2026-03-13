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

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white shadow-sm p-6 md:p-8 space-y-5">
      <p className="text-base font-semibold text-zinc-900 leading-relaxed">
        {question.question}
      </p>

      <div className="space-y-2.5">
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            label={option}
            index={index}
            isSelected={selectedIndex === index}
            isCorrect={index === question.correctIndex}
            isRevealed={isRevealed}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>

      {isRevealed && (
        <ExplanationPanel explanation={question.explanation} isCorrect={isCorrect} />
      )}
    </div>
  );
}
