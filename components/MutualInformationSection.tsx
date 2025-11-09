import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const MutualInformationSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-amber-400 pl-4">Measuring Shared Information: Mutual Information</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🔗 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventor:</strong> Claude Shannon (1948) - term coined by Robert Fano</p>
                    <p className="mb-4"><strong className="text-white">Historical Context (1948):</strong> After defining entropy, Shannon needed a way to measure <span className="text-indigo-200 font-semibold">how much knowing one variable reduces uncertainty about another</span>. This is crucial for communication theory.</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">Given two random variables X and Y, how do we quantify their <span className="text-yellow-400 font-bold">mutual dependence</span>? If X and Y are independent, knowing X tells us nothing about Y. But if they're correlated, knowing X reduces uncertainty about Y!</p>
                        <p className="text-sm text-indigo-200">This is fundamental to channel capacity, data compression, and feature selection in machine learning.</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Mutual information quantifies information flow through noisy channels, enabling optimal communication system design!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 Shannon's Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"Mutual information is the <strong className="text-white">reduction in uncertainty</strong> about X that comes from knowing Y. It's <span className="text-yellow-400 font-bold">symmetric</span>: I(X;Y) = I(Y;X)!"</p>
                        <p className="text-sm text-purple-200">It measures shared information - what X and Y have in common!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">Definition</strong>: I(X;Y) = H(X) - H(X|Y)</li>
                        <li>Also equals: I(X;Y) = H(X) + H(Y) - H(X,Y)</li>
                        <li>Symmetric: I(X;Y) = I(Y;X)</li>
                        <li>Non-negative: I(X;Y) ≥ 0</li>
                        <li>Zero iff X and Y are independent</li>
                        <li>Maximum when X and Y are perfectly correlated</li>
                    </ul>

                    <p className="mt-4">Think: If X and Y are independent, knowing X doesn't help predict Y, so I(X;Y) = 0. If X determines Y, knowing X tells you everything about Y!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Mutual Information (Discrete)</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                I(X;Y) = Σₓ Σᵧ p(x,y) log[p(x,y) / (p(x)p(y))]
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Sum over all joint outcomes</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. As Entropy Difference</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                I(X;Y) = H(X) - H(X|Y) = H(Y) - H(Y|X)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Uncertainty reduction interpretation</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. KL Divergence Form</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                I(X;Y) = D_KL(p(x,y) || p(x)p(y))
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Distance from independence!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Continuous Version</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                I(X;Y) = ∫∫ p(x,y) log[p(x,y) / (p(x)p(y))] dx dy
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Properties</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                • I(X;Y) = 0 ⟺ X ⊥ Y (independence)
                                <br />
                                • I(X;X) = H(X) (self-information)
                                <br />
                                • I(X;Y) ≤ min(H(X), H(Y))
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <MutualInformationVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📡 Communication Theory</h4>
                            <p className="text-sm">Channel capacity = max I(X;Y) over input distributions. Determines maximum reliable transmission rate!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧬 Bioinformatics</h4>
                            <p className="text-sm">Detecting gene regulatory relationships, protein interactions, and evolutionary dependencies between DNA sequences!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Machine Learning</h4>
                            <p className="text-sm">Feature selection: choose features with high I(X;Y) where Y is target. InfoGain in decision trees!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧮 Image Processing</h4>
                            <p className="text-sm">Image registration uses mutual information to align medical images (MRI, CT scans) from different modalities!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Mutual Information Visualization
const MutualInformationVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 500 });
    const [correlation, setCorrelation] = useState(0.7);

    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 500);

        // Draw Venn diagram representation
        const centerX = 400;
        const centerY = 250;
        const radius = 100;
        const overlap = correlation * 50;

        // Circle for H(X)
        ctx.beginPath();
        ctx.arc(centerX - overlap, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Circle for H(Y)
        ctx.beginPath();
        ctx.arc(centerX + overlap, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Labels
        drawText(ctx, 'H(X)', centerX - overlap - 60, centerY, {
            font: 'bold 16px sans-serif',
            fillColor: '#ef4444'
        });

        drawText(ctx, 'H(Y)', centerX + overlap + 60, centerY, {
            font: 'bold 16px sans-serif',
            fillColor: '#3b82f6'
        });

        drawText(ctx, 'I(X;Y)', centerX, centerY, {
            font: 'bold 18px sans-serif',
            fillColor: '#fbbf24',
            align: 'center'
        });

        // Title and values
        drawText(ctx, 'Venn Diagram of Information', 400, 30, {
            font: 'bold 18px sans-serif',
            fillColor: '#e8e8f0',
            align: 'center'
        });

        // Compute approximate mutual information
        const mutualInfo = correlation * correlation * 2; // Simplified for visualization

        drawText(ctx, `Correlation: ${correlation.toFixed(2)}`, 400, 430, {
            font: 'bold 16px monospace',
            fillColor: '#10b981',
            align: 'center'
        });

        drawText(ctx, `I(X;Y) ≈ ${mutualInfo.toFixed(2)} bits`, 400, 460, {
            font: 'bold 16px monospace',
            fillColor: '#fbbf24',
            align: 'center'
        });

        // Legend
        drawText(ctx, 'Overlap area = Shared information', 400, 390, {
            font: '14px sans-serif',
            fillColor: '#9ca3af',
            align: 'center'
        });

    }, [ctx, correlation]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Mutual Information</h3>
            <p className="text-gray-300 mb-4">
                Adjust correlation to see how mutual information (overlap) changes!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="bg-gray-900 p-4 rounded-lg">
                <label className="block text-amber-400 font-semibold mb-2">
                    Correlation: {correlation.toFixed(2)}
                </label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={correlation}
                    onChange={(e) => setCorrelation(Number(e.target.value))}
                    className="w-full"
                />
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Independent variables (correlation = 0) have no overlap, zero mutual information. Perfect correlation = maximum overlap!
            </p>
        </div>
    );
};

export default MutualInformationSection;
