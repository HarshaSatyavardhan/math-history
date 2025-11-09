import React, { useEffect, useRef, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { mean } from '../utils/mathUtils';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const LawOfLargeNumbersSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-indigo-400 pl-4">7. The Guarantees of Stability: Law of Large Numbers (LLN)</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🎲 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventor:</strong> Jacob Bernoulli (1654-1705)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context (1713):</strong> In early 18th century, gamblers knew empirically that relative frequencies stabilized over many games, but there was no mathematical proof. Bernoulli was haunted by a fundamental question: <em className="italic text-indigo-200">Why does randomness become predictable?</em></p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong> If an urn contains an unknown ratio of black to white balls, can one become "morally certain" of the true ratio simply by drawing enough samples? Each individual draw is unpredictable, yet somehow the average stabilizes. <span className="text-indigo-300 font-semibold">How can we prove this mathematically?</span></p>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Without this proof, all of statistics rested on shaky ground. We couldn't justify using samples to estimate populations, insurance companies couldn't price policies, and science couldn't trust experimental data.</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Inventor's Intuition</h3>
                    <p className="mb-4">Bernoulli spent <strong className="text-white">20 years</strong> working on this proof! He called it his <span className="text-yellow-400 font-bold">"Golden Theorem"</span> - the crowning achievement of his 1713 masterpiece <em className="italic">Ars Conjectandi</em> ("The Art of Conjecturing").</p>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100">"Even the stupidest man knows by some instinct of nature that the more observations, the less danger of wandering from one's goal."</p>
                        <p className="mt-4">Bernoulli realized that <strong className="text-white">individual randomness averages out</strong>. Like throwing darts blindfolded - each throw is wild, but thousands of throws cluster around the bullseye (assuming no systematic bias).</p>
                    </div>

                    <p><strong className="text-white">Key Insight:</strong> The variance of the sample mean decreases as <code className="bg-purple-900 px-2 py-1 rounded text-purple-200">σ²/n</code>. As n → ∞, the variance → 0, guaranteeing convergence!</p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Setup</h4>
                            <p className="mb-2">Let X₁, X₂, ..., Xₙ be independent, identically distributed random variables with:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-blue-200">
                                E[Xᵢ] = μ  and  Var(Xᵢ) = σ² &lt; ∞
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. The Sample Average</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-blue-200">
                                X̄ₙ = (1/n) Σᵢ₌₁ⁿ Xᵢ
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Key Property</h4>
                            <p className="mb-2">By independence:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-blue-200">
                                Var(X̄ₙ) = σ²/n  →  0  as  n → ∞
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. The Law (Weak Version)</h4>
                            <p className="mb-2">For any ε &gt; 0:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-blue-200 mb-2">
                                lim(n→∞) P(|X̄ₙ - μ| &gt; ε) = 0
                            </div>
                            <p className="text-sm text-blue-200">The sample average converges to the true mean <strong>in probability</strong>.</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Proof Sketch (via Chebyshev)</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                P(|X̄ₙ - μ| ≥ ε) ≤ Var(X̄ₙ)/ε² = σ²/(nε²) → 0
                            </div>
                        </div>
                    </div>
                </div>

                <LLNVisualization />

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Statistics</h4>
                            <p className="text-sm">Sample means estimate population means. All of inferential statistics depends on the LLN!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🎰 Casinos</h4>
                            <p className="text-sm">The house edge guarantees profit over many games. Individual bets are random, but the casino wins in the long run.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🤖 Machine Learning</h4>
                            <p className="text-sm">Stochastic gradient descent uses mini-batch gradients (sample means) that converge to true gradients.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🔬 Science</h4>
                            <p className="text-sm">Experimental measurements average out random errors. More trials = more accurate results.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Inline visualization component
const LLNVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 400 });
    const [isRunning, setIsRunning] = useState(false);
    const [trials, setTrials] = useState<number[]>([]);
    const [trueMean] = useState(0.5);
    const [speed, setSpeed] = useState(50);
    const animationRef = useRef<number>();

    const runSimulation = () => {
        setIsRunning(true);
        const newTrials: number[] = [];

        const simulate = () => {
            if (newTrials.length < 1000) {
                for (let i = 0; i < Math.floor(speed / 10); i++) {
                    newTrials.push(Math.random() < trueMean ? 1 : 0);
                }
                setTrials([...newTrials]);
                animationRef.current = requestAnimationFrame(simulate);
            } else {
                setIsRunning(false);
            }
        };
        simulate();
    };

    const reset = () => {
        setIsRunning(false);
        setTrials([]);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 400);

        if (trials.length === 0) {
            drawText(ctx, 'Press START to begin simulation', 400, 200, {
                font: '20px sans-serif',
                fillColor: '#a8a8c0',
                align: 'center'
            });
            return;
        }

        // Calculate running average
        const runningAvg: number[] = [];
        let sum = 0;
        trials.forEach((val, i) => {
            sum += val;
            runningAvg.push(sum / (i + 1));
        });

        // Draw grid
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const y = 50 + (i * 30);
            ctx.beginPath();
            ctx.moveTo(50, y);
            ctx.lineTo(750, y);
            ctx.stroke();
        }

        // Draw true mean line
        const meanY = 50 + (1 - trueMean) * 300;
        drawLine(ctx, 50, meanY, 750, meanY, '#4caf50', 2);
        ctx.setLineDash([5, 5]);
        drawLine(ctx, 50, meanY, 750, meanY, '#4caf50', 2);
        ctx.setLineDash([]);

        // Draw running average
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 3;
        ctx.beginPath();

        const maxPoints = Math.min(runningAvg.length, 700);
        for (let i = 0; i < maxPoints; i++) {
            const x = 50 + (i / trials.length) * 700;
            const y = 50 + (1 - runningAvg[i]) * 300;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Labels
        drawText(ctx, 'Sample Average Converging to True Mean', 400, 30, {
            font: 'bold 16px sans-serif',
            fillColor: '#e8e8f0',
            align: 'center'
        });

        drawText(ctx, `Trials: ${trials.length}`, 50, 380, {
            font: '14px sans-serif',
            fillColor: '#a8a8c0'
        });

        drawText(ctx, `Current Avg: ${runningAvg[runningAvg.length - 1]?.toFixed(3) || '0.000'}`, 300, 380, {
            font: '14px sans-serif',
            fillColor: '#ec4899'
        });

        drawText(ctx, `True Mean: ${trueMean.toFixed(3)}`, 550, 380, {
            font: '14px sans-serif',
            fillColor: '#4caf50'
        });

    }, [ctx, trials, trueMean]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Watch Convergence in Action!</h3>
            <p className="text-gray-300 mb-4">Flip a fair coin repeatedly and watch the running average converge to 0.5</p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="flex gap-3 flex-wrap items-center">
                <button
                    onClick={isRunning ? () => setIsRunning(false) : runSimulation}
                    disabled={trials.length >= 1000 && !isRunning}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition disabled:opacity-50"
                >
                    {isRunning ? '⏸ Pause' : '▶ Start'}
                </button>
                <button
                    onClick={reset}
                    className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition"
                >
                    ↺ Reset
                </button>
                <div className="flex items-center gap-2">
                    <label className="text-gray-300">Speed:</label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="w-32"
                    />
                    <span className="text-gray-400 text-sm w-12">{speed}</span>
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Notice how the pink line (running average) gets closer and closer to the green line (true mean of 0.5) as the number of trials increases!
            </p>
        </div>
    );
};

export default LawOfLargeNumbersSection;