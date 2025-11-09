import React, { useState, useEffect } from 'react';
import VisualizationCard from './VisualizationCard';

// Contour plot with constraint visualization
const ContourConstraintViz: React.FC = () => {
    const [t, setT] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setT(prev => (prev + 0.02) % (2 * Math.PI));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const width = 300;
    const height = 300;
    const centerX = 150;
    const centerY = 150;

    // Draw contour lines (circles representing f(x,y) = x^2 + y^2)
    const contours = [40, 60, 80, 100, 120];

    // Constraint curve (ellipse: g(x,y) = x^2/a^2 + y^2/b^2 = 1)
    const a = 80;
    const b = 60;
    const constraintPoints: {x: number, y: number}[] = [];
    for (let i = 0; i <= 100; i++) {
        const angle = (i / 100) * 2 * Math.PI;
        const x = centerX + a * Math.cos(angle);
        const y = centerY + b * Math.sin(angle);
        constraintPoints.push({x, y});
    }

    const constraintPath = constraintPoints.map((p, i) =>
        `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    ).join(' ') + ' Z';

    // Optimal point (top of ellipse where it's tangent to a contour)
    const optimalAngle = Math.PI / 2;
    const optimalX = centerX + a * Math.cos(optimalAngle);
    const optimalY = centerY + b * Math.sin(optimalAngle);

    // Animate a point moving along the constraint
    const currentAngle = t;
    const currentX = centerX + a * Math.cos(currentAngle);
    const currentY = centerY + b * Math.sin(currentAngle);

    // Gradient vectors at current point
    const gradF = { x: (currentX - centerX) * 0.3, y: (currentY - centerY) * 0.3 };
    const gradG = {
        x: (currentX - centerX) / (a * a) * 800,
        y: (currentY - centerY) / (b * b) * 800
    };

    // Normalize gradG to similar magnitude for visualization
    const gradGMag = Math.sqrt(gradG.x * gradG.x + gradG.y * gradG.y);
    const gradGNorm = { x: gradG.x / gradGMag * 40, y: gradG.y / gradGMag * 40 };

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <rect width={width} height={height} fill="#1f2937" />

            {/* Contour lines */}
            {contours.map((r, i) => (
                <circle
                    key={i}
                    cx={centerX}
                    cy={centerY}
                    r={r}
                    stroke="#6b7280"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.4"
                    strokeDasharray="3,3"
                />
            ))}

            {/* Constraint curve (fence) */}
            <path d={constraintPath} stroke="#f59e0b" strokeWidth="3.5" fill="none" />

            {/* Optimal point marker */}
            <circle cx={optimalX} cy={optimalY} r="8" fill="#10b981" stroke="#fff" strokeWidth="2" />
            <text x={optimalX + 15} y={optimalY - 10} fill="#10b981" fontSize="11" fontWeight="bold">
                Optimal!
            </text>

            {/* Current exploring point */}
            <circle cx={currentX} cy={currentY} r="6" fill="#ef4444" stroke="#fff" strokeWidth="2">
                <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
            </circle>

            {/* Gradient vectors at current point */}
            {/* Gradient of f (perpendicular to contours) */}
            <defs>
                <marker id="arrowF" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
                </marker>
                <marker id="arrowG" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#8b5cf6" />
                </marker>
            </defs>

            <line
                x1={currentX}
                y1={currentY}
                x2={currentX + gradF.x}
                y2={currentY + gradF.y}
                stroke="#3b82f6"
                strokeWidth="2.5"
                markerEnd="url(#arrowF)"
            />

            <line
                x1={currentX}
                y1={currentY}
                x2={currentX + gradGNorm.x}
                y2={currentY + gradGNorm.y}
                stroke="#8b5cf6"
                strokeWidth="2.5"
                markerEnd="url(#arrowG)"
            />

            {/* Labels */}
            <text x={width/2} y="20" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Fence on a Hill
            </text>
            <text x="20" y={height - 30} fill="#6b7280" fontSize="10">
                Contour lines
            </text>
            <text x="20" y={height - 15} fill="#f59e0b" fontSize="10" fontWeight="bold">
                Constraint (fence)
            </text>

            {/* Legend for gradients */}
            <text x={width - 80} y={height - 30} fill="#3b82f6" fontSize="10" fontWeight="bold">
                ∇f
            </text>
            <text x={width - 80} y={height - 15} fill="#8b5cf6" fontSize="10" fontWeight="bold">
                ∇g
            </text>
        </svg>
    );
};

// 3D Surface with constraint path
const Surface3DViz: React.FC = () => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRotation(prev => (prev + 0.5) % 360);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const width = 300;
    const height = 250;
    const centerX = 150;
    const centerY = 180;

    // Create a 3D paraboloid surface f(x,y) = x^2 + y^2
    const gridSize = 8;
    const scale = 15;
    const points: {x: number, y: number, z: number}[] = [];

    for (let i = -gridSize; i <= gridSize; i++) {
        for (let j = -gridSize; j <= gridSize; j++) {
            const x = i * 0.5;
            const y = j * 0.5;
            const z = x * x + y * y;
            points.push({x, y, z});
        }
    }

    // Constraint path (circle at z level)
    const constraintPath: {x: number, y: number, z: number}[] = [];
    const radius = 2;
    for (let i = 0; i <= 50; i++) {
        const angle = (i / 50) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        const z = x * x + y * y;
        constraintPath.push({x, y, z});
    }

    // Rotation
    const angle = (rotation * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <rect width={width} height={height} fill="#1f2937" />

            {/* Draw surface points */}
            {points.map((p, idx) => {
                const rotX = p.x * cos - p.y * sin;
                const rotY = p.x * sin + p.y * cos;

                const svgX = centerX + rotX * scale;
                const svgY = centerY - p.z * scale * 0.4 - rotY * scale * 0.5;

                const brightness = Math.max(0.3, (p.z + 5) / 20);
                const color = `rgba(59, 130, 246, ${brightness})`;
                const size = Math.max(1, 2.5 - Math.abs(rotY) / 3);

                return (
                    <circle
                        key={idx}
                        cx={svgX}
                        cy={svgY}
                        r={size}
                        fill={color}
                        opacity={0.5}
                    />
                );
            })}

            {/* Draw constraint path */}
            {constraintPath.map((p, idx) => {
                const rotX = p.x * cos - p.y * sin;
                const rotY = p.x * sin + p.y * cos;

                const svgX = centerX + rotX * scale;
                const svgY = centerY - p.z * scale * 0.4 - rotY * scale * 0.5;

                if (idx === 0) return null;

                const prevP = constraintPath[idx - 1];
                const prevRotX = prevP.x * cos - prevP.y * sin;
                const prevRotY = prevP.x * sin + prevP.y * cos;
                const prevSvgX = centerX + prevRotX * scale;
                const prevSvgY = centerY - prevP.z * scale * 0.4 - prevRotY * scale * 0.5;

                return (
                    <line
                        key={idx}
                        x1={prevSvgX}
                        y1={prevSvgY}
                        x2={svgX}
                        y2={svgY}
                        stroke="#f59e0b"
                        strokeWidth="3"
                        opacity={0.9}
                    />
                );
            })}

            {/* Labels */}
            <text x={width/2} y="20" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                3D View: Surface f(x,y) with Constraint
            </text>
            <text x={width/2} y={height - 10} fill="#3b82f6" fontSize="10" textAnchor="middle">
                Blue: Paraboloid surface
            </text>
            <text x={width/2} y={height - 25} fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">
                Orange: Constraint path
            </text>
        </svg>
    );
};

// Gradient parallel demonstration
const GradientParallelViz: React.FC = () => {
    const width = 300;
    const height = 200;
    const centerX = 150;
    const centerY = 100;

    // Two scenarios: parallel (optimal) and non-parallel (sub-optimal)
    const scenarios = [
        {
            label: 'At Optimum',
            gradF: { x: 40, y: 30 },
            gradG: { x: 40, y: 30 },
            isOptimal: true,
            position: { x: centerX - 70, y: centerY }
        },
        {
            label: 'Not at Optimum',
            gradF: { x: 40, y: 20 },
            gradG: { x: 20, y: 40 },
            isOptimal: false,
            position: { x: centerX + 70, y: centerY }
        }
    ];

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <rect width={width} height={height} fill="#1f2937" />

            {scenarios.map((scenario, idx) => {
                const { position, gradF, gradG, isOptimal, label } = scenario;
                const color = isOptimal ? '#10b981' : '#ef4444';

                return (
                    <g key={idx}>
                        {/* Center point */}
                        <circle cx={position.x} cy={position.y} r="5" fill={color} />

                        {/* Gradient F */}
                        <defs>
                            <marker id={`arrowF${idx}`} markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
                            </marker>
                            <marker id={`arrowG${idx}`} markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                                <polygon points="0 0, 8 3, 0 6" fill="#8b5cf6" />
                            </marker>
                        </defs>

                        <line
                            x1={position.x}
                            y1={position.y}
                            x2={position.x + gradF.x}
                            y2={position.y - gradF.y}
                            stroke="#3b82f6"
                            strokeWidth="2.5"
                            markerEnd={`url(#arrowF${idx})`}
                        />

                        <line
                            x1={position.x}
                            y1={position.y}
                            x2={position.x + gradG.x}
                            y2={position.y - gradG.y}
                            stroke="#8b5cf6"
                            strokeWidth="2.5"
                            markerEnd={`url(#arrowG${idx})`}
                            strokeDasharray={isOptimal ? "0" : "4,2"}
                        />

                        {/* Label */}
                        <text
                            x={position.x}
                            y={position.y + 50}
                            fill={color}
                            fontSize="11"
                            fontWeight="bold"
                            textAnchor="middle"
                        >
                            {label}
                        </text>

                        {isOptimal && (
                            <text
                                x={position.x}
                                y={position.y + 65}
                                fill="#10b981"
                                fontSize="9"
                                textAnchor="middle"
                            >
                                ∇f = λ∇g ✓
                            </text>
                        )}
                    </g>
                );
            })}

            {/* Title */}
            <text x={width/2} y="20" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Parallel Gradients = Optimal Point
            </text>

            {/* Legend */}
            <text x="20" y={height - 30} fill="#3b82f6" fontSize="10" fontWeight="bold">∇f (objective)</text>
            <text x="20" y={height - 15} fill="#8b5cf6" fontSize="10" fontWeight="bold">∇g (constraint)</text>
        </svg>
    );
};

// Lagrange multiplier equation display
const LagrangeEquationViz: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 p-8 rounded-xl border-2 border-amber-500/50">
            <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-white mb-2">The Lagrange Multiplier Method</h4>
                <p className="text-sm text-gray-300">Converting constrained to unconstrained optimization</p>
            </div>

            <div className="space-y-6">
                {/* The problem */}
                <div className="bg-white/5 rounded-lg p-4 border border-amber-500/30">
                    <div className="text-amber-400 text-sm font-bold mb-2">Constrained Problem</div>
                    <div className="space-y-2 text-center">
                        <div className="text-white text-lg">Maximize/Minimize: <span className="font-mono">f(x, y)</span></div>
                        <div className="text-gray-300 text-sm">Subject to: <span className="font-mono">g(x, y) = c</span></div>
                    </div>
                </div>

                {/* The solution */}
                <div className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg p-6 text-center">
                    <div className="text-white text-sm font-bold mb-3">The Key Equation</div>
                    <div className="text-2xl font-mono text-white font-bold mb-2">
                        ∇f = λ∇g
                    </div>
                    <div className="text-white/90 text-xs mt-2">
                        The gradients must be parallel at the optimum
                    </div>
                </div>

                {/* What to solve */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-yellow-500/30">
                        <div className="text-yellow-400 text-sm font-bold mb-2">System to Solve</div>
                        <div className="space-y-1 text-sm font-mono text-gray-300">
                            <div>∂f/∂x = λ·∂g/∂x</div>
                            <div>∂f/∂y = λ·∂g/∂y</div>
                            <div>g(x, y) = c</div>
                        </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-orange-500/30">
                        <div className="text-orange-400 text-sm font-bold mb-2">Result</div>
                        <div className="text-sm text-gray-300">
                            Solve 3 equations for 3 unknowns: x, y, and λ
                        </div>
                    </div>
                </div>

                {/* Interpretation */}
                <div className="bg-amber-950/30 rounded-lg p-4 border-l-4 border-amber-500">
                    <p className="text-sm text-gray-300">
                        <strong className="text-amber-400">λ (lambda)</strong> represents the "shadow price" or sensitivity: how much the optimal value changes if you relax the constraint slightly.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Newton vs Lagrange comparison
const NewtonVsLagrangeViz: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Newton's approach */}
            <div className="bg-gradient-to-br from-slate-900/40 to-gray-900/40 p-6 rounded-xl border-2 border-gray-500/50">
                <div className="text-center mb-4">
                    <div className="text-4xl mb-2">📐</div>
                    <h5 className="text-lg font-bold text-gray-400">Newton's Mechanics</h5>
                    <div className="text-xs text-gray-500 mt-1">(17th Century)</div>
                </div>
                <div className="space-y-3 text-sm text-gray-300">
                    <div className="bg-gray-950/30 rounded p-3">
                        <strong className="text-gray-400">Method:</strong> Geometry & diagrams
                    </div>
                    <div className="bg-gray-950/30 rounded p-3">
                        <strong className="text-gray-400">Focus:</strong> Forces & vectors (F = ma)
                    </div>
                    <div className="bg-gray-950/30 rounded p-3">
                        <strong className="text-gray-400">Constraints:</strong> Handle each case separately
                    </div>
                    <div className="bg-gray-950/30 rounded p-3 text-xs">
                        <div className="text-gray-500">Each problem needs:</div>
                        <ul className="mt-1 ml-4 space-y-1">
                            <li>• New diagrams</li>
                            <li>• Force resolution</li>
                            <li>• Geometric intuition</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Lagrange's approach */}
            <div className="bg-gradient-to-br from-amber-900/40 to-yellow-900/40 p-6 rounded-xl border-2 border-amber-500/50">
                <div className="text-center mb-4">
                    <div className="text-4xl mb-2">✨</div>
                    <h5 className="text-lg font-bold text-amber-400">Lagrange's Vision</h5>
                    <div className="text-xs text-amber-500 mt-1">(18th Century)</div>
                </div>
                <div className="space-y-3 text-sm text-gray-300">
                    <div className="bg-amber-950/30 rounded p-3">
                        <strong className="text-amber-400">Method:</strong> Pure algebra (no diagrams!)
                    </div>
                    <div className="bg-amber-950/30 rounded p-3">
                        <strong className="text-amber-400">Focus:</strong> Energy (L = T - V)
                    </div>
                    <div className="bg-amber-950/30 rounded p-3">
                        <strong className="text-amber-400">Constraints:</strong> Built into the equations
                    </div>
                    <div className="bg-amber-950/30 rounded p-3 text-xs">
                        <div className="text-amber-400">One master equation for:</div>
                        <ul className="mt-1 ml-4 space-y-1">
                            <li>• Any system</li>
                            <li>• Any coordinates</li>
                            <li>• Any constraints</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Interactive optimization example
const OptimizationExampleViz: React.FC = () => {
    const width = 300;
    const height = 250;
    const centerX = 150;
    const centerY = 150;

    // Example: Maximize f(x,y) = xy subject to g(x,y) = x + y = 4
    // Solution: x = y = 2, giving f = 4

    // Draw feasible region (line x + y = 4)
    const lineStart = { x: 30, y: centerY - 80 };
    const lineEnd = { x: 270, y: centerY + 80 };

    // Draw level curves of f(x,y) = xy
    const levelCurves = [1, 2, 3, 4, 5];

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <rect width={width} height={height} fill="#1f2937" />

            {/* Axes */}
            <line x1="30" y1={centerY} x2={width - 30} y2={centerY} stroke="#4b5563" strokeWidth="1" />
            <line x1={centerX} y1="30" x2={centerX} y2={height - 30} stroke="#4b5563" strokeWidth="1" />

            {/* Level curves (hyperbolas xy = k) */}
            {levelCurves.map((k, idx) => {
                const points: {x: number, y: number}[] = [];
                for (let x = 0.5; x <= 5; x += 0.1) {
                    const y = k / x;
                    if (y > 0 && y <= 5) {
                        const svgX = centerX + (x - 2.5) * 40;
                        const svgY = centerY - (y - 2.5) * 40;
                        points.push({ x: svgX, y: svgY });
                    }
                }

                const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

                return (
                    <path
                        key={idx}
                        d={pathD}
                        stroke="#3b82f6"
                        fill="none"
                        opacity={k === 4 ? 0.8 : 0.3}
                        strokeWidth={k === 4 ? 2.5 : 1.5}
                    />
                );
            })}

            {/* Constraint line x + y = 4 */}
            <line
                x1={lineStart.x}
                y1={lineStart.y}
                x2={lineEnd.x}
                y2={lineEnd.y}
                stroke="#f59e0b"
                strokeWidth="3.5"
            />

            {/* Optimal point (2, 2) */}
            <circle cx={centerX} cy={centerY} r="8" fill="#10b981" stroke="#fff" strokeWidth="2" />

            {/* Labels */}
            <text x={width/2} y="20" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Example: Maximize xy subject to x+y=4
            </text>

            <text x={centerX + 15} y={centerY - 10} fill="#10b981" fontSize="11" fontWeight="bold">
                (2, 2)
            </text>

            <text x="240" y="60" fill="#3b82f6" fontSize="10">
                xy = 4
            </text>

            <text x="220" y="220" fill="#f59e0b" fontSize="10" fontWeight="bold">
                x + y = 4
            </text>

            {/* Axis labels */}
            <text x={width - 35} y={centerY + 15} fill="#9ca3af" fontSize="10">x</text>
            <text x={centerX + 10} y="40" fill="#9ca3af" fontSize="10">y</text>
        </svg>
    );
};

const LagrangianSection: React.FC = () => {
    return (
        <section className="space-y-8">
            <div className="border-l-4 border-amber-500 pl-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    The Tool for Constraints: Lagrange Multipliers
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Joseph-Louis Lagrange • ~1755-1788</p>
            </div>

            {/* The Behind Story */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-amber-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📖</span>
                    The Behind Story: A Quest for Mathematical Poetry
                </h3>

                <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold text-amber-700 dark:text-amber-400">
                        Lagrange's multiplier wasn't invented in isolation. It was a crucial piece in his grand ambition: to transform all of mechanics into pure, elegant mathematics.
                    </p>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-amber-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-3">
                            The Problem: Newton's "Clumsy Genius"
                        </h4>
                        <p className="mb-4">
                            In the 18th century, Isaac Newton's laws of motion were revolutionary, but using them was often messy and case-by-case:
                        </p>
                        <ul className="space-y-2 ml-6 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">📐</span>
                                <span><strong>Geometric & Visual:</strong> Every problem required drawing diagrams, resolving forces into components (F<sub>x</sub>, F<sub>y</sub>), and using geometric intuition</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">🔧</span>
                                <span><strong>Case-by-Case:</strong> Each new constraint (a pendulum rod, a bead on a wire, a block on a ramp) required starting over with new diagrams and equations</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">⚙️</span>
                                <span><strong>Forces of Constraint:</strong> You had to manually calculate tension, normal force, and other "constraint forces" for each situation</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-yellow-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-yellow-600 dark:text-yellow-400 mb-3">
                            Lagrange's Vision: "Mechanics Without Diagrams"
                        </h4>
                        <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-700 dark:text-gray-300 mb-4">
                            "Mechanics, the most fundamental of all sciences, should be as logical and clean as algebra. It shouldn't be a collection of clever geometric tricks."
                        </blockquote>
                        <p className="mb-3">
                            Lagrange wanted to create a system where you could:
                        </p>
                        <ol className="space-y-2 ml-6 text-sm list-decimal">
                            <li>Describe a system (planets, pendulums, pulleys) using its <strong>energy</strong></li>
                            <li>Plug that description into one <strong>"master equation"</strong></li>
                            <li>Turn the "crank" of calculus and have the equations of motion fall out <strong>automatically</strong></li>
                        </ol>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-3 mt-4 text-sm">
                            <strong className="text-yellow-700 dark:text-yellow-400">His Bold Promise:</strong> He later boasted that his book on mechanics would contain "no figures [diagrams] at all."
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold">
                            But there was one major obstacle standing in his way: <strong>constraints</strong>. How could a single equation possibly account for the messy, specific forces from rods, wires, and surfaces?
                        </p>
                    </div>
                </div>
            </div>

            {/* Newton vs Lagrange Comparison */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    Two Philosophies of Mechanics
                </h3>
                <NewtonVsLagrangeViz />
            </div>

            {/* The Problem Section */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-orange-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🎯</span>
                    The Problem: Constrained Optimization
                </h3>

                <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p>
                        Lagrange's breakthrough came while working in the field of <strong>statics</strong>—the study of systems in equilibrium.
                    </p>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-orange-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-3">
                            The Specific Challenge
                        </h4>
                        <p className="mb-3">
                            He was trying to find the <strong>equilibrium configuration</strong> (the point of minimum potential energy) for a system of points that were <strong>constrained</strong>—for example, connected by rigid rods of fixed length.
                        </p>
                        <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r">
                            <p className="text-sm mb-2"><strong className="text-orange-700 dark:text-orange-400">The Core Problem:</strong></p>
                            <p className="text-sm">
                                Find the values of (x, y, z, ...) that minimize some function f (like potential energy), but you can't choose them freely—they must satisfy a constraint equation g(x, y, z, ...) = c (like "the rod has length 5").
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-amber-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-3">
                            Why This is Hard
                        </h4>
                        <p className="mb-3">
                            In ordinary calculus, you minimize f by finding where ∇f = 0. But with a constraint, most points where ∇f = 0 aren't even on the constraint surface!
                        </p>
                        <ul className="space-y-2 ml-6 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>You need a minimum, but only among points that satisfy the constraint</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>The constraint creates forces (like tension in a rod) that "push back"</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>You need a systematic way to handle ANY constraint, not case-by-case solutions</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold">
                            This was the puzzle that led to Lagrange's most elegant invention: the Lagrange multiplier.
                        </p>
                    </div>
                </div>
            </div>

            {/* The Intuition Section */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-teal-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">💡</span>
                    The Intuition: A Fence on a Hill
                </h3>

                <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p>
                        Lagrange's insight was purely geometric, and it's beautifully simple:
                    </p>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-teal-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-3">
                            The Geometric Picture
                        </h4>
                        <ol className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-teal-600 dark:text-teal-400 font-bold min-w-[1.5rem]">1.</span>
                                <div>
                                    <strong>The Hill:</strong> Imagine the function you want to optimize, f(x, y), as a landscape—a hill with contour lines showing points of equal height.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-teal-600 dark:text-teal-400 font-bold min-w-[1.5rem]">2.</span>
                                <div>
                                    <strong>The Fence:</strong> Imagine your constraint, g(x, y) = c, as a fence drawn on that hill. You're not free to go anywhere—you must stay on the fence.
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-teal-600 dark:text-teal-400 font-bold min-w-[1.5rem]">3.</span>
                                <div>
                                    <strong>The Quest:</strong> You want to find the highest (or lowest) point while staying on the fence.
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-cyan-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-3">
                            The Key Observation: Tangency
                        </h4>
                        <blockquote className="border-l-4 border-cyan-500 pl-4 italic text-gray-700 dark:text-gray-300 mb-4">
                            "The optimal point must occur where the fence runs <strong>tangent</strong> to a contour line of the hill."
                        </blockquote>
                        <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded p-4 text-sm">
                            <p className="mb-2"><strong className="text-cyan-700 dark:text-cyan-400">Why?</strong></p>
                            <p>
                                If the fence crossed a contour line (wasn't tangent), you could move along the fence in one direction to go "uphill" to a higher point, or in the other direction to go "downhill" to a lower point. The fence would be crossing through different contour levels.
                            </p>
                            <p className="mt-2">
                                But at a maximum or minimum <em>on the fence</em>, the fence must run exactly along (tangent to) a single contour line at that point.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-blue-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">
                            From Geometry to Equations: Parallel Gradients
                        </h4>
                        <p className="mb-4">
                            Lagrange translated this geometric insight into calculus:
                        </p>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">•</span>
                                <div>
                                    The <strong>gradient ∇f</strong> always points in the direction of steepest ascent—perpendicular to the contour lines
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">•</span>
                                <div>
                                    The <strong>gradient ∇g</strong> points perpendicular to the constraint curve (the "fence")
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 font-bold">•</span>
                                <div>
                                    At the optimal tangent point, both gradients must point in the <strong>same direction</strong> (or exactly opposite directions)
                                </div>
                            </li>
                        </ul>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 mt-4">
                            <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                                This means: ∇f and ∇g are <strong>parallel</strong>!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualizations */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    Visualizing the Geometric Intuition
                </h3>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <VisualizationCard
                        title="Fence on a Hill (2D View)"
                        description="The orange constraint curve must be tangent to a contour line at the optimum"
                    >
                        <ContourConstraintViz />
                    </VisualizationCard>

                    <VisualizationCard
                        title="3D Surface View"
                        description="The constraint path (orange) winds through the 3D surface"
                    >
                        <Surface3DViz />
                    </VisualizationCard>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <VisualizationCard
                        title="Parallel Gradients"
                        description="At the optimum, ∇f and ∇g point in the same direction"
                    >
                        <GradientParallelViz />
                    </VisualizationCard>

                    <VisualizationCard
                        title="Concrete Example"
                        description="Maximize xy subject to x+y=4. Solution: (2,2)"
                    >
                        <OptimizationExampleViz />
                    </VisualizationCard>
                </div>
            </div>

            {/* The Solution */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-green-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">⚡</span>
                    How He Solved It: The Multiplier
                </h3>

                <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold text-green-700 dark:text-green-400">
                        Lagrange's genius was to introduce a new variable to capture the parallelism mathematically.
                    </p>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-green-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-green-600 dark:text-green-400 mb-3">
                            The Mathematical Formulation
                        </h4>
                        <p className="mb-4">
                            If two vectors are parallel, one must be a scalar multiple of the other. So the condition "∇f and ∇g are parallel" can be written as:
                        </p>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded p-4 text-center mb-4">
                            <div className="text-2xl font-mono font-bold text-green-700 dark:text-green-300">
                                ∇f = λ∇g
                            </div>
                        </div>
                        <p className="text-sm">
                            The scalar λ (lambda) is the <strong>Lagrange multiplier</strong>. It's a new variable that we introduce to represent the unknown proportionality constant.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-emerald-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                            The Complete System
                        </h4>
                        <p className="mb-3">
                            This single vector equation ∇f = λ∇g expands into a system of equations:
                        </p>
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded p-4 mb-4">
                            <div className="font-mono text-sm space-y-2 text-center">
                                <div>∂f/∂x = λ·∂g/∂x</div>
                                <div>∂f/∂y = λ·∂g/∂y</div>
                                <div>∂f/∂z = λ·∂g/∂z</div>
                                <div className="text-emerald-700 dark:text-emerald-400">...</div>
                                <div className="mt-2 text-emerald-700 dark:text-emerald-400">g(x, y, z, ...) = c</div>
                            </div>
                        </div>
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-3 rounded-r text-sm">
                            <strong className="text-emerald-700 dark:text-emerald-400">The Beauty:</strong> We now have n+1 equations (where n is the number of variables) for n+1 unknowns (the n variables plus λ). This is solvable!
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-teal-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-teal-600 dark:text-teal-400 mb-3">
                            What λ Represents
                        </h4>
                        <p className="mb-3">
                            The multiplier λ has a beautiful physical interpretation:
                        </p>
                        <ul className="space-y-2 ml-6 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500 font-bold">•</span>
                                <span><strong>In mechanics:</strong> λ represents the magnitude of the constraint force (like tension in a rod)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500 font-bold">•</span>
                                <span><strong>In economics:</strong> λ is the "shadow price"—how much the optimal value would improve if you relaxed the constraint slightly</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-teal-500 font-bold">•</span>
                                <span><strong>In general:</strong> λ quantifies the "sensitivity" of the optimum to changes in the constraint</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold">
                            By introducing λ, Lagrange converted a messy, constrained problem into a clean, unconstrained system of algebraic equations. This was the key to his grand vision.
                        </p>
                    </div>
                </div>
            </div>

            {/* The Lagrange Multiplier Equation */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    The Lagrange Multiplier Method
                </h3>
                <LagrangeEquationViz />
            </div>

            {/* The Masterpiece */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-purple-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📚</span>
                    The Masterpiece: Mécanique Analytique (1788)
                </h3>

                <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold text-purple-700 dark:text-purple-400">
                        The Lagrange multiplier was the final key that unlocked Lagrange's grand vision.
                    </p>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-purple-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-3">
                            The Vision Realized
                        </h4>
                        <p className="mb-4">
                            With the multiplier method in hand, Lagrange could now handle <em>any</em> constraint in a systematic, algebraic way. This allowed him to unite all of mechanics into one elegant framework.
                        </p>
                        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r mb-4">
                            <p className="text-sm italic">
                                In 1788, he published his masterpiece: <strong>Mécanique analytique</strong> (Analytical Mechanics). It was exactly what he had promised—hundreds of pages of pure, elegant algebra that could solve any problem in mechanics.
                            </p>
                        </div>
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-4 text-sm">
                            <strong className="text-purple-700 dark:text-purple-400">His Famous Boast:</strong> True to his word, the book contained not a single diagram. He had successfully transformed mechanics from a puzzle of geometry into a branch of pure mathematics.
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-violet-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-violet-600 dark:text-violet-400 mb-3">
                            The Unified Framework
                        </h4>
                        <p className="mb-3">
                            Lagrange's system works like this:
                        </p>
                        <ol className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold min-w-[1.5rem]">1.</span>
                                <div>
                                    <strong>Describe the system</strong> using energy: Define the Lagrangian L = T - V (kinetic minus potential energy)
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold min-w-[1.5rem]">2.</span>
                                <div>
                                    <strong>Add constraints</strong> using multipliers: For each constraint g<sub>i</sub> = c<sub>i</sub>, introduce a multiplier λ<sub>i</sub>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold min-w-[1.5rem]">3.</span>
                                <div>
                                    <strong>Apply the principle</strong>: Use the Euler-Lagrange equation with the augmented Lagrangian
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-violet-600 dark:text-violet-400 font-bold min-w-[1.5rem]">4.</span>
                                <div>
                                    <strong>Turn the crank</strong>: The equations of motion fall out automatically
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold mb-3">
                            The Lagrange multiplier wasn't just a tool for a specific problem. It was the engine that made Lagrange's entire grand vision possible—transforming mechanics into mathematical poetry.
                        </p>
                        <p className="text-white/90 text-center text-sm">
                            Every constrained system, from pendulums to planets, could now be solved with the same elegant machinery.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modern Applications */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🚀</span>
                    Modern Applications
                </h3>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-blue-200 dark:border-gray-600">
                        <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2 text-base">Machine Learning</h4>
                        <p className="text-gray-700 dark:text-gray-300">Support Vector Machines (SVMs) use Lagrange multipliers to find the optimal separating hyperplane with margin constraints</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-indigo-200 dark:border-gray-600">
                        <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2 text-base">Economics</h4>
                        <p className="text-gray-700 dark:text-gray-300">Utility maximization under budget constraints, portfolio optimization, and resource allocation all use Lagrange multipliers</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-purple-200 dark:border-gray-600">
                        <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-2 text-base">Operations Research</h4>
                        <p className="text-gray-700 dark:text-gray-300">Optimization problems in logistics, scheduling, and supply chain management rely on Lagrange multipliers</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-cyan-200 dark:border-gray-600">
                        <h4 className="font-bold text-cyan-600 dark:text-cyan-400 mb-2 text-base">Engineering</h4>
                        <p className="text-gray-700 dark:text-gray-300">Structural optimization, control systems design, and signal processing use constrained optimization</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-teal-200 dark:border-gray-600">
                        <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2 text-base">Physics</h4>
                        <p className="text-gray-700 dark:text-gray-300">Still used in Lagrange's original context: analytical mechanics, constraint forces, and equilibrium analysis</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-amber-200 dark:border-gray-600">
                        <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2 text-base">Statistics</h4>
                        <p className="text-gray-700 dark:text-gray-300">Maximum likelihood estimation with parameter constraints and hypothesis testing use Lagrange multipliers</p>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 text-center">From Statics to the Standard Model</h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                        <div className="text-3xl mb-2 text-center">⚖️</div>
                        <h4 className="font-bold mb-2 text-center">~1755: Statics</h4>
                        <p className="text-center text-white/90">Lagrange invents the multiplier to handle constraint forces in equilibrium problems</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                        <div className="text-3xl mb-2 text-center">📐</div>
                        <h4 className="font-bold mb-2 text-center">1788: The Vision</h4>
                        <p className="text-center text-white/90">Mécanique analytique unifies all mechanics using elegant algebra—no diagrams!</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                        <div className="text-3xl mb-2 text-center">🌍</div>
                        <h4 className="font-bold mb-2 text-center">Today: Everywhere</h4>
                        <p className="text-center text-white/90">From machine learning to economics, the multiplier solves constrained optimization</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LagrangianSection;
