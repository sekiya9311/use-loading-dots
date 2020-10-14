import { useCallback, useEffect, useState } from 'react';

export interface useLoadingDotsArgs {
  readonly maxCount?: number;
  readonly intervalMs?: number;
}
export interface useLoadingDotsResponse {
  readonly count: number;
  readonly start: () => void;
  readonly stop: (withReset?: boolean) => void;
  readonly reset: (withStop?: boolean) => void;
}

export const useLoadingDots = ({ maxCount = 3, intervalMs = 500 }: useLoadingDotsArgs): useLoadingDotsResponse => {
  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setCount((x) => (x + 1) % (maxCount + 1));
    }, intervalMs);

    return () => clearInterval(id);
  }, [running, maxCount, intervalMs]);

  const start = useCallback(() => {
    setRunning(true);
  }, []);
  const stop = useCallback((withReset: boolean = false) => {
    setRunning(false);
    if (withReset) {
      setCount(0);
    }
  }, []);
  const reset = useCallback((withStop: boolean = false) => {
    setCount(0);
    if (withStop) {
      setRunning(false);
    }
  }, []);

  return {
    count,
    start,
    stop,
    reset,
  };
};
