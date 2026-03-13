"use client";

interface OptionButtonProps {
  label: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isRevealed: boolean;
  onClick: () => void;
}

export function OptionButton({
  label,
  index,
  isSelected,
  isCorrect,
  isRevealed,
  onClick,
}: OptionButtonProps) {
  const letters = ["A", "B", "C", "D"];

  let containerClass =
    "w-full flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors";

  if (!isRevealed) {
    containerClass += " border-zinc-200 bg-white hover:border-zinc-400 cursor-pointer text-zinc-900";
  } else if (isCorrect) {
    containerClass += " border-emerald-500 bg-emerald-50 text-emerald-900 cursor-default";
  } else if (isSelected && !isCorrect) {
    containerClass += " border-red-400 bg-red-50 text-red-900 cursor-default";
  } else {
    containerClass += " border-zinc-100 bg-zinc-50 text-zinc-400 cursor-default";
  }

  let badgeClass =
    "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold";

  if (!isRevealed) {
    badgeClass += " bg-zinc-200 text-zinc-800";
  } else if (isCorrect) {
    badgeClass += " bg-emerald-500 text-white";
  } else if (isSelected && !isCorrect) {
    badgeClass += " bg-red-400 text-white";
  } else {
    badgeClass += " bg-zinc-200 text-zinc-400";
  }

  return (
    <button
      className={containerClass}
      onClick={!isRevealed ? onClick : undefined}
      disabled={isRevealed}
      aria-pressed={isSelected}
    >
      <span className={badgeClass}>{letters[index]}</span>
      <span className="pt-0.5">{label}</span>
    </button>
  );
}
