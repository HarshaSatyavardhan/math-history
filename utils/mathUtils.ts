/**
 * Mathematical utility functions for visualizations
 */

/**
 * Calculate Shannon entropy for a probability distribution
 * H(X) = -Σ p(x) * log2(p(x))
 */
export function calculateEntropy(probabilities: number[]): number {
  return probabilities.reduce((entropy, p) => {
    if (p <= 0) return entropy;
    return entropy - p * Math.log2(p);
  }, 0);
}

/**
 * Calculate KL Divergence between two probability distributions
 * D_KL(P||Q) = Σ P(x) * log(P(x)/Q(x))
 */
export function calculateKLDivergence(p: number[], q: number[]): number {
  if (p.length !== q.length) {
    throw new Error('Distributions must have same length');
  }

  return p.reduce((divergence, pi, i) => {
    if (pi <= 0) return divergence;
    if (q[i] <= 0) return Infinity;
    return divergence + pi * Math.log2(pi / q[i]);
  }, 0);
}

/**
 * Calculate cross entropy H(P, Q)
 */
export function calculateCrossEntropy(p: number[], q: number[]): number {
  if (p.length !== q.length) {
    throw new Error('Distributions must have same length');
  }

  return p.reduce((entropy, pi, i) => {
    if (pi <= 0) return entropy;
    if (q[i] <= 0) return Infinity;
    return entropy - pi * Math.log2(q[i]);
  }, 0);
}

/**
 * Standard normal CDF approximation (error function)
 */
export function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  const prob =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));

  return x > 0 ? 1 - prob : prob;
}

/**
 * Standard normal PDF
 */
export function normalPDF(x: number, mean = 0, stdDev = 1): number {
  const z = (x - mean) / stdDev;
  return (
    (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp((-z * z) / 2)
  );
}

/**
 * Generate random sample from standard normal distribution (Box-Muller)
 */
export function randomNormal(mean = 0, stdDev = 1): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return mean + z * stdDev;
}

/**
 * Calculate mean of an array
 */
export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

/**
 * Calculate variance of an array
 */
export function variance(values: number[]): number {
  if (values.length === 0) return 0;
  const avg = mean(values);
  return (
    values.reduce((sum, val) => sum + (val - avg) ** 2, 0) / values.length
  );
}

/**
 * Calculate standard deviation
 */
export function stdDev(values: number[]): number {
  return Math.sqrt(variance(values));
}

/**
 * Calculate covariance between two arrays
 */
export function covariance(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length === 0) return 0;

  const meanX = mean(x);
  const meanY = mean(y);

  return (
    x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0) /
    x.length
  );
}

/**
 * Calculate Pearson correlation coefficient
 */
export function correlation(x: number[], y: number[]): number {
  const cov = covariance(x, y);
  const stdX = stdDev(x);
  const stdY = stdDev(y);

  if (stdX === 0 || stdY === 0) return 0;
  return cov / (stdX * stdY);
}

/**
 * Linear interpolation
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Map value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Round to specific number of decimal places
 */
export function roundTo(value: number, decimals: number): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Calculate eigenvalues of 2x2 matrix
 */
export function eigenvalues2x2(matrix: number[][]): [number, number] {
  const [[a, b], [c, d]] = matrix;

  const trace = a + d;
  const det = a * d - b * c;
  const discriminant = trace * trace - 4 * det;

  if (discriminant < 0) {
    // Complex eigenvalues
    const real = trace / 2;
    const imag = Math.sqrt(-discriminant) / 2;
    return [real + imag, real - imag];
  }

  const sqrtDisc = Math.sqrt(discriminant);
  return [(trace + sqrtDisc) / 2, (trace - sqrtDisc) / 2];
}

/**
 * Normalize vector
 */
export function normalize(vector: number[]): number[] {
  const magnitude = Math.sqrt(
    vector.reduce((sum, val) => sum + val * val, 0)
  );
  if (magnitude === 0) return vector;
  return vector.map((val) => val / magnitude);
}

/**
 * Dot product of two vectors
 */
export function dotProduct(a: number[], b: number[]): number {
  if (a.length !== b.length) throw new Error('Vectors must have same length');
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

/**
 * Matrix-vector multiplication
 */
export function matrixVectorMultiply(
  matrix: number[][],
  vector: number[]
): number[] {
  return matrix.map((row) => dotProduct(row, vector));
}

/**
 * Discrete Fourier Transform (simplified for visualization)
 */
export function dft(signal: number[]): { real: number[]; imag: number[] } {
  const N = signal.length;
  const real: number[] = [];
  const imag: number[] = [];

  for (let k = 0; k < N; k++) {
    let sumReal = 0;
    let sumImag = 0;

    for (let n = 0; n < N; n++) {
      const angle = (2 * Math.PI * k * n) / N;
      sumReal += signal[n] * Math.cos(angle);
      sumImag += -signal[n] * Math.sin(angle);
    }

    real.push(sumReal);
    imag.push(sumImag);
  }

  return { real, imag };
}

/**
 * Calculate magnitude spectrum from DFT
 */
export function magnitudeSpectrum(real: number[], imag: number[]): number[] {
  return real.map((r, i) => Math.sqrt(r * r + imag[i] * imag[i]));
}

/**
 * Generate histogram bins from data
 */
export function histogram(
  data: number[],
  numBins: number = 10
): { bins: number[]; counts: number[] } {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const binWidth = (max - min) / numBins;

  const bins: number[] = [];
  const counts: number[] = new Array(numBins).fill(0);

  for (let i = 0; i < numBins; i++) {
    bins.push(min + i * binWidth);
  }

  data.forEach((value) => {
    const binIndex = Math.min(
      numBins - 1,
      Math.floor((value - min) / binWidth)
    );
    if (binIndex >= 0 && binIndex < numBins) {
      counts[binIndex]++;
    }
  });

  return { bins, counts };
}
