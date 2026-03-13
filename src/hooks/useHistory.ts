"use client";

import { useCallback, useEffect, useState } from "react";
import { clearHistory, loadHistory } from "@/lib/storage";
import { QuizHistory } from "@/lib/types";

export function useHistory() {
  const [history, setHistory] = useState<QuizHistory>({ version: 1, attempts: [] });

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const refresh = useCallback(() => {
    setHistory(loadHistory());
  }, []);

  const clear = useCallback(() => {
    clearHistory();
    setHistory({ version: 1, attempts: [] });
  }, []);

  return { history, refresh, clear };
}
