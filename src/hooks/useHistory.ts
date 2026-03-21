"use client";

import { useCallback, useState } from "react";
import { clearHistory, loadHistory } from "@/lib/storage";

export function useHistory() {
  const [history, setHistory] = useState(() => loadHistory());

  const refresh = useCallback(() => {
    setHistory(loadHistory());
  }, []);

  const clear = useCallback(() => {
    clearHistory();
    setHistory({ version: 1, attempts: [] });
  }, []);

  return { history, refresh, clear };
}
