import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { topicLabel } from "@/lib/quiz-utils";
import { Topic } from "@/lib/types";

interface QuizHeaderProps {
  current: number;
  total: number;
  topic: Topic;
  testNumber: number;
  onQuit: () => void;
}

export function QuizHeader({ current, total, topic, testNumber, onQuit }: QuizHeaderProps) {
  return (
    <div className="mb-6 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-0.5">
            Practice Test {testNumber}
          </p>
          <span className="text-sm text-zinc-500">
            Question {current} of {total}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
            {topicLabel(topic)}
          </span>
          <Button variant="ghost" onClick={onQuit} className="h-8 px-3 text-xs">
            Quit
          </Button>
        </div>
      </div>
      <ProgressBar current={current} total={total} />
    </div>
  );
}
