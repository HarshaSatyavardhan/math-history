import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawCircle, drawText, drawLine, drawRect } from '../utils/canvasUtils';
import { calculateKLDivergence } from '../utils/mathUtils';

const KLDivergenceSection: React.FC = () => {
    return (
        <section id="kl-divergence" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-teal-400 pl-4">Kullback-Leibler (KL) Divergence</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">📡 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventors:</strong> Solomon Kullback (1907-1994) & Richard Leibler (1914-2003)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context (1951):</strong> In the aftermath of WWII, cryptanalysis and information theory were closely linked. Kullback and Leibler, working on <span className="text-indigo-200 font-semibold">cryptographic problems at the NSA</span>, needed a way to quantify: <strong className="text-white">How different are two probability distributions?</strong></p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">You have a <span className="text-yellow-400 font-bold">true distribution P</span> (e.g., actual letter frequencies in English) and an <span className="text-yellow-400 font-bold">approximation Q</span> (your model's guess). How much information do you lose by using Q instead of P?</p>
                        <p className="text-sm text-indigo-200">Example: If you design an optimal code for Q but the reality is P, how many extra bits per message do you waste?</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Without measuring distribution divergence, you can't quantify model quality, detect anomalies, or optimize machine learning models. KL divergence became THE fundamental measure of difference between probability distributions!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Inventor's Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100">"Measure the <strong className="text-white">information surprise</strong> when the true distribution is P, but you expected Q!"</p>
                        <p className="mt-4">KL divergence is the <span className="text-yellow-400 font-bold">average number of extra bits</span> needed to encode messages from P if you design your code optimally for Q instead of P.</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>D<sub>KL</sub>(P||Q) measures divergence <strong className="text-white">from Q to P</strong></li>
                        <li>It's <strong className="text-white">always ≥ 0</strong>, equals 0 only when P = Q</li>
                        <li>It's <strong className="text-white">asymmetric</strong>: D<sub>KL</sub>(P||Q) ≠ D<sub>KL</sub>(Q||P)</li>
                        <li>Not a true distance metric (violates triangle inequality)</li>
                        <li>Minimizing KL divergence = making Q as close to P as possible</li>
                    </ul>

                    <p className="mt-4">Think of KL divergence as <strong className="text-white">"surprise mismatch"</strong> - how much more surprised you are when reality is P but you expected Q!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. KL Divergence Definition</h4>
                            <p className="mb-2">For discrete distributions P and Q over same space:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                D<sub>KL</sub>(P||Q) = Σ p(x) log(p(x)/q(x))
                                <br />
                                = Σ p(x) [log p(x) - log q(x)]
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Expected log-ratio weighted by true distribution!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Continuous Case</h4>
                            <p className="mb-2">For continuous distributions with densities p(x) and q(x):</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                D<sub>KL</sub>(P||Q) = ∫ p(x) log(p(x)/q(x)) dx
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Alternative Form (Using Cross-Entropy)</h4>
                            <p className="mb-2">Can be written in terms of entropy:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                D<sub>KL</sub>(P||Q) = H(P,Q) - H(P)
                                <br />
                                = Cross-Entropy - Entropy
                            </div>
                            <p className="text-sm text-blue-200 mt-2">The "extra" entropy when using Q instead of optimal P!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Properties</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg text-sm text-blue-200">
                                <p>• D<sub>KL</sub>(P||Q) ≥ 0  (Gibbs' inequality)</p>
                                <p>• D<sub>KL</sub>(P||Q) = 0  ⟺  P = Q</p>
                                <p>• D<sub>KL</sub>(P||Q) ≠ D<sub>KL</sub>(Q||P)  (asymmetric!)</p>
                                <p>• Convex in both arguments</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Example: Gaussian Distributions</h4>
                            <p className="mb-2">For P ~ N(μ₁, σ₁²) and Q ~ N(μ₂, σ₂²):</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                D<sub>KL</sub>(P||Q) = log(σ₂/σ₁) + (σ₁² + (μ₁-μ₂)²)/(2σ₂²) - 1/2
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <KLDivergenceVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🤖 Machine Learning</h4>
                            <p className="text-sm">Variational inference minimizes KL divergence. VAEs, GANs, and probabilistic models all use KL divergence for training!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Neuroscience</h4>
                            <p className="text-sm">The brain's predictive coding theory uses KL divergence: perception minimizes divergence between predictions and sensory input.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🔒 Cryptography</h4>
                            <p className="text-sm">Detecting anomalies in encrypted traffic by measuring divergence from expected patterns (original use case!).</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧬 Bioinformatics</h4>
                            <p className="text-sm">Comparing DNA/protein sequence distributions. Phylogenetic trees use KL divergence to measure species divergence.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive KL Divergence Visualization
const KLDivergenceVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 400 });
    const [pParams, setPParams] = useState({ mean: 50, std: 15 });
    const [qParams, setQParams] = useState({ mean: 60, std: 20 });

    // Normal PDF
    const normalPDF = (x: number, mean: number, std: number): number => {
        return (1 / (std * Math.sqrt(2 * Math.PI))) *
            Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
    };

    // Calculate KL divergence numerically
    const calculateKL = (): number => {
        let kl = 0;
        const samples = 200;
        for (let i = 0; i < samples; i++) {
            const x = i / 2; // 0 to 100
            const p = normalPDF(x, pParams.mean, pParams.std);
            const q = normalPDF(x, qParams.mean, qParams.std);
            if (p > 0.0001 && q > 0.0001) {
                kl += p * Math.log(p / q) * (100 / samples);
            }
        }
        return kl;
    };

    const klDiv = calculateKL();

    // Drawing
    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 400);

        // Draw axes
        drawLine(ctx, 50, 350, 750, 350, 'rgba(255,255,255,0.3)', 1);
        drawLine(ctx, 50, 50, 50, 350, 'rgba(255,255,255,0.3)', 1);

        // Draw grid
        for (let i = 0; i <= 5; i++) {
            const x = 50 + i * 140;
            drawLine(ctx, x, 50, x, 350, 'rgba(255,255,255,0.05)', 1);
        }

        // Draw P distribution (green)
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x <= 100; x += 0.5) {
            const y = normalPDF(x, pParams.mean, pParams.std);
            const px = 50 + x * 7;
            const py = 350 - y * 3000;
            if (x === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Draw Q distribution (red)
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x <= 100; x += 0.5) {
            const y = normalPDF(x, qParams.mean, qParams.std);
            const px = 50 + x * 7;
            const py = 350 - y * 3000;
            if (x === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Labels
        drawText(ctx, 'Distribution Comparison', 400, 30, {
            font: 'bold 18px sans-serif',
            fillColor: '#e8e8f0',
            align: 'center'
        });

        drawText(ctx, 'P (True) - Green', 150, 60, {
            font: '14px sans-serif',
            fillColor: '#10b981'
        });

        drawText(ctx, 'Q (Approx) - Red', 150, 85, {
            font: '14px sans-serif',
            fillColor: '#ef4444'
        });

        drawText(ctx, `D_KL(P||Q) = ${klDiv.toFixed(3)} bits`, 550, 60, {
            font: 'bold 16px sans-serif',
            fillColor: '#fbbf24'
        });

    }, [ctx, pParams, qParams, klDiv]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Measure KL Divergence</h3>
            <p className="text-gray-300 mb-4">
                Adjust the parameters of P (true distribution, green) and Q (approximation, red) and watch the KL divergence change!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg border-2 border-green-500/50">
                    <h4 className="text-green-400 font-semibold mb-3">P (True Distribution)</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-gray-300 text-sm mb-1">Mean: {pParams.mean}</label>
                            <input
                                type="range"
                                min="20"
                                max="80"
                                value={pParams.mean}
                                onChange={(e) => setPParams({ ...pParams, mean: Number(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm mb-1">Std Dev: {pParams.std}</label>
                            <input
                                type="range"
                                min="5"
                                max="30"
                                value={pParams.std}
                                onChange={(e) => setPParams({ ...pParams, std: Number(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg border-2 border-red-500/50">
                    <h4 className="text-red-400 font-semibold mb-3">Q (Approximation)</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-gray-300 text-sm mb-1">Mean: {qParams.mean}</label>
                            <input
                                type="range"
                                min="20"
                                max="80"
                                value={qParams.mean}
                                onChange={(e) => setQParams({ ...qParams, mean: Number(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm mb-1">Std Dev: {qParams.std}</label>
                            <input
                                type="range"
                                min="5"
                                max="30"
                                value={qParams.std}
                                onChange={(e) => setQParams({ ...qParams, std: Number(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 bg-gradient-to-r from-yellow-900/50 to-orange-900/50 p-4 rounded-lg text-center">
                <div className="text-yellow-400 font-mono text-3xl font-bold">{klDiv.toFixed(4)}</div>
                <div className="text-gray-300 text-sm mt-1">KL Divergence (bits)</div>
                <div className="text-gray-400 text-xs mt-2">
                    {klDiv < 0.1 ? 'Very Similar!' : klDiv < 0.5 ? 'Moderate Difference' : 'Significant Divergence'}
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Try making the distributions identical (same mean and std dev) - KL divergence goes to 0! The more different they are, the higher the divergence.
            </p>
        </div>
    );
};

export default KLDivergenceSection;