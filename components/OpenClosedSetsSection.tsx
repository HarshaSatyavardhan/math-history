import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const OpenClosedSetsSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">The Logic of Proximity: Open and Closed Sets</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">📍 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Pioneers:</strong> Georg Cantor (1872), René Baire (1899), Felix Hausdorff (1914)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> Late 19th-century mathematicians needed to define <span className="text-indigo-200 font-semibold">continuity and convergence with absolute rigor</span>, but without always requiring the concept of distance (a metric).</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">Cantor studied sets of points on the real line. Weierstrass discovered pathological continuous functions. They needed a <span className="text-yellow-400 font-bold">rigorous foundation</span> for analysis that would work in abstract spaces, not just ℝⁿ!</p>
                        <p className="text-sm text-indigo-200">Hausdorff used "open sets" as the foundation for topological spaces - spaces where we define "nearness" without distance!</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> This abstraction led to general topology, functional analysis, and rigorous foundations for continuity in infinite-dimensional spaces!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"An <strong className="text-white">open set</strong> contains a 'bubble' around each of its points. A <span className="text-yellow-400 font-bold">closed set</span> contains all its boundary points - all limit points!"</p>
                        <p className="text-sm text-purple-200">These concepts define "nearness" and enable rigorous continuity!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">Open set</strong>: Contains ε-ball around each point</li>
                        <li><strong className="text-white">Closed set</strong>: Contains all its limit points</li>
                        <li>Complement of open = closed, complement of closed = open</li>
                        <li>Unions of open sets are open, finite intersections are open</li>
                        <li>Function is continuous iff preimage of open is open!</li>
                    </ul>

                    <p className="mt-4">Think: Open interval (0,1) - you can wiggle around any point and stay inside. Closed [0,1] - includes boundaries!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Open Set (ℝⁿ)</h4>
                            <p className="mb-2">U is open if for each x ∈ U:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ∃ε &gt; 0: B(x, ε) ⊆ U
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Contains an ε-ball around each point!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Closed Set (ℝⁿ)</h4>
                            <p className="mb-2">C is closed if it contains all its limit points:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                If xₙ → x and xₙ ∈ C, then x ∈ C
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Complement of open set!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Topological Space</h4>
                            <p className="mb-2">Abstract definition (Hausdorff): Collection τ of "open sets" satisfying:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                • ∅, X ∈ τ
                                <br />
                                • Arbitrary unions in τ
                                <br />
                                • Finite intersections in τ
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Continuity</h4>
                            <p className="mb-2">f: X → Y is continuous iff:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                f⁻¹(U) is open in X for all open U in Y
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Examples</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                Open: (0,1), ℝⁿ, empty set
                                <br />
                                Closed: [0,1], {'{x}'}, ℝⁿ, empty set
                                <br />
                                Neither: [0,1), (0,1] ∪ {'{2}'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <OpenClosedSetsVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Data Science</h4>
                            <p className="text-sm">Clustering algorithms use open neighborhoods to define "nearby" points. DBSCAN uses ε-balls!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Functional Analysis</h4>
                            <p className="text-sm">Weak and strong topologies on function spaces. Convergence of functions uses open sets!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🔬 Physics</h4>
                            <p className="text-sm">Phase spaces in statistical mechanics. State spaces in quantum mechanics use topological structures!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">💻 Computer Science</h4>
                            <p className="text-sm">Domain theory for programming language semantics. Scott topology for continuous functions!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Open/Closed Sets Visualization
const OpenClosedSetsVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 400 });
    const [setType, setSetType] = useState<'open' | 'closed' | 'neither'>('open');

    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 400);

        const centerX = 400;
        const centerY = 200;

        // Draw number line
        drawLine(ctx, 50, centerY, 750, centerY, 'rgba(255, 255, 255, 0.3)', 2);

        // Draw interval based on type
        const start = 200;
        const end = 600;

        if (setType === 'open') {
            // Open interval (0,1) - hollow endpoints
            drawLine(ctx, start, centerY, end, centerY, '#10b981', 6);

            // Hollow circles at endpoints
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(start, centerY, 8, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(end, centerY, 8, 0, 2 * Math.PI);
            ctx.stroke();

            drawText(ctx, '(a, b) - Open Interval', 400, 50, {
                font: 'bold 20px sans-serif',
                fillColor: '#10b981',
                align: 'center'
            });

            drawText(ctx, 'Excludes endpoints', 400, 300, {
                font: '16px sans-serif',
                fillColor: '#10b981',
                align: 'center'
            });

            drawText(ctx, 'Contains ε-ball around each point', 400, 330, {
                font: '14px sans-serif',
                fillColor: '#9ca3af',
                align: 'center'
            });

        } else if (setType === 'closed') {
            // Closed interval [0,1] - filled endpoints
            drawLine(ctx, start, centerY, end, centerY, '#ef4444', 6);

            // Filled circles at endpoints
            drawCircle(ctx, start, centerY, 8, '#ef4444');
            drawCircle(ctx, end, centerY, 8, '#ef4444');

            drawText(ctx, '[a, b] - Closed Interval', 400, 50, {
                font: 'bold 20px sans-serif',
                fillColor: '#ef4444',
                align: 'center'
            });

            drawText(ctx, 'Includes endpoints (limit points)', 400, 300, {
                font: '16px sans-serif',
                fillColor: '#ef4444',
                align: 'center'
            });

            drawText(ctx, 'Complement is open', 400, 330, {
                font: '14px sans-serif',
                fillColor: '#9ca3af',
                align: 'center'
            });

        } else {
            // Neither - [0,1) half-open
            drawLine(ctx, start, centerY, end, centerY, '#fbbf24', 6);

            // Filled at start, hollow at end
            drawCircle(ctx, start, centerY, 8, '#fbbf24');
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(end, centerY, 8, 0, 2 * Math.PI);
            ctx.stroke();

            drawText(ctx, '[a, b) - Neither Open nor Closed', 400, 50, {
                font: 'bold 20px sans-serif',
                fillColor: '#fbbf24',
                align: 'center'
            });

            drawText(ctx, 'Half-open interval', 400, 300, {
                font: '16px sans-serif',
                fillColor: '#fbbf24',
                align: 'center'
            });

            drawText(ctx, 'Not open (no ball at b), not closed (missing limit point b)', 400, 330, {
                font: '14px sans-serif',
                fillColor: '#9ca3af',
                align: 'center'
            });
        }

    }, [ctx, setType]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Open vs Closed Sets</h3>
            <p className="text-gray-300 mb-4">
                See the difference between open, closed, and neither!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="grid grid-cols-3 gap-4">
                <button
                    onClick={() => setSetType('open')}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                        setType === 'open'
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    Open (a, b)
                </button>

                <button
                    onClick={() => setSetType('closed')}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                        setSetType === 'closed'
                            ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    Closed [a, b]
                </button>

                <button
                    onClick={() => setSetType('neither')}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                        setType === 'neither'
                            ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    Neither [a, b)
                </button>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Open = hollow endpoints. Closed = filled endpoints. These define topology!
            </p>
        </div>
    );
};

export default OpenClosedSetsSection;
