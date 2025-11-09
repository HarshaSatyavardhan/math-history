import React, { useEffect, useRef, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const CentralLimitTheoremSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-pink-400 pl-4">8. The Universality of the Bell Curve: Central Limit Theorem (CLT)</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🎲 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventors:</strong> Abraham de Moivre (1667-1754), Pierre-Simon Laplace (1749-1827), Carl Friedrich Gauss (1777-1855)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context (1733-1812):</strong> In 1733, de Moivre was working as a consultant for wealthy gamblers in London coffee houses. They needed to calculate binomial probabilities for large numbers of coin flips (e.g., "What's the chance of getting exactly 5,500 heads in 10,000 flips?"). Computing this directly with factorials was <em className="italic text-indigo-200">computationally impossible</em> in the 18th century!</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong> Why does the normal (Gaussian) "bell curve" distribution appear <span className="text-indigo-300 font-semibold">everywhere in nature</span> - heights, test scores, measurement errors, stellar positions - even when the underlying processes are clearly NOT normal? There seemed to be a deep universal principle at work, but no one could prove it mathematically.</p>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Without understanding why the normal distribution is universal, all of statistical inference was on shaky ground. We couldn't justify using normal approximations, confidence intervals, or hypothesis tests. The bell curve's ubiquity was an empirical observation with no theoretical foundation.</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Inventor's Intuition</h3>
                    <p className="mb-4">De Moivre made the initial discovery in 1733 in his book <em className="italic text-purple-200">The Doctrine of Chances</em>, finding a beautiful approximation for binomial probabilities. But it was <strong className="text-white">Laplace</strong> who, in 1810, proved the full generality of what we now call the Central Limit Theorem.</p>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100">"The sum of many small independent effects, <strong className="text-white">regardless of their individual distributions</strong>, will approximately follow a normal distribution."</p>
                        <p className="mt-4">Think of measuring someone's height: it's influenced by <strong className="text-white">thousands</strong> of genetic and environmental factors. Each factor contributes a small random amount. The CLT says that when you add up many independent random effects, the total converges to a normal distribution - <span className="text-yellow-400">no matter what distribution each individual effect follows!</span></p>
                    </div>

                    <p><strong className="text-white">Key Insight:</strong> This explains why:</p>
                    <ul className="list-disc list-inside mt-2 space-y-2 text-purple-100">
                        <li>Heights follow a bell curve (sum of many genetic factors)</li>
                        <li>Test scores are normally distributed (sum of knowledge across topics)</li>
                        <li>Measurement errors are Gaussian (sum of many small error sources)</li>
                        <li>Stock market returns (over time periods) approximate normality</li>
                    </ul>

                    <p className="mt-4">The normal distribution isn't fundamental - <strong className="text-white">aggregation is</strong>!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Setup: IID Random Variables</h4>
                            <p className="mb-2">Let X₁, X₂, ..., Xₙ be independent, identically distributed random variables with:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-blue-200">
                                𝔼[Xᵢ] = μ  and  Var(Xᵢ) = σ² &lt; ∞
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Finite variance is crucial - the distribution needs bounded spread!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Form the Sample Mean</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-blue-200">
                                X̄ₙ = (1/n) Σᵢ₌₁ⁿ Xᵢ
                            </div>
                            <p className="text-sm text-blue-200 mt-2">By linearity: 𝔼[X̄ₙ] = μ, Var(X̄ₙ) = σ²/n</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Standardize to Prevent Collapse</h4>
                            <p className="mb-2">To get a distribution that doesn't collapse to a point as n → ∞, we standardize:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-blue-200">
                                Zₙ = (X̄ₙ - μ) / (σ/√n) = Σᵢ₌₁ⁿ (Xᵢ - μ) / (σ√n)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Now 𝔼[Zₙ] = 0, Var(Zₙ) = 1 for all n.</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. The Limit (The Theorem!)</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-blue-200 mb-2">
                                Zₙ → N(0, 1)  as  n → ∞  (in distribution)
                            </div>
                            <p className="text-sm text-blue-200">Convergence in distribution: for any x,</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200 mt-2">
                                lim(n→∞) P(Zₙ ≤ x) = Φ(x) = (1/√2π) ∫₋∞ˣ e⁻ᵗ²/² dt
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Practical Form</h4>
                            <p className="mb-2">For large n, the sample mean is approximately:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-blue-200">
                                X̄ₙ ~ N(μ, σ²/n)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">This is why n ≥ 30 is the "magic number" in statistics!</p>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <GaltonBoardVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Statistical Inference</h4>
                            <p className="text-sm">Confidence intervals and hypothesis tests assume sample means are normally distributed (by CLT). This is the foundation of all inferential statistics!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🏭 Quality Control</h4>
                            <p className="text-sm">Control charts monitor manufacturing processes. CLT ensures sample means follow normal distribution, allowing detection of process shifts.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">💰 Finance</h4>
                            <p className="text-sm">Portfolio theory and option pricing (Black-Scholes model) rely on CLT. Stock returns over time periods approach normal distribution.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🤖 Machine Learning</h4>
                            <p className="text-sm">Gradient descent uses mini-batch gradients (sample means). CLT ensures these estimates are approximately normal, enabling convergence guarantees.</p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-950/50 rounded-lg">
                        <h4 className="font-semibold text-white mb-2">🔗 Connection to Law of Large Numbers</h4>
                        <p className="text-sm">LLN says <strong className="text-white">WHERE</strong> convergence occurs (to μ). CLT says <strong className="text-white">HOW</strong> it happens (normally distributed around μ with variance σ²/n). They're a one-two punch!</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Inline Galton Board Visualization
const GaltonBoardVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 600 });
    const [balls, setBalls] = useState<Ball[]>([]);
    const [binCounts, setBinCounts] = useState<number[]>(new Array(13).fill(0));
    const [ballsDropped, setBallsDropped] = useState(0);
    const animationRef = useRef<number>();

    const LEVELS = 12;
    const BINS = LEVELS + 1;
    const LEVEL_HEIGHT = 40;
    const PEG_SPACING = 30;

    interface Ball {
        x: number;
        y: number;
        level: number;
        bin: number;
        vx: number;
        vy: number;
        settled: boolean;
    }

    const dropBall = () => {
        const newBall: Ball = {
            x: 400,
            y: 50,
            level: 0,
            bin: LEVELS / 2,
            vx: 0,
            vy: 0,
            settled: false
        };
        setBalls(prev => [...prev, newBall]);
        setBallsDropped(prev => prev + 1);
    };

    const dropMultiple = (count: number) => {
        for (let i = 0; i < count; i++) {
            setTimeout(() => dropBall(), i * 100);
        }
    };

    const reset = () => {
        setBalls([]);
        setBinCounts(new Array(BINS).fill(0));
        setBallsDropped(0);
    };

    // Animation loop
    useEffect(() => {
        const animate = () => {
            setBalls(prevBalls => {
                const newBinCounts = [...binCounts];

                const updatedBalls = prevBalls.map(ball => {
                    if (ball.settled) return ball;

                    // Apply gravity
                    const newBall = { ...ball };
                    newBall.vy += 0.5;
                    newBall.x += newBall.vx;
                    newBall.y += newBall.vy;

                    // Check if reached next level
                    const targetY = 100 + newBall.level * LEVEL_HEIGHT;
                    if (newBall.y >= targetY && newBall.level < LEVELS) {
                        // Bounce left or right randomly
                        newBall.level++;
                        newBall.bin += Math.random() < 0.5 ? -0.5 : 0.5;
                        newBall.x = 400 + (newBall.bin - LEVELS / 2) * PEG_SPACING;
                        newBall.y = targetY;
                        newBall.vx = (Math.random() - 0.5) * 2;
                        newBall.vy = 0;
                    }

                    // Settle in bin
                    if (newBall.level === LEVELS && !newBall.settled) {
                        newBall.settled = true;
                        const binIndex = Math.round(newBall.bin);
                        if (binIndex >= 0 && binIndex < BINS) {
                            newBinCounts[binIndex]++;
                        }
                    }

                    return newBall;
                });

                setBinCounts(newBinCounts);
                return updatedBalls;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Drawing
    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 600);

        // Draw pegs
        ctx.fillStyle = '#667eea';
        for (let level = 0; level < LEVELS; level++) {
            const y = 100 + level * LEVEL_HEIGHT;
            const numPegs = level + 1;
            const startX = 400 - ((numPegs - 1) * PEG_SPACING) / 2;

            for (let peg = 0; peg < numPegs; peg++) {
                const x = startX + peg * PEG_SPACING;
                drawCircle(ctx, x, y, 3, '#667eea');
            }
        }

        // Draw bins
        const binY = 100 + LEVELS * LEVEL_HEIGHT + 20;
        const binWidth = 25;
        const maxCount = Math.max(...binCounts, 1);

        for (let i = 0; i < BINS; i++) {
            const x = 400 + (i - BINS / 2) * binWidth;
            const height = (binCounts[i] / maxCount) * 150;

            // Gradient for bins
            const gradient = ctx.createLinearGradient(x, binY - height, x, binY);
            gradient.addColorStop(0, '#4caf50');
            gradient.addColorStop(1, '#667eea');
            ctx.fillStyle = gradient;
            ctx.fillRect(x - binWidth / 2, binY - height, binWidth - 2, height);

            // Count label
            if (binCounts[i] > 0) {
                drawText(ctx, String(binCounts[i]), x, binY - height - 5, {
                    font: '10px sans-serif',
                    fillColor: '#e8e8f0',
                    align: 'center'
                });
            }
        }

        // Draw balls
        balls.forEach(ball => {
            drawCircle(ctx, ball.x, ball.y, 5, '#ec4899');
        });

        // Title
        drawText(ctx, 'Galton Board (Bean Machine)', 400, 30, {
            font: 'bold 16px sans-serif',
            fillColor: '#e8e8f0',
            align: 'center'
        });

        // Info
        drawText(ctx, `Balls: ${ballsDropped}`, 50, 30, {
            font: '14px sans-serif',
            fillColor: '#a8a8c0'
        });

    }, [ctx, balls, binCounts, ballsDropped]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: The Galton Board</h3>
            <p className="text-gray-300 mb-4">
                Watch balls randomly bounce left or right at each peg. Each ball makes 12 random ±1 decisions.
                The final position is the sum of these random choices - and it forms a <strong className="text-white">perfect bell curve!</strong>
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="flex gap-3 flex-wrap items-center">
                <button
                    onClick={dropBall}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition"
                >
                    Drop 1 Ball
                </button>
                <button
                    onClick={() => dropMultiple(10)}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
                >
                    Drop 10 Balls
                </button>
                <button
                    onClick={() => dropMultiple(100)}
                    className="px-6 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition"
                >
                    Drop 100 Balls
                </button>
                <button
                    onClick={reset}
                    className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition"
                >
                    ↺ Reset
                </button>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-gray-900 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-400">Balls Dropped</div>
                    <div className="text-2xl font-bold text-pink-400">{ballsDropped}</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-400">Levels</div>
                    <div className="text-2xl font-bold text-purple-400">{LEVELS}</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg text-center">
                    <div className="text-sm text-gray-400">Bins</div>
                    <div className="text-2xl font-bold text-indigo-400">{BINS}</div>
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 This is a physical demonstration of the CLT! Each ball undergoes 12 independent random events (bouncing left or right with equal probability).
                The sum of these random ±1 steps creates a binomial distribution, which the CLT says approximates a normal distribution - exactly what we see!
            </p>
        </div>
    );
};

export default CentralLimitTheoremSection;