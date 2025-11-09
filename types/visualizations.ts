/**
 * TypeScript type definitions for mathematical visualizations
 */

/**
 * Common visualization props
 */
export interface VisualizationProps {
  width?: number;
  height?: number;
  className?: string;
  darkTheme?: boolean;
}

/**
 * Control panel button
 */
export interface ControlButton {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

/**
 * Control slider
 */
export interface ControlSlider {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
}

/**
 * Info card data
 */
export interface InfoCardData {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}

/**
 * Distribution types
 */
export type DistributionType = 'uniform' | 'normal' | 'exponential' | 'bimodal' | 'triangular';

/**
 * Animation state
 */
export interface AnimationState {
  isPlaying: boolean;
  speed: number;
  frame: number;
  time: number;
}

/**
 * Point in 2D space
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Point in 3D space
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Vector (array of numbers)
 */
export type Vector = number[];

/**
 * Matrix (2D array of numbers)
 */
export type Matrix = number[][];

/**
 * Color gradient stop
 */
export interface GradientStop {
  offset: number;
  color: string;
}

/**
 * Drawing style options
 */
export interface DrawingStyle {
  strokeColor?: string;
  fillColor?: string;
  lineWidth?: number;
  lineDash?: number[];
  opacity?: number;
}

/**
 * Axes options
 */
export interface AxesOptions {
  showGrid?: boolean;
  showAxes?: boolean;
  showTicks?: boolean;
  showLabels?: boolean;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  gridSpacing?: number;
  axesColor?: string;
  gridColor?: string;
}

/**
 * Histogram data
 */
export interface HistogramData {
  bins: number[];
  counts: number[];
  maxCount: number;
}

/**
 * Probability distribution
 */
export interface ProbabilityDistribution {
  type: DistributionType;
  parameters: Record<string, number>;
  probabilities?: number[];
}

/**
 * Statistical summary
 */
export interface StatisticalSummary {
  mean: number;
  median?: number;
  mode?: number;
  variance: number;
  stdDev: number;
  min: number;
  max: number;
  count: number;
}

/**
 * Fourier component
 */
export interface FourierComponent {
  frequency: number;
  amplitude: number;
  phase: number;
  type: 'sine' | 'cosine';
}

/**
 * Canvas drawing context
 */
export interface DrawContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  darkMode?: boolean;
}

/**
 * Particle (for physics simulations)
 */
export interface Particle {
  id?: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass?: number;
  color?: string;
  settled?: boolean;
}

/**
 * Simulation state (for physics/animations)
 */
export interface SimulationState<T = any> {
  isRunning: boolean;
  frame: number;
  time: number;
  data: T;
}

/**
 * Graph node (for knowledge graphs)
 */
export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  data?: any;
}

/**
 * Graph edge
 */
export interface GraphEdge {
  from: string;
  to: string;
  label?: string;
  weight?: number;
  color?: string;
}

/**
 * Eigenvalue/Eigenvector pair
 */
export interface EigenPair {
  eigenvalue: number;
  eigenvector: Vector;
  isComplex?: boolean;
}

/**
 * Function plot options
 */
export interface FunctionPlotOptions {
  fn: (x: number) => number;
  xMin: number;
  xMax: number;
  color?: string;
  lineWidth?: number;
  samples?: number;
  label?: string;
}

/**
 * Parametric curve options
 */
export interface ParametricCurveOptions {
  x: (t: number) => number;
  y: (t: number) => number;
  tMin: number;
  tMax: number;
  color?: string;
  lineWidth?: number;
  samples?: number;
}

/**
 * 3D rotation angles
 */
export interface Rotation3D {
  pitch: number; // rotation around X axis
  yaw: number;   // rotation around Y axis
  roll: number;  // rotation around Z axis
}

/**
 * Camera position for 3D visualization
 */
export interface Camera3D {
  position: Point3D;
  target: Point3D;
  rotation: Rotation3D;
  fov: number;
  zoom: number;
}

/**
 * Entropy visualization state
 */
export interface EntropyState {
  probabilities: number[];
  entropy: number;
  maxEntropy: number;
  efficiency: number;
}

/**
 * Convergence simulation state
 */
export interface ConvergenceState {
  trials: number[];
  runningAverages: number[];
  trueMean: number;
  currentMean: number;
  deviation: number;
  numTrials: number;
}

/**
 * Fourier series state
 */
export interface FourierSeriesState {
  components: FourierComponent[];
  resultSignal: number[];
  frequencySpectrum: number[];
}

/**
 * Matrix transformation state
 */
export interface MatrixTransformState {
  matrix: Matrix;
  inputVector: Vector;
  outputVector: Vector;
  eigenPairs: EigenPair[];
  determinant: number;
  trace: number;
}
