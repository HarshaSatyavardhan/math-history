import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAnimationOptions {
  fps?: number;
  autoStart?: boolean;
}

interface AnimationControls {
  isAnimating: boolean;
  time: number;
  frame: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  toggle: () => void;
}

/**
 * Custom hook for managing animation loops with requestAnimationFrame
 * Provides play/pause/reset controls and frame counting
 */
export const useAnimation = (
  onFrame?: (time: number, frame: number) => void,
  options: UseAnimationOptions = {}
): AnimationControls => {
  const { fps = 60, autoStart = false } = options;

  const [isAnimating, setIsAnimating] = useState(autoStart);
  const [time, setTime] = useState(0);
  const [frame, setFrame] = useState(0);

  const animationIdRef = useRef<number>();
  const lastFrameTimeRef = useRef<number>(0);
  const frameInterval = 1000 / fps;

  const animate = useCallback(
    (currentTime: number) => {
      if (!isAnimating) return;

      const elapsed = currentTime - lastFrameTimeRef.current;

      if (elapsed > frameInterval) {
        lastFrameTimeRef.current = currentTime - (elapsed % frameInterval);

        setTime((prev) => prev + elapsed / 1000);
        setFrame((prev) => prev + 1);

        if (onFrame) {
          onFrame(time, frame);
        }
      }

      animationIdRef.current = requestAnimationFrame(animate);
    },
    [isAnimating, frameInterval, onFrame, time, frame]
  );

  useEffect(() => {
    if (isAnimating) {
      lastFrameTimeRef.current = performance.now();
      animationIdRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isAnimating, animate]);

  const start = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const stop = useCallback(() => {
    setIsAnimating(false);
  }, []);

  const reset = useCallback(() => {
    setIsAnimating(false);
    setTime(0);
    setFrame(0);
  }, []);

  const toggle = useCallback(() => {
    setIsAnimating((prev) => !prev);
  }, []);

  return {
    isAnimating,
    time,
    frame,
    start,
    stop,
    reset,
    toggle,
  };
};

/**
 * Hook for interval-based updates (alternative to requestAnimationFrame)
 */
export const useInterval = (
  callback: () => void,
  delay: number | null,
  immediate = false
) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (immediate) {
      savedCallback.current?.();
    }

    if (delay === null) return;

    const interval = setInterval(() => {
      savedCallback.current?.();
    }, delay);

    return () => clearInterval(interval);
  }, [delay, immediate]);
};
