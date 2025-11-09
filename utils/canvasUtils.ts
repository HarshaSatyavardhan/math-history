/**
 * Canvas drawing utility functions
 */

/**
 * Clear canvas
 */
export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  ctx.clearRect(0, 0, width, height);
}

/**
 * Fill canvas with color
 */
export function fillCanvas(
  ctx: CanvasRenderingContext2D,
  color: string,
  width: number,
  height: number
): void {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Draw grid
 */
export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  spacing: number = 50,
  color: string = 'rgba(255, 255, 255, 0.1)'
): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  // Vertical lines
  for (let x = 0; x <= width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Horizontal lines
  for (let y = 0; y <= height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

/**
 * Draw axes
 */
export function drawAxes(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  options: {
    originX?: number;
    originY?: number;
    color?: string;
    lineWidth?: number;
    showArrows?: boolean;
  } = {}
): void {
  const {
    originX = width / 2,
    originY = height / 2,
    color = 'rgba(255, 255, 255, 0.3)',
    lineWidth = 2,
    showArrows = true,
  } = options;

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  // X-axis
  ctx.beginPath();
  ctx.moveTo(0, originY);
  ctx.lineTo(width, originY);
  ctx.stroke();

  // Y-axis
  ctx.beginPath();
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, height);
  ctx.stroke();

  if (showArrows) {
    const arrowSize = 10;

    // X-axis arrow
    ctx.beginPath();
    ctx.moveTo(width - arrowSize, originY - arrowSize / 2);
    ctx.lineTo(width, originY);
    ctx.lineTo(width - arrowSize, originY + arrowSize / 2);
    ctx.stroke();

    // Y-axis arrow
    ctx.beginPath();
    ctx.moveTo(originX - arrowSize / 2, arrowSize);
    ctx.lineTo(originX, 0);
    ctx.lineTo(originX + arrowSize / 2, arrowSize);
    ctx.stroke();
  }
}

/**
 * Draw a line
 */
export function drawLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string = '#ffffff',
  lineWidth: number = 2
): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

/**
 * Draw a circle
 */
export function drawCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  fillColor?: string,
  strokeColor?: string,
  lineWidth: number = 2
): void {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

/**
 * Draw a rectangle
 */
export function drawRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fillColor?: string,
  strokeColor?: string,
  lineWidth: number = 2
): void {
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
  }

  if (strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x, y, width, height);
  }
}

/**
 * Draw text
 */
export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  options: {
    font?: string;
    fillColor?: string;
    align?: CanvasTextAlign;
    baseline?: CanvasTextBaseline;
  } = {}
): void {
  const {
    font = '14px sans-serif',
    fillColor = '#ffffff',
    align = 'left',
    baseline = 'alphabetic',
  } = options;

  ctx.font = font;
  ctx.fillStyle = fillColor;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  ctx.fillText(text, x, y);
}

/**
 * Draw a smooth curve through points
 */
export function drawSmoothCurve(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[],
  color: string = '#ffffff',
  lineWidth: number = 2
): void {
  if (points.length < 2) return;

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();

  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }

  ctx.stroke();
}

/**
 * Draw a function plot
 */
export function drawFunction(
  ctx: CanvasRenderingContext2D,
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  width: number,
  height: number,
  options: {
    color?: string;
    lineWidth?: number;
    yMin?: number;
    yMax?: number;
    originY?: number;
  } = {}
): void {
  const {
    color = '#4ecdc4',
    lineWidth = 2,
    yMin = -1,
    yMax = 1,
    originY = height / 2,
  } = options;

  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();

  const step = (xMax - xMin) / width;

  for (let px = 0; px < width; px++) {
    const x = xMin + px * step;
    const y = fn(x);

    // Map y from [yMin, yMax] to canvas coordinates
    const py = originY - ((y - (yMin + yMax) / 2) / ((yMax - yMin) / 2)) * (height / 2 - 20);

    if (px === 0) {
      ctx.moveTo(px, py);
    } else {
      ctx.lineTo(px, py);
    }
  }

  ctx.stroke();
}

/**
 * Draw a histogram
 */
export function drawHistogram(
  ctx: CanvasRenderingContext2D,
  counts: number[],
  x: number,
  y: number,
  width: number,
  height: number,
  options: {
    fillColor?: string | CanvasGradient;
    strokeColor?: string;
    gap?: number;
  } = {}
): void {
  const { fillColor = '#667eea', strokeColor, gap = 2 } = options;

  const maxCount = Math.max(...counts);
  const barWidth = (width - gap * (counts.length - 1)) / counts.length;

  counts.forEach((count, i) => {
    const barHeight = (count / maxCount) * height;
    const barX = x + i * (barWidth + gap);
    const barY = y + height - barHeight;

    if (fillColor) {
      ctx.fillStyle = typeof fillColor === 'string' ? fillColor : fillColor;
      ctx.fillRect(barX, barY, barWidth, barHeight);
    }

    if (strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.strokeRect(barX, barY, barWidth, barHeight);
    }
  });
}

/**
 * Create a linear gradient
 */
export function createLinearGradient(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  colorStops: { offset: number; color: string }[]
): CanvasGradient {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);

  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });

  return gradient;
}

/**
 * Create a radial gradient
 */
export function createRadialGradient(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  r0: number,
  x1: number,
  y1: number,
  r1: number,
  colorStops: { offset: number; color: string }[]
): CanvasGradient {
  const gradient = ctx.createRadialGradient(x0, y0, r0, x1, y1, r1);

  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });

  return gradient;
}

/**
 * Draw an arrow
 */
export function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  options: {
    color?: string;
    lineWidth?: number;
    headSize?: number;
  } = {}
): void {
  const { color = '#ffffff', lineWidth = 2, headSize = 10 } = options;

  const angle = Math.atan2(y2 - y1, x2 - x1);

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;

  // Draw line
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  // Draw arrowhead
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - headSize * Math.cos(angle - Math.PI / 6),
    y2 - headSize * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    x2 - headSize * Math.cos(angle + Math.PI / 6),
    y2 - headSize * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
}

/**
 * Wrap text to fit within width
 */
export function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): void {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}
