import { useEffect, useState } from "react";

const STEP_INTERVAL = 900;

export const useEvidenceTimeline = (total: number, reduced: boolean) => {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (reduced) return;

    const resetTimer = window.setTimeout(() => setRevealed(0), 0);
    const timers = Array.from({ length: total }, (_, index) =>
      window.setTimeout(() => setRevealed(index + 1), STEP_INTERVAL * (index + 1)),
    );

    return () => {
      window.clearTimeout(resetTimer);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduced, total]);

  return reduced ? total : revealed;
};

export const useCountUp = (target: number, run: boolean, reduced: boolean) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run || reduced) return;

    const start = performance.now();
    const duration = 900;
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, run, target]);

  return reduced ? target : value;
};
