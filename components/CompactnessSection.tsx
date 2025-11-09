import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const CompactnessSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-rose-400 pl-4">Topological Finiteness: Compactness</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🎯 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventor:</strong> Maurice Fréchet (1906), Émile Borel, Henri Lebesgue</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> Mathematicians needed to generalize useful properties of <span className="text-indigo-200 font-semibold">closed and bounded sets</span> (like [0,1]) from ℝ to abstract spaces, especially function spaces.</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">In ℝ, closed and bounded sets are "compact" - sequences have convergent subsequences. But in infinite-dimensional spaces, this breaks down! We need a <span className="text-yellow-400 font-bold">topological characterization</span> that works everywhere.</p>
                        <p className="text-sm text-indigo-200">Crucial for proving existence of minima in optimization!</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> The Extreme Value Theorem guarantees continuous functions on compact sets achieve min/max. Foundation of optimization!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"Compactness is the <strong className="text-white">topological generalization of finiteness</strong>. In a compact space, sequences can't escape to infinity or to holes - they must have <span className="text-yellow-400 font-bold">limit points</span> inside!"</p>
                        <p className="text-sm text-purple-200">It's why optimization minima exist!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">Heine-Borel</strong>: In ℝⁿ, compact ⟺ closed and bounded</li>
                        <li>Every open cover has a finite subcover</li>
                        <li>Every sequence has a convergent subsequence (sequential compactness)</li>
                        <li>Continuous image of compact is compact</li>
                        <li>Continuous function on compact achieves min/max!</li>
                    </ul>

                    <p className="mt-4">Think: [0,1] is compact - bounded (can't escape) and closed (has all limit points). (0,1) isn't - sequences can escape through endpoints!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Definition (Open Cover)</h4>
                            <p className="mb-2">K is compact if every open cover has a finite subcover:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                If K ⊆ ⋃ᵢUᵢ (Uᵢ open), then K ⊆ U₁ ∪ ... ∪ Uₙ (finite!)
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Sequential Compactness</h4>
                            <p className="mb-2">Equivalent definition (in metric spaces):</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                Every sequence has a convergent subsequence
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Heine-Borel Theorem</h4>
                            <p className="mb-2">In ℝⁿ:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                K compact ⟺ K closed and bounded
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Extreme Value Theorem</h4>
                            <p className="mb-2">If f: K → ℝ continuous and K compact:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ∃x_min, x_max ∈ K: f(x_min) ≤ f(x) ≤ f(x_max) ∀x
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Min and max exist!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Examples</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                Compact: [0,1], [a,b], closed ball in ℝⁿ
                                <br />
                                Not compact: (0,1), ℝ, open ball
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <CompactnessVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📈 Optimization</h4>
                            <p className="text-sm">Extreme Value Theorem guarantees global minimum exists on compact feasible region. Foundation of constrained optimization!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Machine Learning</h4>
                            <p className="text-sm">Parameter spaces in deep learning. Compactness ensures convergence of training algorithms!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🎮 Control Theory</h4>
                            <p className="text-sm">State spaces in dynamical systems. Compact attractors guarantee bounded trajectories!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">💰 Economics</h4>
                            <p className="text-sm">Existence of Nash equilibria. Compact strategy spaces + continuity → equilibrium exists!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Compactness Visualization
const CompactnessVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 400 });
    const [isCompact, setIsCompact] = useState(true);

    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 400);

        if (isCompact) {
            // Draw [0,1] - compact
            const start = 200;
            const end = 600;
            const y = 200;

            drawLine(ctx, start, y, end, y, '#10b981', 8);
            drawCircle(ctx, start, y, 10, '#10b981');
            drawCircle(ctx, end, y, 10, '#10b981');

            // Draw some points/sequences
            for (let i = 0; i < 8; i++) {
                const x = start + (end - start) * (i / 7);
                drawCircle(ctx, x, y - 40, 5, '#14b8a6');
            }

            drawText(ctx, '[0, 1] - COMPACT', 400, 50, {
                font: 'bold 20px sans-serif',
                fillColor: '#10b981',
                align: 'center'
            });

            drawText(ctx, '✓ Closed and bounded', 400, 280, {
                font: '16px sans-serif',
                fillColor: '#10b981',
                align: 'center'
            });

            drawText(ctx, 'Every sequence has convergent subsequence', 400, 310, {
                font: '14px sans-serif',
                fillColor: '#9ca3af',
                align: 'center'
            });

            drawText(ctx, 'Continuous functions achieve min/max', 400, 340, {
                font: '14px sans-serif',
                fillColor: '#9ca3af',
                align: 'center'
            });

        } else {
            // Draw (0,1) - not compact
            const start = 200;
            const end = 600;
            const y = 200;

            drawLine(ctx, start, y, end, y, '#ef4444', 8);

            // Hollow endpoints
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(start, y, 10, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(end, y, 10, 0, 2 * Math.PI);
            ctx.stroke();

            // Sequence approaching 0 (escapes!)
            for (let i = 1; i <= 8; i++) {
                const x = start + 50 * (1 / i);
                drawCircle(ctx, x, y - 40, 5, '#f87171');

                // Arrow showing escape
                if (i === 8) {
                    drawLine(ctx, x, y - 40, start - 30, y - 40, '#fbbf24', 3);
                    drawText(ctx, 'Escapes!', start - 80, y - 35, {
                        font: 'bold 14px sans-serif',
                        fillColor: '#fbbf24'
                    });
                }
            }

            drawText(ctx, '(0, 1) - NOT COMPACT', 400, 50, {
                font: 'bold 20px sans-serif',
                fillColor: '#ef4444',
                align: 'center'
            });

            drawText(ctx, '✗ Open (not closed)', 400, 280, {
                font: '16px sans-serif',
                fillColor: '#ef4444',
                align: 'center'
            });

            drawText(ctx, 'Sequence 1/n → 0, but 0 ∉ (0,1)', 400, 310, {
                font: '14px sans-serif',
                fillColor: '#9ca3af',
                align: 'center'
            });

            drawText(ctx, 'f(x)=x has no minimum on (0,1)', 400, 340, {
                font: '14px sans-serif',
                fillColor: '#9ca3af',
                align: 'center'
            });
        }

    }, [ctx, isCompact]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Compactness</h3>
            <p className="text-gray-300 mb-4">
                Compare compact [0,1] vs non-compact (0,1)!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setIsCompact(true)}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                        isCompact
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    [0, 1] Compact ✓
                </button>

                <button
                    onClick={() => setIsCompact(false)}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                        !isCompact
                            ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    (0, 1) Not Compact ✗
                </button>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Compactness prevents "escape" - guarantees convergence and existence of optima!
            </p>
        </div>
    );
};

export default CompactnessSection;
