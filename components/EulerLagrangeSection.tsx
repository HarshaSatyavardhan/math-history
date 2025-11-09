import React, { useState, useEffect } from 'react';
import VisualizationCard from './VisualizationCard';

// Brachistochrone Curve Visualization (fastest descent)
const BrachistochroneViz: React.FC = () => {
    const [t, setT] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setT(prev => (prev + 0.015) % 1);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const width = 300;
    const height = 250;
    const startX = 30;
    const startY = 30;
    const endX = 270;
    const endY = 200;

    // Generate cycloid curve (brachistochrone solution)
    const cycPoints: {x: number, y: number}[] = [];
    const numPoints = 100;
    for (let i = 0; i <= numPoints; i++) {
        const param = (i / numPoints) * Math.PI;
        const x = startX + (endX - startX) * (param - Math.sin(param)) / Math.PI;
        const y = startY + (endY - startY) * (1 - Math.cos(param)) / 2;
        cycPoints.push({x, y});
    }

    // Generate straight line path
    const linePoints: {x: number, y: number}[] = [];
    for (let i = 0; i <= numPoints; i++) {
        const frac = i / numPoints;
        const x = startX + (endX - startX) * frac;
        const y = startY + (endY - startY) * frac;
        linePoints.push({x, y});
    }

    // Particle position on cycloid
    const particleIdx = Math.floor(t * (cycPoints.length - 1));
    const particlePos = cycPoints[particleIdx];

    // Slower particle on straight line
    const lineParticleIdx = Math.floor((t * 0.7) * (linePoints.length - 1));
    const lineParticlePos = linePoints[Math.min(lineParticleIdx, linePoints.length - 1)];

    const cycloidPath = cycPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const linePath = linePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <rect width={width} height={height} fill="#1f2937" />

            {/* Straight line path */}
            <path d={linePath} stroke="#6b7280" strokeWidth="2" fill="none" strokeDasharray="4,4" opacity="0.5" />

            {/* Cycloid path (brachistochrone) */}
            <path d={cycloidPath} stroke="#f97316" strokeWidth="3" fill="none" />

            {/* Start and end points */}
            <circle cx={startX} cy={startY} r="6" fill="#10b981" stroke="#fff" strokeWidth="2" />
            <circle cx={endX} cy={endY} r="6" fill="#ef4444" stroke="#fff" strokeWidth="2" />

            {/* Particles */}
            <circle cx={particlePos.x} cy={particlePos.y} r="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2">
                <animate attributeName="opacity" values="1;0.6;1" dur="1s" repeatCount="indefinite" />
            </circle>

            <circle cx={lineParticlePos.x} cy={lineParticlePos.y} r="7" fill="#6b7280" stroke="#9ca3af" strokeWidth="2" opacity="0.7" />

            {/* Labels */}
            <text x={width/2} y="20" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Brachistochrone Problem
            </text>
            <text x={startX - 15} y={startY + 5} fill="#10b981" fontSize="10" fontWeight="bold">A</text>
            <text x={endX + 15} y={endY + 5} fill="#ef4444" fontSize="10" fontWeight="bold">B</text>

            <text x={width/2} y={height - 10} fill="#f97316" fontSize="10" textAnchor="middle">
                Orange: Fastest path (cycloid)
            </text>
            <text x={width/2} y={height - 25} fill="#9ca3af" fontSize="10" textAnchor="middle">
                Gray: Straight line (slower!)
            </text>
        </svg>
    );
};

// Path Variation Visualization
const PathVariationViz: React.FC = () => {
    const [wiggleAmount, setWiggleAmount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWiggleAmount(prev => Math.sin(prev + 0.1));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const width = 300;
    const height = 200;
    const startX = 30;
    const endX = 270;
    const centerY = height / 2;

    // True path (smooth curve)
    const truePath: {x: number, y: number}[] = [];
    const numPoints = 50;
    for (let i = 0; i <= numPoints; i++) {
        const x = startX + (endX - startX) * (i / numPoints);
        const t = (i / numPoints) * 2 * Math.PI;
        const y = centerY + 20 * Math.sin(t);
        truePath.push({x, y});
    }

    // Varied path (wiggled)
    const variedPath: {x: number, y: number}[] = [];
    for (let i = 0; i <= numPoints; i++) {
        const x = startX + (endX - startX) * (i / numPoints);
        const t = (i / numPoints) * 2 * Math.PI;
        const wiggle = wiggleAmount * 15 * Math.sin(3 * t);
        const y = centerY + 20 * Math.sin(t) + wiggle;
        variedPath.push({x, y});
    }

    const truePathD = truePath.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const variedPathD = variedPath.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <rect width={width} height={height} fill="#1f2937" />

            {/* True path */}
            <path d={truePathD} stroke="#10b981" strokeWidth="3" fill="none" />

            {/* Varied path */}
            <path d={variedPathD} stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeDasharray="5,3" />

            {/* Start and end */}
            <circle cx={startX} cy={truePath[0].y} r="5" fill="#3b82f6" />
            <circle cx={endX} cy={truePath[truePath.length - 1].y} r="5" fill="#ef4444" />

            {/* Labels */}
            <text x={width/2} y="20" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Lagrange's "Wiggle" Test
            </text>
            <text x={width/2} y={height - 10} fill="#10b981" fontSize="10" textAnchor="middle">
                Green: True minimizing path
            </text>
            <text x={width/2} y={height - 25} fill="#f59e0b" fontSize="10" textAnchor="middle">
                Orange: "Wiggled" variation
            </text>
        </svg>
    );
};

// Action Integral Comparison
const ActionIntegralViz: React.FC = () => {
    const width = 300;
    const height = 220;

    // Three different paths
    const paths = [
        { color: '#10b981', label: 'Optimal Path', action: 2.45, yOffset: 0 },
        { color: '#f59e0b', label: 'Path 2', action: 3.82, yOffset: 20 },
        { color: '#ef4444', label: 'Path 3', action: 4.91, yOffset: -15 }
    ];

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <rect width={width} height={height} fill="#1f2937" />

            {/* Draw paths */}
            {paths.map((path, idx) => {
                const points: {x: number, y: number}[] = [];
                const numPoints = 40;
                const startX = 30;
                const endX = 180;
                const centerY = 100;

                for (let i = 0; i <= numPoints; i++) {
                    const frac = i / numPoints;
                    const x = startX + (endX - startX) * frac;
                    const y = centerY + path.yOffset * Math.sin(Math.PI * frac);
                    points.push({x, y});
                }

                const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

                return (
                    <g key={idx}>
                        <path d={pathD} stroke={path.color} strokeWidth="2.5" fill="none" />
                        <text
                            x={200}
                            y={100 + idx * 25 - 25}
                            fill={path.color}
                            fontSize="11"
                            fontWeight="bold"
                        >
                            {path.label}: S = {path.action}
                        </text>
                    </g>
                );
            })}

            {/* Start and end markers */}
            <circle cx={30} cy={100} r="5" fill="#3b82f6" />
            <circle cx={180} cy={100} r="5" fill="#8b5cf6" />

            {/* Title */}
            <text x={width/2} y="20" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Action S = ∫ L dt for Different Paths
            </text>

            {/* Highlight minimum */}
            <text x={width/2} y={height - 10} fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
                Minimum Action → True Physical Path!
            </text>
        </svg>
    );
};

// Euler-Lagrange Equation Visualization
const EulerLagrangeEquationViz: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 p-8 rounded-xl border-2 border-orange-500/50">
            <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-white mb-2">The Euler-Lagrange Equation</h4>
                <p className="text-sm text-gray-300">The heart of the Calculus of Variations</p>
            </div>

            <div className="space-y-6">
                {/* Main equation */}
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg p-6 text-center">
                    <div className="text-2xl font-mono text-white font-bold">
                        d/dt (∂L/∂ẏ) - ∂L/∂y = 0
                    </div>
                </div>

                {/* Interpretation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-orange-500/30">
                        <div className="text-orange-400 text-sm font-bold mb-2">For the Lagrangian</div>
                        <div className="text-white text-lg font-mono">L = T - V</div>
                        <div className="text-gray-400 text-xs mt-2">Kinetic - Potential Energy</div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-amber-500/30">
                        <div className="text-amber-400 text-sm font-bold mb-2">This equation gives</div>
                        <div className="text-white text-sm">Newton's Laws!</div>
                        <div className="text-gray-400 text-xs mt-2">F = ma emerges naturally</div>
                    </div>
                </div>

                {/* What it means */}
                <div className="bg-orange-950/30 rounded-lg p-4 border-l-4 border-orange-500">
                    <p className="text-sm text-gray-300">
                        <strong className="text-orange-400">What it means:</strong> The path y(t) that makes the action S = ∫ L dt stationary must satisfy this differential equation. It's the condition that emerges when you "wiggle" the path and demand the action doesn't change!
                    </p>
                </div>
            </div>
        </div>
    );
};

// Tautochrone (equal time) visualization
const TautochroneViz: React.FC = () => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prev => (prev + 0.02) % (2 * Math.PI));
        }, 40);
        return () => clearInterval(interval);
    }, []);

    const width = 300;
    const height = 250;
    const centerX = 150;
    const centerY = 50;
    const scale = 80;

    // Cycloid curve (tautochrone solution)
    const points: {x: number, y: number}[] = [];
    const numPoints = 100;
    for (let i = 0; i <= numPoints; i++) {
        const theta = (i / numPoints) * Math.PI;
        const x = centerX + scale * (theta - Math.sin(theta)) / Math.PI * 1.2;
        const y = centerY + scale * (1 - Math.cos(theta));
        points.push({x, y});
    }

    // Three particles starting at different positions
    const particle1Progress = Math.max(0, Math.min(1, time / (Math.PI * 0.8)));
    const particle2Progress = Math.max(0, Math.min(1, (time - Math.PI * 0.2) / (Math.PI * 0.8)));
    const particle3Progress = Math.max(0, Math.min(1, (time - Math.PI * 0.4) / (Math.PI * 0.8)));

    const getParticlePos = (progress: number, startFrac: number) => {
        if (progress <= 0) {
            const idx = Math.floor(startFrac * points.length);
            return points[idx];
        }
        const totalPoints = Math.floor((1 - startFrac) * points.length);
        const idx = Math.floor(startFrac * points.length + progress * totalPoints);
        return points[Math.min(idx, points.length - 1)];
    };

    const p1 = getParticlePos(particle1Progress, 0.2);
    const p2 = getParticlePos(particle2Progress, 0.5);
    const p3 = getParticlePos(particle3Progress, 0.7);

    const cycloidPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <rect width={width} height={height} fill="#1f2937" />

            {/* Cycloid curve */}
            <path d={cycloidPath} stroke="#f97316" strokeWidth="3.5" fill="none" />

            {/* Particles at different starting points */}
            {particle1Progress > 0 && (
                <circle cx={p1.x} cy={p1.y} r="7" fill="#10b981" stroke="#fff" strokeWidth="2" />
            )}
            {particle2Progress > 0 && (
                <circle cx={p2.x} cy={p2.y} r="7" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
            )}
            {particle3Progress > 0 && (
                <circle cx={p3.x} cy={p3.y} r="7" fill="#8b5cf6" stroke="#fff" strokeWidth="2" />
            )}

            {/* Starting positions markers */}
            {particle1Progress <= 0 && (
                <circle cx={points[Math.floor(0.2 * points.length)].x} cy={points[Math.floor(0.2 * points.length)].y} r="5" fill="#10b981" opacity="0.5" />
            )}
            {particle2Progress <= 0 && (
                <circle cx={points[Math.floor(0.5 * points.length)].x} cy={points[Math.floor(0.5 * points.length)].y} r="5" fill="#3b82f6" opacity="0.5" />
            )}
            {particle3Progress <= 0 && (
                <circle cx={points[Math.floor(0.7 * points.length)].x} cy={points[Math.floor(0.7 * points.length)].y} r="5" fill="#8b5cf6" opacity="0.5" />
            )}

            {/* End point marker */}
            <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="8" fill="#ef4444" stroke="#fbbf24" strokeWidth="2" />

            {/* Labels */}
            <text x={width/2} y="20" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                Tautochrone: All Arrive Together!
            </text>
            <text x={width/2} y={height - 10} fill="#9ca3af" fontSize="10" textAnchor="middle">
                Different start points → Same arrival time
            </text>
        </svg>
    );
};

// Principle comparison
const PrincipleComparisonViz: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Newton's approach */}
            <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 p-6 rounded-xl border-2 border-blue-500/50">
                <div className="text-center mb-4">
                    <div className="text-4xl mb-2">⚙️</div>
                    <h5 className="text-lg font-bold text-blue-400">Newton's Approach</h5>
                </div>
                <div className="space-y-3 text-sm text-gray-300">
                    <div className="bg-blue-950/30 rounded p-3">
                        <strong className="text-blue-400">Focus:</strong> Forces and vectors
                    </div>
                    <div className="bg-blue-950/30 rounded p-3">
                        <strong className="text-blue-400">Equation:</strong> F = ma (vector)
                    </div>
                    <div className="bg-blue-950/30 rounded p-3">
                        <strong className="text-blue-400">Method:</strong> Analyze forces at each instant
                    </div>
                    <div className="bg-blue-950/30 rounded p-3 text-xs">
                        Complex for constrained systems (like pendulums)
                    </div>
                </div>
            </div>

            {/* Lagrange's approach */}
            <div className="bg-gradient-to-br from-orange-900/40 to-amber-900/40 p-6 rounded-xl border-2 border-orange-500/50">
                <div className="text-center mb-4">
                    <div className="text-4xl mb-2">✨</div>
                    <h5 className="text-lg font-bold text-orange-400">Lagrange's Approach</h5>
                </div>
                <div className="space-y-3 text-sm text-gray-300">
                    <div className="bg-orange-950/30 rounded p-3">
                        <strong className="text-orange-400">Focus:</strong> Energy (scalar)
                    </div>
                    <div className="bg-orange-950/30 rounded p-3">
                        <strong className="text-orange-400">Equation:</strong> L = T - V
                    </div>
                    <div className="bg-orange-950/30 rounded p-3">
                        <strong className="text-orange-400">Method:</strong> Minimize action over entire path
                    </div>
                    <div className="bg-orange-950/30 rounded p-3 text-xs">
                        Elegant for ANY system, constraints built in!
                    </div>
                </div>
            </div>
        </div>
    );
};

const EulerLagrangeSection: React.FC = () => {
    return (
        <section className="space-y-8">
            <div className="border-l-4 border-orange-500 pl-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    The Physics of Paths: Euler-Lagrange Equation
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Leonhard Euler & Joseph-Louis Lagrange • 1755-1788</p>
            </div>

            {/* The Problem Section */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-orange-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🎯</span>
                    The Problem: A New Kind of Optimization
                </h3>

                <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold text-orange-700 dark:text-orange-400">
                        This wasn't about finding a number that minimizes a function. It was about finding an entire <strong>function</strong> that minimizes an <strong>integral</strong>.
                    </p>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-orange-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-3">
                            The Tautochrone Problem
                        </h4>
                        <p className="mb-3">
                            In the 18th century, a "challenge problem" captivated the greatest mathematical minds of Europe:
                        </p>
                        <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r mb-4">
                            <p className="font-semibold text-orange-700 dark:text-orange-400 mb-2">The Challenge:</p>
                            <p className="text-sm">
                                Find the shape of a curve y(x) such that a particle sliding down it under gravity will reach the bottom in the <strong>same amount of time</strong>, no matter where it starts on the curve.
                            </p>
                        </div>
                        <p className="text-sm">
                            This was revolutionary. Previous optimization problems sought numbers (like "x = 5"). This problem sought an entire <em>function</em>—a curve with infinitely many points, each of which had to be "just right."
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-amber-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-3">
                            The Related Brachistochrone Problem
                        </h4>
                        <p className="mb-3">
                            A related famous problem: What's the <em>fastest</em> path between two points under gravity?
                        </p>
                        <ul className="space-y-2 ml-6 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>Not the straight line! (intuition fails)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>The solution is a <strong>cycloid</strong>—the curve traced by a point on a rolling wheel</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>This curve allows the particle to gain speed early, making the overall trip faster</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold">
                            These problems required inventing an entirely new branch of mathematics: the <strong>Calculus of Variations</strong>
                        </p>
                    </div>
                </div>
            </div>

            {/* Visual Examples */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    Visualizing the Challenge Problems
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                    <VisualizationCard
                        title="Brachistochrone: Fastest Descent"
                        description="The cycloid (orange) beats the straight line every time!"
                    >
                        <BrachistochroneViz />
                    </VisualizationCard>

                    <VisualizationCard
                        title="Tautochrone: Equal Time Arrival"
                        description="All particles reach the bottom simultaneously"
                    >
                        <TautochroneViz />
                    </VisualizationCard>
                </div>
            </div>

            {/* Why This Problem Arose */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-purple-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🌟</span>
                    Why Did Lagrange Encounter This Problem?
                </h3>

                <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p>
                        Lagrange didn't "stumble upon" this problem. It was the <strong>final boss</strong> of 18th-century mathematics—a famous, unsolved challenge circulating among the greatest minds of Europe.
                    </p>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-purple-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-3">
                            The Mathematical Community's Challenge
                        </h4>
                        <div className="space-y-3">
                            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-400 p-3 rounded-r">
                                <strong className="text-purple-700 dark:text-purple-400">Euler's Attempts:</strong>
                                <p className="text-sm mt-1">Leonhard Euler had developed a complex, geometric method to attack these problems, but it was cumbersome and difficult to apply generally.</p>
                            </div>
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-400 p-3 rounded-r">
                                <strong className="text-indigo-700 dark:text-indigo-400">The Bernoulli Family:</strong>
                                <p className="text-sm mt-1">Johann Bernoulli had proposed the brachistochrone problem in 1696 as a challenge to "the sharpest mathematicians of all the world."</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold">
                            For a brilliant young mathematician like Lagrange, solving this famous problem was the path to recognition and glory.
                        </p>
                    </div>
                </div>
            </div>

            {/* Lagrange's Intuition */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-green-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">💡</span>
                    Lagrange's Intuition: The "Wiggle" Test
                </h3>

                <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p>
                        At just 19 years old, Lagrange had a brilliant insight: apply the logic of ordinary calculus to this extraordinary problem.
                    </p>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-green-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-green-600 dark:text-green-400 mb-3">
                            From Regular Calculus...
                        </h4>
                        <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-700 dark:text-gray-300 mb-4">
                            "To find the minimum of a function f(x), I find where the derivative is zero: f'(x) = 0. This is the point where, if I 'wiggle' x just slightly, the value f(x) doesn't change (to first order)."
                        </blockquote>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 text-sm">
                            <strong className="text-green-700 dark:text-green-400">The key insight:</strong> At a minimum, tiny changes in the input produce no (first-order) change in the output.
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-emerald-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                            ...To The Calculus of Variations
                        </h4>
                        <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-700 dark:text-gray-300 mb-4">
                            "What if I apply the same logic to functionals? Instead of wiggling a number x, I'll wiggle an entire function y(x). The correct curve must be the one where any infinitesimal 'wiggle' produces no change in the integral I'm trying to minimize."
                        </blockquote>
                        <div className="space-y-3">
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded p-3 text-sm">
                                <strong className="text-emerald-700 dark:text-emerald-400">The revolutionary idea:</strong>
                                <ul className="mt-2 space-y-1 ml-4">
                                    <li>• Start with the true minimizing curve y(x)</li>
                                    <li>• Add a tiny "error" function: y(x) + ε·η(x)</li>
                                    <li>• The integral's value changes: I[y + ε·η]</li>
                                    <li>• Take the derivative with respect to ε</li>
                                    <li>• Set it to zero: dI/dε = 0</li>
                                    <li>• This must be true for ANY choice of η(x)!</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Path Variation Visualization */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    Understanding Path Variations
                </h3>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <VisualizationCard
                        title="The 'Wiggle' Test in Action"
                        description="True path vs. varied path - the action stays stationary"
                    >
                        <PathVariationViz />
                    </VisualizationCard>

                    <VisualizationCard
                        title="Comparing Actions for Different Paths"
                        description="The optimal path has the minimum action integral"
                    >
                        <ActionIntegralViz />
                    </VisualizationCard>
                </div>
            </div>

            {/* The Solution */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-blue-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">⚡</span>
                    How Lagrange Solved It: The Method
                </h3>

                <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                        Lagrange's method was "purely analytical"—it used only algebra and calculus, no geometry.
                    </p>

                    <div className="grid md:grid-cols-1 gap-4">
                        {/* Step 1 */}
                        <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-blue-200 dark:border-gray-600">
                            <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">
                                Step 1: Define the "Wrong" Path
                            </h4>
                            <p className="mb-3">Start with the unknown correct path y(x) and add a small variation:</p>
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 font-mono text-sm text-center">
                                ỹ(x) = y(x) + ε·η(x)
                            </div>
                            <p className="text-sm mt-2">where ε is a tiny number and η(x) is any smooth function that vanishes at the endpoints.</p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-cyan-200 dark:border-gray-600">
                            <h4 className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-3">
                                Step 2: Plug Into the Integral
                            </h4>
                            <p className="mb-3">Substitute this varied path into your integral (for example, the action integral):</p>
                            <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded p-3 font-mono text-sm text-center">
                                I(ε) = ∫ L(y + ε·η, ẏ + ε·η̇, t) dt
                            </div>
                            <p className="text-sm mt-2">Now the integral's value depends on the parameter ε.</p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-indigo-200 dark:border-gray-600">
                            <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                                Step 3: Use Calculus
                            </h4>
                            <p className="mb-3">Take the derivative with respect to ε and set it to zero at ε = 0:</p>
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3 font-mono text-sm text-center">
                                dI/dε |<sub>ε=0</sub> = 0
                            </div>
                            <p className="text-sm mt-2">This is the condition for I to be stationary (minimum, maximum, or saddle point).</p>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-purple-200 dark:border-gray-600">
                            <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-3">
                                Step 4: Integration by Parts
                            </h4>
                            <p className="mb-3">After applying the chain rule and using integration by parts, Lagrange discovered:</p>
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-3 text-sm">
                                For the derivative to be zero for <strong>any</strong> choice of η(x), the true path y(x) must satisfy a specific differential equation.
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold">
                            That universal condition—the equation that every minimizing path must satisfy—is the <strong>Euler-Lagrange Equation</strong>.
                        </p>
                    </div>
                </div>
            </div>

            {/* The Euler-Lagrange Equation */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
                    The Euler-Lagrange Equation
                </h3>
                <EulerLagrangeEquationViz />
            </div>

            {/* The Story */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-rose-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📜</span>
                    The Story: A 19-Year-Old Genius
                </h3>

                <div className="space-y-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-rose-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-rose-600 dark:text-rose-400 mb-3">
                            The Letter (1755)
                        </h4>
                        <p className="mb-3">
                            In 1755, a largely unknown 19-year-old mathematician from Turin named <strong>Joseph-Louis Lagrange</strong> sent a letter to the great Leonhard Euler.
                        </p>
                        <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-4 rounded-r">
                            <p className="text-sm italic">
                                The letter contained a purely analytical method that solved the tautochrone and brachistochrone problems with stunning elegance. Where Euler had used complex geometric reasoning, Lagrange's approach was purely algebraic—clean, general, and powerful.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-pink-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-pink-600 dark:text-pink-400 mb-3">
                            Euler's Gracious Response
                        </h4>
                        <p className="mb-3">
                            Euler immediately recognized the brilliance and superiority of Lagrange's method. In an extraordinary act of generosity:
                        </p>
                        <ul className="space-y-2 ml-6 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold">•</span>
                                <span>Euler <strong>suppressed his own work</strong> on the problem</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold">•</span>
                                <span>He allowed Lagrange to publish first and claim priority</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold">•</span>
                                <span>Euler became a champion of the new method</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-500 font-bold">•</span>
                                <span>In 1766, Euler named this new field the <strong>"Calculus of Variations"</strong></span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold">
                            This collaboration between the established master (Euler) and the young genius (Lagrange) is one of the most beautiful stories in the history of mathematics.
                        </p>
                    </div>
                </div>
            </div>

            {/* Lagrangian Mechanics */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-violet-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🌌</span>
                    The Application: Lagrangian Mechanics
                </h3>

                <div className="space-y-6 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                    <p className="text-lg font-semibold text-violet-700 dark:text-violet-400">
                        Decades later, Lagrange used his own invention to completely rewrite physics.
                    </p>

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-violet-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-violet-600 dark:text-violet-400 mb-3">
                            Mécanique Analytique (1788)
                        </h4>
                        <p className="mb-4">
                            In his 1788 masterpiece, Lagrange proposed a breathtaking philosophical shift: all of classical mechanics could be derived from a single principle.
                        </p>

                        <div className="bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500 p-4 rounded-r mb-4">
                            <p className="font-semibold text-violet-700 dark:text-violet-400 mb-2">
                                The Principle of Stationary Action
                            </p>
                            <p className="text-sm">
                                The path a particle actually takes from point A to point B is the one and only path that makes the <strong>Action</strong> (S) stationary.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-violet-50 dark:bg-violet-900/20 rounded p-3">
                                <div className="font-bold text-violet-600 dark:text-violet-400 text-sm mb-1">Define the Lagrangian</div>
                                <div className="font-mono text-center text-lg">L = T - V</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">Kinetic - Potential Energy</div>
                            </div>
                            <div className="bg-violet-50 dark:bg-violet-900/20 rounded p-3">
                                <div className="font-bold text-violet-600 dark:text-violet-400 text-sm mb-1">Define the Action</div>
                                <div className="font-mono text-center text-lg">S = ∫ L dt</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">Integral of L over time</div>
                            </div>
                        </div>
                    </div>

                    <PrincipleComparisonViz />

                    <div className="bg-white dark:bg-gray-700/50 rounded-xl p-6 border border-purple-200 dark:border-gray-600">
                        <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-3">
                            Why This Was Revolutionary
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500 font-bold text-lg">✓</span>
                                <div>
                                    <strong>Unification:</strong> One principle replaces hundreds of individual force laws
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500 font-bold text-lg">✓</span>
                                <div>
                                    <strong>Scalars, not vectors:</strong> Energy is easier to work with than force
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500 font-bold text-lg">✓</span>
                                <div>
                                    <strong>Constraints built in:</strong> Pendulums, rolling wheels—all handled automatically
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500 font-bold text-lg">✓</span>
                                <div>
                                    <strong>Coordinate freedom:</strong> Use any coordinates—Cartesian, polar, whatever works
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500 font-bold text-lg">✓</span>
                                <div>
                                    <strong>Foundation for modern physics:</strong> Quantum mechanics, general relativity, quantum field theory—all use this framework
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-6">
                        <p className="text-white text-center font-semibold">
                            The Euler-Lagrange equation—born from a geometry problem about sliding particles—became the most fundamental equation in all of physics.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modern Applications */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-8 border border-cyan-100 dark:border-gray-700 shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🚀</span>
                    Modern Applications
                </h3>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-cyan-200 dark:border-gray-600">
                        <h4 className="font-bold text-cyan-600 dark:text-cyan-400 mb-2 text-base">Quantum Mechanics</h4>
                        <p className="text-gray-700 dark:text-gray-300">Feynman's path integral formulation is a direct quantum generalization of the principle of least action</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-teal-200 dark:border-gray-600">
                        <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-2 text-base">General Relativity</h4>
                        <p className="text-gray-700 dark:text-gray-300">Einstein's field equations can be derived from the Einstein-Hilbert action using the Euler-Lagrange equation</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-blue-200 dark:border-gray-600">
                        <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2 text-base">Quantum Field Theory</h4>
                        <p className="text-gray-700 dark:text-gray-300">The Standard Model of particle physics is formulated as a Lagrangian field theory</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-indigo-200 dark:border-gray-600">
                        <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2 text-base">Control Theory</h4>
                        <p className="text-gray-700 dark:text-gray-300">Optimal control problems for rockets, robots, and autonomous vehicles use variational methods</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-purple-200 dark:border-gray-600">
                        <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-2 text-base">Computer Graphics</h4>
                        <p className="text-gray-700 dark:text-gray-300">Animation and physics simulation use Lagrangian mechanics for realistic motion</p>
                    </div>

                    <div className="bg-white dark:bg-gray-700/50 rounded-lg p-5 border border-pink-200 dark:border-gray-600">
                        <h4 className="font-bold text-pink-600 dark:text-pink-400 mb-2 text-base">Economics</h4>
                        <p className="text-gray-700 dark:text-gray-300">Optimal growth theory and dynamic optimization use the calculus of variations</p>
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 text-center">The Journey from Curves to the Universe</h3>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                        <div className="text-3xl mb-2 text-center">📐</div>
                        <h4 className="font-bold mb-2 text-center">1755: A Math Puzzle</h4>
                        <p className="text-center text-white/90">Lagrange solves the tautochrone problem using variations</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                        <div className="text-3xl mb-2 text-center">⚙️</div>
                        <h4 className="font-bold mb-2 text-center">1788: Classical Mechanics</h4>
                        <p className="text-center text-white/90">Mécanique Analytique reformulates all of physics</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                        <div className="text-3xl mb-2 text-center">🌌</div>
                        <h4 className="font-bold mb-2 text-center">Today: Fundamental Physics</h4>
                        <p className="text-center text-white/90">From quantum mechanics to the Standard Model</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EulerLagrangeSection;
