import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const ConnectednessSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-emerald-400 pl-4">Spaces in One Piece: Connectedness</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🔗 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Pioneers:</strong> Johann Listing (1847), Georg Cantor (1870s)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> Mathematicians needed a rigorous way to formalize the intuitive notion of <span className="text-indigo-200 font-semibold">"being in one piece"</span> without gaps or holes separating parts.</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">The real line ℝ is "connected" - you can't split it into two separate pieces. But ℝ \ {'{0}'} (excluding zero) is disconnected - two separate parts! How do we <span className="text-yellow-400 font-bold">formalize this topologically</span>?</p>
                        <p className="text-sm text-indigo-200">This is crucial for the Intermediate Value Theorem - continuous functions on connected sets can't "jump"!</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Connectedness guarantees smooth traversal in optimization, enables IVT, and ensures gradient descent can work without sudden gaps!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"A space is <strong className="text-white">connected</strong> if it cannot be split into two disjoint, non-empty open sets. It's <span className="text-yellow-400 font-bold">all in one piece</span> with no gaps!"</p>
                        <p className="text-sm text-purple-200">If it can be split, it's disconnected!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">Connected</strong>: ℝ, [0,1], sphere, torus</li>
                        <li><strong className="text-white">Disconnected</strong>: {'{0,1}'}, ℝ \ {'{0}'}, two circles</li>
                        <li>Path-connected → connected (converse false!)</li>
                        <li>Continuous image of connected is connected</li>
                        <li>Intermediate Value Theorem uses connectedness!</li>
                    </ul>

                    <p className="mt-4">Think: A rope is connected. Cut it in half - now disconnected into two pieces!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Definition</h4>
                            <p className="mb-2">X is connected if it CANNOT be written as:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                X = A ∪ B where A, B open, disjoint, non-empty
                            </div>
                            <p className="text-sm text-blue-200 mt-2">No such split exists!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Path-Connected</h4>
                            <p className="mb-2">Stronger notion: any two points connected by continuous path:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ∀x, y ∈ X, ∃γ: [0,1] → X continuous with γ(0)=x, γ(1)=y
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Intermediate Value Theorem</h4>
                            <p className="mb-2">If f: [a,b] → ℝ continuous, f(a) &lt; 0 &lt; f(b):</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ∃c ∈ (a,b): f(c) = 0
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Uses connectedness of [a,b]!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Components</h4>
                            <p className="mb-2">Maximal connected subsets:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                Disconnected space = union of connected components
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Examples</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                Connected: ℝ, [a,b], ℝⁿ, sphere Sⁿ
                                <br />
                                Disconnected: {'{0,1}'}, (-∞,0) ∪ (0,∞)
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <ConnectednessVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📈 Optimization</h4>
                            <p className="text-sm">Connected feasible regions allow gradient descent to traverse smoothly. Disconnected regions = separate local optima!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧮 Root Finding</h4>
                            <p className="text-sm">IVT guarantees roots exist! Bisection method relies on connectedness to find zeros of continuous functions.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🎨 Image Processing</h4>
                            <p className="text-sm">Connected component labeling identifies separate objects in images. Each "blob" is a connected component!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🗺️ Graph Theory</h4>
                            <p className="text-sm">Connected graphs have path between any two vertices. Network connectivity analysis!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ConnectednessVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 400 });
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 400);

        if (isConnected) {
            // Draw connected interval [0,1]
            const y = 200;
            drawLine(ctx, 200, y, 600, y, '#10b981', 8);
            drawCircle(ctx, 200, y, 10, '#10b981');
            drawCircle(ctx, 600, y, 10, '#10b981');

            drawText(ctx, '[0, 1] - CONNECTED', 400, 50, {
                font: 'bold 20px sans-serif',
                fillColor: '#10b981',
                align: 'center'
            });

            drawText(ctx, 'One piece - cannot be split!', 400, 300, {
                font: '16px sans-serif',
                fillColor: '#10b981',
                align: 'center'
            });

            drawText(ctx, 'IVT works: continuous functions can\'t jump', 400, 330, {
                font: '14px sans-serif',
                fillColor: '#9ca3af',
                align: 'center'
            });

        } else {
            // Draw disconnected set {0} ∪ {1}
            const y = 200;
            drawCircle(ctx, 250, y, 12, '#ef4444');
            drawCircle(ctx, 550, y, 12, '#ef4444');

            // Gap indicator
            drawLine(ctx, 280, y, 520, y, '#fbbf24', 3);
            ctx.setLineDash([10, 10]);
            drawLine(ctx, 280, y, 520, y, '#6b7280', 2);
            ctx.setLineDash([]);

            drawText(ctx, '{0} ∪ {1} - DISCONNECTED', 400, 50, {
                font: 'bold 20px sans-serif',
                fillColor: '#ef4444',
                align: 'center'
            });

            drawText(ctx, 'Two separate pieces!', 400, 300, {
                font: '16px sans-serif',
                fillColor: '#ef4444',
                align: 'center'
            });

            drawText(ctx, 'Gap between components', 400, y + 50, {
                font: '14px sans-serif',
                fillColor: '#fbbf24'
            });
        }

    }, [ctx, isConnected]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Connectedness</h3>
            <p className="text-gray-300 mb-4">
                Compare connected vs disconnected spaces!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setIsConnected(true)}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                        isConnected
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    [0, 1] Connected ✓
                </button>

                <button
                    onClick={() => setIsConnected(false)}
                    className={`px-6 py-3 rounded-lg font-semibold transition ${
                        !isConnected
                            ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    {'{0,1}'} Disconnected ✗
                </button>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Connected = all in one piece. Disconnected = separate components with gaps!
            </p>
        </div>
    );
};

export default ConnectednessSection;
