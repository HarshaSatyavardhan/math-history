import React, { useState, useEffect } from 'react';
import VisualizationCard from './VisualizationCard';

// Interactive Polar Transformation Visualization
const PolarTransformViz: React.FC = () => {
    const [angle, setAngle] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setAngle(prev => (prev + 1) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const r = 1.5;
    const theta = (angle * Math.PI) / 180;
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    // Scale for SVG (center at 150, 150)
    const centerX = 150;
    const centerY = 150;
    const scale = 40;

    const svgX = centerX + x * scale;
    const svgY = centerY - y * scale;

    return (
        <svg viewBox="0 0 300 300" className="w-full h-auto">
            {/* Grid */}
            <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
            </defs>
            <rect width="300" height="300" fill="url(#grid)" />

            {/* Axes */}
            <line x1="0" y1={centerY} x2="300" y2={centerY} stroke="#6b7280" strokeWidth="2" />
            <line x1={centerX} y1="0" x2={centerX} y2="300" stroke="#6b7280" strokeWidth="2" />

            {/* Polar circles */}
            <circle cx={centerX} cy={centerY} r={scale} stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="4,4" />
            <circle cx={centerX} cy={centerY} r={scale * 1.5} stroke="#3b82f6" strokeWidth="2" fill="none" opacity="0.6" />

            {/* Radius line */}
            <line x1={centerX} y1={centerY} x2={svgX} y2={svgY} stroke="#f59e0b" strokeWidth="3" />

            {/* Angle arc */}
            <path
                d={`M ${centerX + 30} ${centerY} A 30 30 0 ${angle > 180 ? 1 : 0} 0 ${centerX + 30 * Math.cos(theta)} ${centerY - 30 * Math.sin(theta)}`}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2.5"
            />

            {/* Point */}
            <circle cx={svgX} cy={svgY} r="6" fill="#ef4444" />

            {/* Coordinate projections */}
            <line x1={svgX} y1={svgY} x2={svgX} y2={centerY} stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" opacity="0.7" />
            <line x1={svgX} y1={centerY} x2={centerX} y2={centerY} stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" opacity="0.7" />

            {/* Labels */}
            <text x={centerX + 15} y={centerY - 15} fill="#8b5cf6" fontSize="14" fontWeight="bold">θ = {angle}°</text>
            <text x={svgX + 10} y={svgY - 10} fill="#ef4444" fontSize="12" fontWeight="bold">
                ({x.toFixed(2)}, {y.toFixed(2)})
            </text>
            <text x={(centerX + svgX) / 2} y={(centerY + svgY) / 2 - 10} fill="#f59e0b" fontSize="12">r</text>
        </svg>
    );
};

// Matrix Transformation Animation
const MatrixTransformViz: React.FC = () => {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => (prev + 0.02) % (2 * Math.PI));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const scale = 0.7 + 0.3 * Math.sin(phase);
    const shear = 0.3 * Math.cos(phase);

    // Original unit square
    const original = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 }
    ];

    // Transformed parallelogram
    const transformed = original.map(p => ({
        x: scale * p.x + shear * p.y,
        y: p.y
    }));

    const svgScale = 80;
    const offsetX = 100;
    const offsetY = 150;

    const toSVG = (p: {x: number, y: number}) => ({
        x: offsetX + p.x * svgScale,
        y: offsetY - p.y * svgScale
    });

    const origPoints = original.map(toSVG);
    const transPoints = transformed.map(toSVG);

    const det = Math.abs(scale);

    return (
        <svg viewBox="0 0 300 200" className="w-full h-auto">
            {/* Original square */}
            <polygon
                points={origPoints.map(p => `${p.x},${p.y}`).join(' ')}
                fill="#3b82f6"
                opacity="0.3"
                stroke="#3b82f6"
                strokeWidth="2"
            />

            {/* Transformed parallelogram */}
            <polygon
                points={transPoints.map(p => `${p.x},${p.y}`).join(' ')}
                fill="#ef4444"
                opacity="0.5"
                stroke="#ef4444"
                strokeWidth="2.5"
            />

            {/* Area label */}
            <text x="150" y="30" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">
                |J| = {det.toFixed(2)}
            </text>

            <text x="150" y="50" fill="#9ca3af" fontSize="11" textAnchor="middle">
                Area ratio
            </text>
        </svg>
    );
};

// Jacobian Matrix Visualization
const JacobianMatrixViz: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-8 rounded-xl border-2 border-purple-500/50">
            <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-white mb-2">The Jacobian Matrix</h4>
                <p className="text-sm text-gray-300">All partial derivatives organized</p>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
                {/* J = */}
                <span className="text-white text-2xl font-bold">J =</span>

                {/* Matrix */}
                <div className="relative">
                    <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-blue-400 rounded-l"></div>
                    <div className="absolute -right-2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-blue-400 rounded-r"></div>

                    <div className="grid grid-cols-2 gap-6 px-6 py-4">
                        <div className="text-center">
                            <div className="text-cyan-400 text-lg font-mono">∂x/∂r</div>
                            <div className="text-xs text-gray-400 mt-1">= cos(θ)</div>
                        </div>
                        <div className="text-center">
                            <div className="text-pink-400 text-lg font-mono">∂x/∂θ</div>
                            <div className="text-xs text-gray-400 mt-1">= -r·sin(θ)</div>
                        </div>
                        <div className="text-center">
                            <div className="text-green-400 text-lg font-mono">∂y/∂r</div>
                            <div className="text-xs text-gray-400 mt-1">= sin(θ)</div>
                        </div>
                        <div className="text-center">
                            <div className="text-orange-400 text-lg font-mono">∂y/∂θ</div>
                            <div className="text-xs text-gray-400 mt-1">= r·cos(θ)</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <div className="text-yellow-400 text-xl font-bold">|J| = r</div>
                <p className="text-xs text-gray-400 mt-1">Determinant = Area scaling factor</p>
            </div>
        </div>
    );
};

// Static visualizations
const OneDSubstitutionViz: React.FC = () => (
    <svg viewBox="0 0 300 150" className="w-full h-auto">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
            </linearGradient>
        </defs>

        {/* Curve */}
        <path d="M 30 120 Q 80 40, 150 75 T 270 120" stroke="url(#grad1)" strokeWidth="3" fill="none" />

        {/* u space */}
        <line x1="50" y1="140" x2="150" y2="140" stroke="#10b981" strokeWidth="3" />
        <text x="100" y="145" fill="#10b981" fontSize="12" textAnchor="middle" dy="12">Δu</text>

        {/* x space (stretched) */}
        <line x1="50" y1="130" x2="200" y2="130" stroke="#ef4444" strokeWidth="3" />
        <text x="125" y="125" fill="#ef4444" fontSize="12" textAnchor="middle" dy="-5">Δx = g'(u)·Δu</text>

        <text x="150" y="25" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
            1D: Derivative stretches length
        </text>
    </svg>
);

const AreaStretchViz: React.FC = () => {
    return (
        <svg viewBox="0 0 300 200" className="w-full h-auto">
            {/* Original square in (r,θ) space */}
            <g>
                <rect x="40" y="120" width="50" height="50" fill="#3b82f6" opacity="0.4" stroke="#3b82f6" strokeWidth="2" />
                <text x="65" y="145" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">dr×dθ</text>
                <text x="65" y="105" fill="#60a5fa" fontSize="10" textAnchor="middle">(r, θ) space</text>
            </g>

            {/* Arrow */}
            <g>
                <path d="M 100 145 L 140 145" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead)" />
                <text x="120" y="140" fill="#f59e0b" fontSize="10" textAnchor="middle">Transform</text>
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
                    </marker>
                </defs>
            </g>

            {/* Transformed parallelogram in (x,y) space */}
            <g>
                <polygon points="160,120 220,115 230,165 170,170" fill="#ef4444" opacity="0.5" stroke="#ef4444" strokeWidth="2.5" />
                <text x="195" y="145" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">|J|·dr·dθ</text>
                <text x="195" y="100" fill="#fca5a5" fontSize="10" textAnchor="middle">(x, y) space</text>
            </g>

            <text x="150" y="25" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
                2D: Jacobian stretches area
            </text>
        </svg>
    );
};

const JacobianSection: React.FC = () => {
    return (
        <section className="space-y-8">
            <div className="border-l-4 border-red-500 pl-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Mapping Change: The Jacobian
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Carl Gustav Jacob Jacobi • 1841</p>
            </div>

            {/* The Problem Section */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-red-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🌎</span>
                    The Problem Jacobi Was Trying to Solve
                </h3>

                <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p>
                        Carl Jacobi didn't stumble upon this problem by accident—he ran into it while working on the most difficult mathematical physics problems of his era. He needed a reliable tool to solve a very practical and recurring issue.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-red-200 dark:border-gray-600">
                            <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mb-3">
                                1. Celestial Mechanics & Dynamics
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                                Jacobi was deeply involved in describing the motion of planets. He worked on the infamous <strong>"three-body problem"</strong> (like Earth-Sun-Moon) and developed new formulations of classical mechanics (now called Hamilton-Jacobi theory).
                            </p>
                            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-3 rounded-r text-sm">
                                <strong className="text-red-700 dark:text-red-400">The Wall:</strong> When changing to a rotating coordinate system that spins with the planets, how do you correctly transform an integral (representing total energy or action)?
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-orange-200 dark:border-gray-600">
                            <h4 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-3">
                                2. Elliptic Functions
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                                This field, which is the next step up in complexity from trigonometric functions, was born from trying to calculate the arc length of an ellipse. This work required inverting complex integrals and performing elaborate transformations.
                            </p>
                            <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-3 rounded-r text-sm">
                                <strong className="text-orange-700 dark:text-orange-400">The Need:</strong> A general formula for the "scaling factor" created by coordinate transformations.
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 mt-6">
                        <p className="text-white text-center font-semibold">
                            In both fields, Jacobi was constantly changing his mathematical point of view (his coordinates) to make impossible problems solvable. He realized the "scaling factor" he needed was the same in all cases, but nobody had written down a general formula for it.
                        </p>
                    </div>
                </div>
            </div>

            {/* The Intuition Section */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-purple-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">💡</span>
                    The Intuition from the Inventor's Eyes
                </h3>

                <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p>
                        Jacobi's intuition was a direct generalization of the simplest case in calculus, which you already know.
                    </p>

                    {/* 1D Thought Process */}
                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-purple-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-3">
                            His Thought Process (in 1D):
                        </h4>
                        <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-700 dark:text-gray-300 mb-4">
                            "When I do a simple u-substitution, like x = g(u), I can't just say dx = du. I know that a small step du is stretched or shrunk to become the corresponding step dx. The amount it's stretched is given by the derivative: dx = g'(u)du. This derivative g'(u) is simply the <strong className="text-purple-600 dark:text-purple-400">local scaling factor for length</strong>."
                        </blockquote>

                        <OneDSubstitutionViz />
                    </div>

                    {/* 2D Leap */}
                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-blue-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">
                            The Leap to 2D (and 3D):
                        </h4>
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 mb-4">
                            "Now, what if I change variables in 2D? For example, changing from a rectangular grid (x, y) to a polar grid (r, θ)."
                        </blockquote>

                        <ul className="space-y-3 mb-4 ml-6">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>I'm not just stretching a <em>line</em> anymore. I'm taking a tiny, perfect <em>square</em> in the (r, θ) world (a "square" of dr by dθ) and transforming it.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>In the (x, y) world, this square doesn't stay a perfect square. Because the transformation is curved, it gets stretched, sheared, and twisted into a tiny <strong className="text-blue-600 dark:text-blue-400">parallelogram</strong>.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>The integral needs to know the <strong className="text-blue-600 dark:text-blue-400">area</strong> of this new parallelogram.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">•</span>
                                <span>How can I find a general formula for the area of this parallelogram? It must depend on how <em>all</em> the variables are changing <em>at that exact point</em>.</span>
                            </li>
                        </ul>

                        <AreaStretchViz />
                    </div>
                </div>
            </div>

            {/* The Solution Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-green-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">⚡</span>
                    How He Solved It
                </h3>

                <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold text-green-700 dark:text-green-400">
                        Jacobi's genius was to connect this problem of "area scaling" to the new and powerful field of <strong>determinants</strong>.
                    </p>

                    {/* Step 1: The Matrix */}
                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-green-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-green-600 dark:text-green-400 mb-3">
                            1. The Matrix
                        </h4>
                        <p className="mb-4">
                            He realized that to capture the full change at a single point, he needed to know four things:
                        </p>

                        <ul className="space-y-2 mb-6 ml-6">
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-500 font-bold">∂x/∂r</span>
                                <span>How fast x changes with respect to r</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold">∂x/∂θ</span>
                                <span>How fast x changes with respect to θ</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 font-bold">∂y/∂r</span>
                                <span>How fast y changes with respect to r</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-orange-500 font-bold">∂y/∂θ</span>
                                <span>How fast y changes with respect to θ</span>
                            </li>
                        </ul>

                        <p className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
                            He organized these four partial derivatives into a grid, which we now call the <strong className="text-green-700 dark:text-green-400">Jacobian matrix</strong>. This matrix is the <em>best linear approximation</em> of the complex, curvy transformation at that one single point.
                        </p>
                    </div>

                    {/* Step 2: The Determinant */}
                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-emerald-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                            2. The Determinant
                        </h4>
                        <p className="mb-4">
                            Jacobi knew from linear algebra that the <strong>determinant</strong> of a 2×2 matrix represents the area of the parallelogram formed by its column vectors. He realized:
                        </p>

                        <ul className="space-y-3 ml-6">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 font-bold">•</span>
                                <span>The "functional determinant" (what we call the <strong className="text-emerald-600 dark:text-emerald-400">Jacobian determinant</strong>) of his matrix <em>was</em> the exact scaling factor he was looking for.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 font-bold">•</span>
                                <span>It was the local ratio of areas. It was the magic number that told him exactly how much that tiny (dr, dθ) square's area changed when it became a parallelogram in the (x, y) plane.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold">
                            He had found his universal tool. He published this in a famous 1841 paper, <em>De determinantibus functionalibus</em> ("On Functional Determinants"), giving mathematicians and physicists the robust method they desperately needed to change variables in any number of dimensions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Interactive Visualizations */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    Interactive Visualizations
                </h3>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <VisualizationCard
                        title="Polar Coordinate Transformation"
                        description="Watch how a point in polar (r, θ) space maps to Cartesian (x, y) space"
                    >
                        <PolarTransformViz />
                    </VisualizationCard>

                    <VisualizationCard
                        title="Area Scaling Animation"
                        description="See how the Jacobian determinant measures the area ratio between spaces"
                    >
                        <MatrixTransformViz />
                    </VisualizationCard>
                </div>

                <JacobianMatrixViz />
            </div>

            {/* The Formula Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-indigo-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    The Formula: Change of Variables in Integrals
                </h3>

                <div className="bg-white dark:bg-gray-700/50 rounded-xl p-8 border border-indigo-200 dark:border-gray-600">
                    <div className="text-center space-y-4">
                        <div className="text-2xl font-mono text-gray-800 dark:text-white">
                            ∬<sub className="text-sm">R</sub> f(x, y) dx dy = ∬<sub className="text-sm">S</sub> f(x(r,θ), y(r,θ)) · <span className="text-red-500 font-bold">|J|</span> · dr dθ
                        </div>

                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                            <p>where the Jacobian determinant for polar coordinates is:</p>
                            <div className="text-xl font-mono text-indigo-600 dark:text-indigo-400">
                                |J| = r
                            </div>
                        </div>

                        <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4 rounded-r text-left">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                <strong className="text-indigo-700 dark:text-indigo-400">Why the extra 'r'?</strong> When you integrate in polar coordinates, the area element is not just dr·dθ, but r·dr·dθ. The Jacobian determinant |J| = r accounts for this stretching of area as you move away from the origin!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Applications */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-cyan-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🚀</span>
                    Modern Applications
                </h3>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4 border border-cyan-200 dark:border-gray-600">
                        <h4 className="font-bold text-cyan-600 dark:text-cyan-400 mb-2">Machine Learning</h4>
                        <p className="text-gray-700 dark:text-gray-300">Normalizing flows and variational inference use the Jacobian to transform probability distributions</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4 border border-blue-200 dark:border-gray-600">
                        <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Computer Graphics</h4>
                        <p className="text-gray-700 dark:text-gray-300">3D transformations, texture mapping, and rendering rely on Jacobian matrices for coordinate changes</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4 border border-indigo-200 dark:border-gray-600">
                        <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Robotics</h4>
                        <p className="text-gray-700 dark:text-gray-300">Robot arm kinematics use Jacobians to relate joint velocities to end-effector velocities</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JacobianSection;
