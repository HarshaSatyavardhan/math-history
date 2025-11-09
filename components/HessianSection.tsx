import React, { useState, useEffect } from 'react';
import VisualizationCard from './VisualizationCard';

// 1D Curvature Visualization - showing second derivative
const OneDCurvatureViz: React.FC = () => {
    const [t, setT] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setT(prev => (prev + 0.02) % (2 * Math.PI));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // Function: f(x) = x^3 - 3x (has inflection point at x=0)
    const xValues = [];
    for (let i = -2; i <= 2; i += 0.1) {
        xValues.push(i);
    }

    const scale = 30;
    const centerX = 150;
    const centerY = 150;

    const points = xValues.map(x => {
        const y = x * x * x - 3 * x;
        return {
            svgX: centerX + x * scale,
            svgY: centerY - y * scale / 3
        };
    });

    const pathD = points.map((p, i) =>
        `${i === 0 ? 'M' : 'L'} ${p.svgX} ${p.svgY}`
    ).join(' ');

    // Current point position (oscillates between -1.5 and 1.5)
    const currentX = 1.5 * Math.sin(t);
    const currentY = currentX * currentX * currentX - 3 * currentX;
    const currentSvgX = centerX + currentX * scale;
    const currentSvgY = centerY - currentY * scale / 3;

    // Second derivative: f''(x) = 6x
    const secondDeriv = 6 * currentX;
    const curvatureColor = secondDeriv > 0 ? '#10b981' : secondDeriv < 0 ? '#ef4444' : '#f59e0b';
    const curvatureLabel = secondDeriv > 0 ? 'Concave Up' : secondDeriv < 0 ? 'Concave Down' : 'Inflection Point';

    return (
        <svg viewBox="0 0 300 300" className="w-full h-auto">
            {/* Grid */}
            <defs>
                <pattern id="hess-grid-1d" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
            </defs>
            <rect width="300" height="300" fill="url(#hess-grid-1d)" />

            {/* Axes */}
            <line x1="0" y1={centerY} x2="300" y2={centerY} stroke="#6b7280" strokeWidth="2" />
            <line x1={centerX} y1="0" x2={centerX} y2="300" stroke="#6b7280" strokeWidth="2" />

            {/* Curve */}
            <path d={pathD} stroke="#14b8a6" strokeWidth="3" fill="none" />

            {/* Inflection point marker at x=0 */}
            <circle cx={centerX} cy={centerY} r="5" fill="#f59e0b" opacity="0.7" />
            <text x={centerX + 10} y={centerY - 10} fill="#f59e0b" fontSize="11" fontWeight="bold">
                Inflection
            </text>

            {/* Current point */}
            <circle cx={currentSvgX} cy={currentSvgY} r="7" fill={curvatureColor} />

            {/* Curvature indicator */}
            <text x="150" y="25" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
                f(x) = x³ - 3x
            </text>
            <text x="150" y="280" fill={curvatureColor} fontSize="13" fontWeight="bold" textAnchor="middle">
                f''(x) = {secondDeriv.toFixed(2)} → {curvatureLabel}
            </text>
        </svg>
    );
};

// 2D Saddle Point Visualization
const SaddlePointViz: React.FC = () => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 1) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const centerX = 150;
    const centerY = 150;
    const scale = 40;

    // Function: f(x,y) = x^2 - y^2 (saddle point at origin)
    const gridSize = 5;
    const step = 0.4;
    const points: {x: number, y: number, z: number}[] = [];

    for (let i = -gridSize; i <= gridSize; i++) {
        for (let j = -gridSize; j <= gridSize; j++) {
            const x = i * step;
            const y = j * step;
            const z = x * x - y * y;
            points.push({x, y, z});
        }
    }

    // Simple 3D rotation (around z-axis)
    const angle = (rotation * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return (
        <svg viewBox="0 0 300 300" className="w-full h-auto">
            <rect width="300" height="300" fill="#1f2937" />

            {/* Draw points */}
            {points.map((p, idx) => {
                const rotX = p.x * cos - p.y * sin;
                const rotY = p.x * sin + p.y * cos;

                const svgX = centerX + rotX * scale;
                const svgY = centerY - p.z * scale / 2 - rotY * scale / 3;

                const color = p.z > 0 ? '#10b981' : p.z < 0 ? '#ef4444' : '#f59e0b';
                const size = Math.max(1, 3 - Math.abs(rotY) / 2);

                return (
                    <circle
                        key={idx}
                        cx={svgX}
                        cy={svgY}
                        r={size}
                        fill={color}
                        opacity={0.6}
                    />
                );
            })}

            {/* Center saddle point */}
            <circle cx={centerX} cy={centerY} r="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2" />

            {/* Labels */}
            <text x="150" y="25" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
                f(x,y) = x² - y² (Saddle Point)
            </text>
            <text x="150" y="280" fill="#14b8a6" fontSize="11" textAnchor="middle">
                Eigenvalues: λ₁ = +2, λ₂ = -2 (mixed signs!)
            </text>
        </svg>
    );
};

// Hessian Matrix Structure Visualization
const HessianMatrixViz: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-teal-900/40 to-cyan-900/40 p-8 rounded-xl border-2 border-teal-500/50">
            <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-white mb-2">The Hessian Matrix</h4>
                <p className="text-sm text-gray-300">All second-order partial derivatives</p>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
                {/* H = */}
                <span className="text-white text-2xl font-bold">H =</span>

                {/* Matrix */}
                <div className="relative">
                    <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-l"></div>
                    <div className="absolute -right-2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-r"></div>

                    <div className="grid grid-cols-2 gap-6 px-6 py-4">
                        <div className="text-center">
                            <div className="text-cyan-400 text-lg font-mono">∂²f/∂x²</div>
                            <div className="text-xs text-gray-400 mt-1">f<sub>xx</sub></div>
                        </div>
                        <div className="text-center">
                            <div className="text-pink-400 text-lg font-mono">∂²f/∂x∂y</div>
                            <div className="text-xs text-gray-400 mt-1">f<sub>xy</sub></div>
                        </div>
                        <div className="text-center">
                            <div className="text-green-400 text-lg font-mono">∂²f/∂y∂x</div>
                            <div className="text-xs text-gray-400 mt-1">f<sub>yx</sub></div>
                        </div>
                        <div className="text-center">
                            <div className="text-orange-400 text-lg font-mono">∂²f/∂y²</div>
                            <div className="text-xs text-gray-400 mt-1">f<sub>yy</sub></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <div className="text-yellow-400 text-xl font-bold">det(H) = f<sub>xx</sub>·f<sub>yy</sub> - f<sub>xy</sub>²</div>
                <p className="text-xs text-gray-400 mt-1">The Hessian Determinant (Hesse's original "Hessian")</p>
            </div>
        </div>
    );
};

// Eigenvalue Classification Visualization
const EigenvalueClassificationViz: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Minimum */}
            <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 p-6 rounded-xl border-2 border-green-500/50">
                <div className="text-center">
                    <div className="text-4xl mb-3">🏔️</div>
                    <h5 className="text-lg font-bold text-green-400 mb-2">Local Minimum</h5>
                    <p className="text-xs text-gray-300 mb-3">All eigenvalues positive</p>
                    <div className="bg-green-900/30 rounded p-2 text-sm font-mono text-green-300">
                        λ₁ &gt; 0<br/>
                        λ₂ &gt; 0
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Curves up in all directions</p>
                </div>
            </div>

            {/* Saddle */}
            <div className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 p-6 rounded-xl border-2 border-orange-500/50">
                <div className="text-center">
                    <div className="text-4xl mb-3">🐎</div>
                    <h5 className="text-lg font-bold text-orange-400 mb-2">Saddle Point</h5>
                    <p className="text-xs text-gray-300 mb-3">Mixed eigenvalue signs</p>
                    <div className="bg-orange-900/30 rounded p-2 text-sm font-mono text-orange-300">
                        λ₁ &gt; 0<br/>
                        λ₂ &lt; 0
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Up in one direction, down in another</p>
                </div>
            </div>

            {/* Maximum */}
            <div className="bg-gradient-to-br from-red-900/40 to-rose-900/40 p-6 rounded-xl border-2 border-red-500/50">
                <div className="text-center">
                    <div className="text-4xl mb-3">⛰️</div>
                    <h5 className="text-lg font-bold text-red-400 mb-2">Local Maximum</h5>
                    <p className="text-xs text-gray-300 mb-3">All eigenvalues negative</p>
                    <div className="bg-red-900/30 rounded p-2 text-sm font-mono text-red-300">
                        λ₁ &lt; 0<br/>
                        λ₂ &lt; 0
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Curves down in all directions</p>
                </div>
            </div>
        </div>
    );
};

// Cubic Curve with Inflection Points
const CubicCurveInflectionViz: React.FC = () => {
    const centerX = 150;
    const centerY = 150;
    const scale = 50;

    // Generate points for a cubic curve with inflection points
    const points: {x: number, y: number}[] = [];
    for (let t = -1.5; t <= 1.5; t += 0.05) {
        const x = t;
        const y = t * t * t - t;
        points.push({
            svgX: centerX + x * scale,
            svgY: centerY - y * scale
        });
    }

    const pathD = points.map((p, i) =>
        `${i === 0 ? 'M' : 'L'} ${p.svgX} ${p.svgY}`
    ).join(' ');

    // Inflection points where f''(x) = 0
    // For f(x) = x³ - x, f''(x) = 6x, so inflection at x = 0
    const inflectionPoints = [
        { x: 0, y: 0 }
    ];

    return (
        <svg viewBox="0 0 300 300" className="w-full h-auto">
            {/* Background */}
            <rect width="300" height="300" fill="#1f2937" />

            {/* Grid */}
            <defs>
                <pattern id="cubic-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
            </defs>
            <rect width="300" height="300" fill="url(#cubic-grid)" />

            {/* Axes */}
            <line x1="0" y1={centerY} x2="300" y2={centerY} stroke="#6b7280" strokeWidth="2" />
            <line x1={centerX} y1="0" x2={centerX} y2="300" stroke="#6b7280" strokeWidth="2" />

            {/* Cubic curve */}
            <path d={pathD} stroke="#14b8a6" strokeWidth="3.5" fill="none" />

            {/* Inflection points */}
            {inflectionPoints.map((pt, idx) => (
                <g key={idx}>
                    <circle
                        cx={centerX + pt.x * scale}
                        cy={centerY - pt.y * scale}
                        r="8"
                        fill="#f59e0b"
                        stroke="#fbbf24"
                        strokeWidth="3"
                    />
                    <circle
                        cx={centerX + pt.x * scale}
                        cy={centerY - pt.y * scale}
                        r="15"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        opacity="0.5"
                    />
                </g>
            ))}

            {/* Labels */}
            <text x="150" y="25" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                Cubic Curve: y = x³ - x
            </text>
            <text x="150" y="280" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
                Inflection Point: det(H) = 0
            </text>
        </svg>
    );
};

const HessianSection: React.FC = () => {
    return (
        <section className="space-y-8">
            <div className="border-l-4 border-teal-500 pl-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Mapping Curvature: The Hessian
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ludwig Otto Hesse • 1840s</p>
            </div>

            {/* The Real Problem Section */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-teal-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🏛️</span>
                    The Problem: Geometry, Not Optimization
                </h3>

                <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold text-teal-700 dark:text-teal-400">
                        Today we use the Hessian for optimization, but that's not why Hesse invented it.
                    </p>

                    <p>
                        Ludwig Otto Hesse was a student of <strong>Carl Gustav Jacob Jacobi</strong> and a specialist in <strong>algebraic geometry</strong>. In the 1840s, his central problem wasn't finding maxima and minima of cost functions—it was studying the intrinsic properties of <strong>algebraic curves and surfaces</strong>.
                    </p>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-teal-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-3">
                            His Specific Challenge: Finding Inflection Points
                        </h4>
                        <p className="mb-3">
                            An <strong>inflection point</strong> on a curve is where the curvature changes sign—where it stops bending one way and starts bending the other way (from concave up to concave down, or vice versa).
                        </p>
                        <ul className="space-y-2 ml-6">
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500 font-bold">•</span>
                                <span>In 1D, this is precisely where the <strong>second derivative equals zero</strong>: f''(x) = 0</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500 font-bold">•</span>
                                <span>But for curves defined by complex polynomial equations in multiple variables (like f(x, y, z) = 0), how do you generalize this concept?</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold">
                            Hesse wanted a general, algebraic "detector" for inflection points on curves of any dimension. This was a problem in pure geometry, not optimization.
                        </p>
                    </div>
                </div>
            </div>

            {/* The Intuition Section */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-purple-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">💡</span>
                    Hesse's Intuition: Quadratic Forms and Invariants
                </h3>

                <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p>
                        The "eigenvalue" explanation you see in modern textbooks is clean and elegant, but Hesse's original intuition was rooted in two key mathematical ideas of his era:
                    </p>

                    {/* Quadratic Forms */}
                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-purple-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-3">
                            1. Quadratic Forms: Approximating the "Landscape"
                        </h4>
                        <p className="mb-4">
                            Hesse understood that at any given point, a complex function's local behavior could be approximated by simpler functions:
                        </p>

                        <div className="space-y-3 ml-4">
                            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-400 p-3 rounded-r">
                                <strong className="text-purple-700 dark:text-purple-400">First derivative (Jacobian):</strong> Gives you a <em>linear</em> approximation—a flat tangent plane
                            </div>
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-400 p-3 rounded-r">
                                <strong className="text-indigo-700 dark:text-indigo-400">Second derivative (Hessian):</strong> Gives you a <em>quadratic</em> approximation—a paraboloid (bowl or dome) that "hugs" the surface
                            </div>
                        </div>

                        <p className="mt-4 text-sm">
                            The Hessian matrix <em>is</em> the matrix that defines this quadratic form. It captures the local curvature in every direction simultaneously.
                        </p>
                    </div>

                    {/* Invariants */}
                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-indigo-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                            2. Invariants: Finding Geometric Truth
                        </h4>
                        <p className="mb-4">
                            Hesse's primary goal was to find <strong>invariants</strong>—properties of geometric objects that remain unchanged even when you rotate, shift, or transform your coordinate system.
                        </p>

                        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                            <p className="text-sm mb-2">
                                <strong className="text-indigo-700 dark:text-indigo-400">Why invariants matter:</strong>
                            </p>
                            <p className="text-sm">
                                An inflection point is a <em>geometric reality</em> of the curve. It shouldn't depend on which coordinate system you happen to be using. Hesse needed a "magic number" that would detect this property universally.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Solution Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-green-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">⚡</span>
                    How He Solved It: The Hessian Determinant
                </h3>

                <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold text-green-700 dark:text-green-400">
                        Hesse's breakthrough was to focus not on the matrix of second derivatives itself, but on its <strong>determinant</strong>.
                    </p>

                    {/* Step 1: Build the Matrix */}
                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-green-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-green-600 dark:text-green-400 mb-3">
                            Step 1: Construct the Matrix of Second Derivatives
                        </h4>
                        <p className="mb-4">
                            For a function f(x, y), he organized all possible second-order partial derivatives:
                        </p>

                        <div className="flex justify-center my-4">
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 font-mono text-sm">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <span className="text-cyan-600 dark:text-cyan-400">∂²f/∂x²</span>
                                    <span className="text-pink-600 dark:text-pink-400">∂²f/∂x∂y</span>
                                    <span className="text-green-600 dark:text-green-400">∂²f/∂y∂x</span>
                                    <span className="text-orange-600 dark:text-orange-400">∂²f/∂y²</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-3 rounded-r">
                            This matrix represents the complete local curvature information—the quadratic approximation to the function at that point.
                        </p>
                    </div>

                    {/* Step 2: The Determinant */}
                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-emerald-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                            Step 2: Take the Determinant
                        </h4>
                        <p className="mb-4">
                            Hesse realized that the <strong>determinant</strong> of this matrix was the key invariant he was searching for.
                        </p>

                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 mb-4">
                            <div className="text-center text-xl font-mono text-emerald-700 dark:text-emerald-300 mb-2">
                                det(H) = f<sub>xx</sub> · f<sub>yy</sub> - f<sub>xy</sub>²
                            </div>
                            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                                (This is what Hesse actually called "the Hessian")
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-3 rounded-r">
                                <p className="text-sm"><strong className="text-yellow-700 dark:text-yellow-400">His Discovery:</strong> When det(H) = 0, you're at an inflection point!</p>
                            </div>
                            <p className="text-sm">
                                This determinant is an <em>invariant</em>—it has the same value regardless of your coordinate system. It's a pure geometric property of the curve.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold">
                            Hesse had created a purely algebraic "detector" for a fundamental geometric feature. This tool, developed for geometry in the 1840s, would later become the foundation of modern optimization theory.
                        </p>
                    </div>
                </div>
            </div>

            {/* Visual Examples */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    Visualizing Curvature and Inflection
                </h3>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <VisualizationCard
                        title="1D Curvature: Second Derivative"
                        description="Watch how the second derivative (curvature) changes sign at inflection points"
                    >
                        <OneDCurvatureViz />
                    </VisualizationCard>

                    <VisualizationCard
                        title="Cubic Curve Inflection Points"
                        description="Inflection points occur where the Hessian determinant equals zero"
                    >
                        <CubicCurveInflectionViz />
                    </VisualizationCard>
                </div>

                <HessianMatrixViz />
            </div>

            {/* Modern Use: Optimization */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-orange-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🎯</span>
                    The Modern Connection: Optimization and Eigenvalues
                </h3>

                <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p>
                        Today, we use the Hessian primarily in optimization. Why? Because maxima, minima, and saddle points are all just different types of "curvature points."
                    </p>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-orange-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-3">
                            The Eigenvalue Interpretation
                        </h4>
                        <p className="mb-4">
                            At a critical point (where ∇f = 0), the Hessian's eigenvalues tell us about curvature in principal directions:
                        </p>

                        <ul className="space-y-2 ml-6 mb-4">
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 font-bold">•</span>
                                <span><strong>Eigenvectors</strong> point in the directions of principal curvature</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 font-bold">•</span>
                                <span><strong>Eigenvalues</strong> measure the amount of curvature in those directions</span>
                            </li>
                        </ul>

                        <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r">
                            <p className="text-sm">
                                <strong className="text-orange-700 dark:text-orange-400">Why this works:</strong> The tool Hesse built to detect geometric inflection points (where curvature changes) is perfectly suited to classify optimization critical points (which are also defined by their curvature).
                            </p>
                        </div>
                    </div>

                    <EigenvalueClassificationViz />
                </div>
            </div>

            {/* Saddle Points Deep Dive */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-rose-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🐎</span>
                    Saddle Points: Mixed Curvature
                </h3>

                <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p>
                        A <strong>saddle point</strong> is the most interesting case—it's where Hesse's geometric insight and modern optimization theory truly converge.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-rose-200 dark:border-gray-600">
                            <h4 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-3">
                                Geometric View (Hesse)
                            </h4>
                            <p className="text-sm mb-3">
                                The surface curves <em>up</em> in one direction and <em>down</em> in a perpendicular direction. It's like a mountain pass or a horse saddle.
                            </p>
                            <div className="bg-rose-50 dark:bg-rose-900/20 rounded p-3">
                                <p className="text-xs text-rose-700 dark:text-rose-300">
                                    The determinant can be negative or zero, indicating this mixed behavior.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-pink-200 dark:border-gray-600">
                            <h4 className="text-lg font-bold text-pink-600 dark:text-pink-400 mb-3">
                                Optimization View (Modern)
                            </h4>
                            <p className="text-sm mb-3">
                                The Hessian has <em>mixed eigenvalue signs</em>: some positive (curvature up), some negative (curvature down).
                            </p>
                            <div className="bg-pink-50 dark:bg-pink-900/20 rounded p-3">
                                <p className="text-xs text-pink-700 dark:text-pink-300">
                                    This means it's neither a minimum nor a maximum—it's an unstable equilibrium point.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                        <VisualizationCard
                            title="Interactive Saddle Point"
                            description="The classic f(x,y) = x² - y² saddle surface rotating in 3D"
                        >
                            <SaddlePointViz />
                        </VisualizationCard>
                    </div>

                    <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold">
                            Saddle points are critical in machine learning (loss landscapes), game theory (Nash equilibria), and physics (unstable equilibria). They're precisely the points where Hesse's geometric "inflection" meets modern optimization's "neither max nor min."
                        </p>
                    </div>
                </div>
            </div>

            {/* Applications */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🚀</span>
                    Modern Applications
                </h3>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-blue-200 dark:border-gray-600">
                        <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2 text-base">Machine Learning</h4>
                        <p className="text-gray-700 dark:text-gray-300">Newton's method and second-order optimization use the Hessian to find optimal model parameters efficiently</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-indigo-200 dark:border-gray-600">
                        <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2 text-base">Economics</h4>
                        <p className="text-gray-700 dark:text-gray-300">Second-order conditions for optimization problems, like utility maximization and cost minimization</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-purple-200 dark:border-gray-600">
                        <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-2 text-base">Computer Vision</h4>
                        <p className="text-gray-700 dark:text-gray-300">Blob detection and corner detection use the Hessian to identify features with specific curvature patterns</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-teal-200 dark:border-gray-600">
                        <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2 text-base">Physics</h4>
                        <p className="text-gray-700 dark:text-gray-300">Stability analysis of equilibrium points in dynamical systems and classical mechanics</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-cyan-200 dark:border-gray-600">
                        <h4 className="font-bold text-cyan-600 dark:text-cyan-400 mb-2 text-base">Algebraic Geometry</h4>
                        <p className="text-gray-700 dark:text-gray-300">Still used in Hesse's original context: classifying singularities and inflection points on curves</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-rose-200 dark:border-gray-600">
                        <h4 className="font-bold text-rose-600 dark:text-rose-400 mb-2 text-base">Numerical Methods</h4>
                        <p className="text-gray-700 dark:text-gray-300">Quasi-Newton methods (BFGS, L-BFGS) approximate the Hessian for large-scale optimization</p>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 text-center">The Journey of the Hessian</h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                        <div className="text-3xl mb-2 text-center">📐</div>
                        <h4 className="font-bold mb-2 text-center">1840s: Geometry</h4>
                        <p className="text-center text-white/90">Hesse creates a tool to find inflection points on algebraic curves</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                        <div className="text-3xl mb-2 text-center">🎯</div>
                        <h4 className="font-bold mb-2 text-center">1900s: Optimization</h4>
                        <p className="text-center text-white/90">Mathematicians realize it perfectly classifies maxima, minima, and saddle points</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                        <div className="text-3xl mb-2 text-center">💻</div>
                        <h4 className="font-bold mb-2 text-center">Today: Everywhere</h4>
                        <p className="text-center text-white/90">From deep learning to robotics, the Hessian is fundamental to modern science</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HessianSection;
