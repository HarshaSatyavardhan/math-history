import { useRef, useEffect } from 'react';

interface UseCanvasOptions {
  width?: number;
  height?: number;
  enableRetinaScaling?: boolean;
}

interface CanvasContextReturn {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
  width: number;
  height: number;
}

/**
 * Custom hook for setting up and managing HTML5 Canvas
 * Handles retina display scaling and automatic resizing
 */
export const useCanvas = (
  options: UseCanvasOptions = {}
): CanvasContextReturn => {
  const {
    width = 800,
    height = 600,
    enableRetinaScaling = true,
  } = options;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;

    // Set up retina display scaling
    if (enableRetinaScaling) {
      const dpr = window.devicePixelRatio || 1;

      // Set actual canvas size (accounting for retina)
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Set display size (CSS pixels)
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Scale all drawing operations
      ctx.scale(dpr, dpr);
    } else {
      canvas.width = width;
      canvas.height = height;
    }

    // Handle window resize
    const handleResize = () => {
      if (enableRetinaScaling) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height, enableRetinaScaling]);

  return {
    canvasRef,
    ctx: ctxRef.current,
    width,
    height,
  };
};

/**
 * Hook for canvas drawing with automatic clear
 */
export const useCanvasDraw = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  drawFunction: (ctx: CanvasRenderingContext2D, width: number, height: number) => void,
  dependencies: React.DependencyList = []
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const displayWidth = canvas.width / (window.devicePixelRatio || 1);
    const displayHeight = canvas.height / (window.devicePixelRatio || 1);

    // Clear canvas
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Execute draw function
    drawFunction(ctx, displayWidth, displayHeight);
  }, [canvasRef, drawFunction, ...dependencies]);
};
