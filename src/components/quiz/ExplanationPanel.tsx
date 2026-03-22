interface ExplanationPanelProps {
  explanation: string;
  studyGuidePage: number;
  isCorrect: boolean;
}

export function ExplanationPanel({
  explanation,
  studyGuidePage,
  isCorrect,
}: ExplanationPanelProps) {
  const borderColor = isCorrect ? "border-emerald-500" : "border-red-400";
  const bgColor = isCorrect ? "bg-emerald-50" : "bg-red-50";
  const textColor = isCorrect ? "text-emerald-900" : "text-red-900";
  const label = isCorrect ? "Correct!" : "Not quite";

  return (
    <div className={`rounded-xl border-l-4 px-4 py-3 ${borderColor} ${bgColor}`}>
      <p className={`text-sm font-semibold mb-1 ${textColor}`}>{label}</p>
      <p className={`text-sm ${textColor} opacity-90`}>{explanation}</p>
      <p className={`mt-2 text-xs font-bold ${textColor} opacity-80`}>
        Page {studyGuidePage}
      </p>
    </div>
  );
}
