import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const FixedPointTheoremSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-amber-400 pl-4">Guaranteed Solutions: Fixed-Point Theorems</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🎯 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventors:</strong> Henri Poincaré (1880s), L.E.J. Brouwer (1911), Stefan Banach (1922)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> The study of <span className="text-indigo-200 font-semibold">differential equations and the stability of the solar system</span> required topological methods to prove solutions exist. Poincaré and Picard needed guarantees!</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">When does an equation f(x) = x have a solution? For differential equations, existence of fixed points = <span className="text-yellow-400 font-bold">existence of stable orbits</span>. Brouwer proved continuous maps on compact, convex sets MUST have fixed points!</p>
                        <p className="text-sm text-indigo-200">Banach gave iterative method: contraction mappings have unique fixed points!</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Guarantees solutions exist for differential equations, enables iterative algorithms, and proves Nash equilibria in game theory!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"<strong className="text-white">Brouwer</strong>: Stir a cup of coffee - some particle ends up exactly where it started! <span className="text-yellow-400 font-bold">f(x) = x</span> guaranteed for continuous maps on compact convex sets."</p>
                        <p className="text-sm text-purple-200">Banach: Contractions pull points closer - iteration converges to unique fixed point!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">Brouwer</strong>: Continuous f: D → D (compact convex) has fixed point</li>
                        <li><strong className="text-white">Banach</strong>: Contraction f (d(f(x),f(y)) &lt; k·d(x,y)) has unique fixed point</li>
                        <li>Fixed point x satisfies f(x) = x</li>
                        <li>Iteration xₙ₊₁ = f(xₙ) converges for contractions!</li>
                        <li>Used to prove existence of Nash equilibria</li>
                    </ul>

                    <p className="mt-4">Think: Folding a map onto itself - one point stays in same position (fixed point)!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Brouwer Fixed-Point Theorem</h4>
                            <p className="mb-2">If f: D → D continuous, D compact convex:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ∃x ∈ D: f(x) = x
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Example: D = [0,1] or closed unit ball</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Banach Fixed-Point Theorem</h4>
                            <p className="mb-2">f is contraction if ∃k &lt; 1:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                d(f(x), f(y)) ≤ k · d(x, y) for all x, y
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Then unique fixed point exists!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Iteration Convergence</h4>
                            <p className="mb-2">For contractions:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                xₙ₊₁ = f(xₙ) → x* (fixed point)
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Example: Square Root</h4>
                            <p className="mb-2">Find √2: f(x) = (x + 2/x)/2 is contraction:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                Start x₀ = 1, iterate → √2
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Applications</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                • Differential equations (Picard iteration)
                                <br />
                                • Nash equilibria (game theory)
                                <br />
                                • Numerical methods
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <FixedPointVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🎮 Game Theory</h4>
                            <p className="text-sm">Nash equilibria are fixed points of best-response functions. Brouwer's theorem proves they exist!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🔬 Differential Equations</h4>
                            <p className="text-sm">Picard iteration uses Banach fixed-point theorem to prove existence and uniqueness of solutions!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">💰 Economics</h4>
                            <p className="text-sm">Existence of market equilibria, competitive equilibrium prices - all use fixed-point theorems!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧮 Numerical Methods</h4>
                            <p className="text-sm">Newton's method, root finding, iterative solvers - all rely on fixed-point iteration!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FixedPointVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 500 });
    const [iterations, setIterations] = useState(0);

    // Function: f(x) = cos(x) which has a fixed point
    const f = (x: number) => Math.cos(x);

    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 500);

        const marginX = 60;
        const marginY = 50;
        const plotWidth = 700;
        const plotHeight = 400;

        const xToCanvas = (x: number) => marginX + (x / (Math.PI)) * plotWidth;
        const yToCanvas = (y: number) => marginY + plotHeight - ((y + 1) / 2) * plotHeight;

        // Draw axes
        drawLine(ctx, marginX, yToCanvas(0), marginX + plotWidth, yToCanvas(0), 'rgba(255, 255, 255, 0.2)', 2);
        drawLine(ctx, xToCanvas(0), marginY, xToCanvas(0), marginY + plotHeight, 'rgba(255, 255, 255, 0.2)', 2);

        // Draw y = x line
        ctx.strokeStyle = '#6b7280';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(xToCanvas(0), yToCanvas(0));
        ctx.lineTo(xToCanvas(Math.PI), yToCanvas(Math.PI));
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw f(x) = cos(x)
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x <= Math.PI; x += 0.01) {
            const y = f(x);
            const canvasX = xToCanvas(x);
            const canvasY = yToCanvas(y);
            if (x === 0) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        ctx.stroke();

        // Fixed-point iteration
        if (iterations > 0) {
            let x = 1; // Starting point
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;

            for (let i = 0; i < Math.min(iterations, 10); i++) {
                const y = f(x);

                // Draw vertical line to function
                drawLine(ctx, xToCanvas(x), yToCanvas(x), xToCanvas(x), yToCanvas(y), '#10b981', 2);

                // Draw horizontal line to y=x
                drawLine(ctx, xToCanvas(x), yToCanvas(y), xToCanvas(y), yToCanvas(y), '#10b981', 2);

                drawCircle(ctx, xToCanvas(x), yToCanvas(y), 4, '#fbbf24');

                x = y; // Next iteration
            }

            // Mark fixed point
            const fixedPoint = 0.739; // Approximate fixed point of cos(x)
            drawCircle(ctx, xToCanvas(fixedPoint), yToCanvas(fixedPoint), 8, '#ef4444');

            drawText(ctx, 'Fixed Point', xToCanvas(fixedPoint) + 20, yToCanvas(fixedPoint), {
                font: '14px sans-serif',
                fillColor: '#ef4444'
            });
        }

        // Labels
        drawText(ctx, 'f(x) = cos(x)', 400, 30, {
            font: 'bold 18px sans-serif',
            fillColor: '#a78bfa',
            align: 'center'
        });

        drawText(ctx, 'y = x', 650, 100, {
            font: '14px sans-serif',
            fillColor: '#6b7280'
        });

    }, [ctx, iterations]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Fixed-Point Iteration</h3>
            <p className="text-gray-300 mb-4">
                See how iteration xₙ₊₁ = cos(xₙ) converges to the fixed point!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="bg-gray-900 p-4 rounded-lg">
                <label className="block text-amber-400 font-semibold mb-2">
                    Iterations: {iterations}
                </label>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={iterations}
                    onChange={(e) => setIterations(Number(e.target.value))}
                    className="w-full"
                />
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Watch the cobweb diagram spiral into the fixed point where f(x) = x (intersection with y=x line)!
            </p>
        </div>
    );
};

export default FixedPointTheoremSection;
