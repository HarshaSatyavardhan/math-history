import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawCircle, drawText, drawLine } from '../utils/canvasUtils';
import { variance, mean, stdDev } from '../utils/mathUtils';

const VarianceSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-rose-400 pl-4">Measuring Spread: Variance</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">📊 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventor:</strong> R.A. Fisher (1890-1962)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context (1920s):</strong> At the Rothamsted Agricultural Experiment Station in England, Fisher faced a fundamental challenge: <span className="text-indigo-200 font-semibold">messy, real-world data on crop yields</span>. The expected value (mean) only told half the story - it said nothing about consistency or reliability!</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">Did the new fertilizer <em className="italic">cause</em> better yields, or was the observed difference just <strong className="text-yellow-400">random natural variability?</strong></p>
                        <p className="text-sm text-indigo-200">Two fields might have the same average yield, but one could be wildly inconsistent (some plots excellent, others terrible) while the other is reliably consistent. The mean doesn't capture this difference!</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Without measuring variability, scientists couldn't distinguish signal from noise. Medical trials, industrial quality control, and experimental science all require quantifying uncertainty - variance is the foundation!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Inventor's Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 Fisher's "Aha!" Moment:</p>
                        <p className="text-purple-100">"Don't just measure the <em className="italic">center</em> - measure the <strong className="text-white">spread!</strong> The average squared deviation from the mean quantifies inconsistency."</p>
                        <p className="mt-4">Fisher realized: if data points cluster tightly around the mean, variance is low (reliable). If they scatter wildly, variance is high (unreliable). This single number captures <span className="text-yellow-400 font-bold">information about the entire distribution's shape!</span></p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>Variance measures <strong className="text-white">average squared distance from mean</strong></li>
                        <li>Squaring ensures negative deviations don't cancel positive ones</li>
                        <li>Units are squared (variance of heights in cm² - awkward!)</li>
                        <li><strong className="text-white">Standard deviation σ = √variance</strong> returns to original units</li>
                        <li>Fisher invented <strong className="text-white">ANOVA</strong>: partition total variance into signal vs. noise!</li>
                    </ul>

                    <p className="mt-4">Think of two dart players with same average score (mean): one consistently hits the bullseye (low variance), another scatters wildly (high variance). The mean alone doesn't tell you who's better!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Population Variance</h4>
                            <p className="mb-2">For a population with values x₁, x₂, ..., xₙ and mean μ:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                σ² = (1/N) Σᵢ₌₁ᴺ (xᵢ - μ)²
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Average of squared deviations from the mean!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Sample Variance (Bessel's Correction)</h4>
                            <p className="mb-2">For a sample (N-1 denominator to correct bias):</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                s² = (1/(N-1)) Σᵢ₌₁ᴺ (xᵢ - x̄)²
                            </div>
                            <p className="text-sm text-blue-200 mt-2">The N-1 makes it an unbiased estimator of population variance!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Standard Deviation</h4>
                            <p className="mb-2">More interpretable - same units as data:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                σ = √σ²  (or s = √s² for sample)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">68% of normal data falls within ±1σ of mean, 95% within ±2σ!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Alternative Formula (Computational)</h4>
                            <p className="mb-2">Useful for calculation:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                σ² = 𝔼[X²] - (𝔼[X])² = 𝔼[X²] - μ²
                            </div>
                            <p className="text-sm text-blue-200 mt-2">"Mean of squares minus square of mean"</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Properties</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg text-sm text-blue-200">
                                <p>• Var(aX + b) = a²Var(X)  (shifting doesn't change variance)</p>
                                <p>• Var(X + Y) = Var(X) + Var(Y)  (if X, Y independent)</p>
                                <p>• Var(X) ≥ 0  (always non-negative)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <VarianceVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🏭 Quality Control</h4>
                            <p className="text-sm">Manufacturing tolerances, Six Sigma programs - all about minimizing variance! Consistent quality = low variance in measurements.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">💰 Finance</h4>
                            <p className="text-sm">Portfolio variance measures risk. Markowitz's Modern Portfolio Theory (1952) optimizes the risk-return tradeoff using variance!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧪 Experimental Science</h4>
                            <p className="text-sm">ANOVA partitions variance to determine if treatments cause effects. F-test compares between-group vs. within-group variance.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🤖 Machine Learning</h4>
                            <p className="text-sm">Regularization (Ridge, Lasso) controls model variance. Bias-variance tradeoff is fundamental to generalization!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Variance Visualization
const VarianceVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 400 });
    const [dist1Spread, setDist1Spread] = useState(10);
    const [dist2Spread, setDist2Spread] = useState(30);

    // Generate sample data
    const generateData = (spread: number): number[] => {
        const data: number[] = [];
        const numPoints = 100;
        const meanVal = 50;

        for (let i = 0; i < numPoints; i++) {
            // Box-Muller transform for normal distribution
            const u1 = Math.random();
            const u2 = Math.random();
            const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
            data.push(meanVal + z * spread);
        }
        return data;
    };

    const data1 = generateData(dist1Spread);
    const data2 = generateData(dist2Spread);

    const stats1 = {
        mean: mean(data1),
        variance: variance(data1),
        stdDev: stdDev(data1)
    };

    const stats2 = {
        mean: mean(data2),
        variance: variance(data2),
        stdDev: stdDev(data2)
    };

    // Drawing
    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 400);

        // Draw two distributions side by side
        const drawDistribution = (data: any[], x: number, color: string, label: string, stats: any) => {
            // Draw points
            data.forEach((val, idx) => {
                const py = 350 - (idx * 3);
                const px = x + val * 3;
                drawCircle(ctx, px, py, 3, color + '80');
            });

            // Draw mean line
            const meanX = x + stats.mean * 3;
            drawLine(ctx, meanX, 50, meanX, 350, color, 3);
            ctx.setLineDash([5, 5]);
            drawLine(ctx, meanX, 50, meanX, 350, color, 2);
            ctx.setLineDash([]);

            // Draw ±1σ region
            const minusStd = x + (stats.mean - stats.stdDev) * 3;
            const plusStd = x + (stats.mean + stats.stdDev) * 3;

            ctx.fillStyle = color + '20';
            ctx.fillRect(minusStd, 50, (plusStd - minusStd), 300);

            // Labels
            drawText(ctx, label, x + 150, 30, {
                font: 'bold 16px sans-serif',
                fillColor: color,
                align: 'center'
            });

            drawText(ctx, `μ = ${stats.mean.toFixed(1)}`, meanX, 370, {
                font: '12px sans-serif',
                fillColor: color,
                align: 'center'
            });

            drawText(ctx, `σ² = ${stats.variance.toFixed(1)}`, x + 150, 380, {
                font: 'bold 14px sans-serif',
                fillColor: color,
                align: 'center'
            });
        };

        drawDistribution(data1, 20, '#ec4899', 'Low Variance', stats1);
        drawDistribution(data2, 420, '#8b5cf6', 'High Variance', stats2);

    }, [ctx, dist1Spread, dist2Spread]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Compare Variance</h3>
            <p className="text-gray-300 mb-4">
                Adjust the spread of each distribution. Notice how the mean stays the same, but variance changes!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <label className="block text-pink-400 font-semibold mb-2">
                        Low Variance Distribution (Pink)
                    </label>
                    <input
                        type="range"
                        min="5"
                        max="50"
                        value={dist1Spread}
                        onChange={(e) => setDist1Spread(Number(e.target.value))}
                        className="w-full"
                    />
                    <div className="mt-2 grid grid-cols-3 gap-2 text-center text-sm">
                        <div>
                            <div className="text-gray-400">Mean</div>
                            <div className="text-pink-400 font-mono">{stats1.mean.toFixed(1)}</div>
                        </div>
                        <div>
                            <div className="text-gray-400">Variance</div>
                            <div className="text-pink-400 font-mono font-bold">{stats1.variance.toFixed(1)}</div>
                        </div>
                        <div>
                            <div className="text-gray-400">Std Dev</div>
                            <div className="text-pink-400 font-mono">{stats1.stdDev.toFixed(1)}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                    <label className="block text-purple-400 font-semibold mb-2">
                        High Variance Distribution (Purple)
                    </label>
                    <input
                        type="range"
                        min="5"
                        max="50"
                        value={dist2Spread}
                        onChange={(e) => setDist2Spread(Number(e.target.value))}
                        className="w-full"
                    />
                    <div className="mt-2 grid grid-cols-3 gap-2 text-center text-sm">
                        <div>
                            <div className="text-gray-400">Mean</div>
                            <div className="text-purple-400 font-mono">{stats2.mean.toFixed(1)}</div>
                        </div>
                        <div>
                            <div className="text-gray-400">Variance</div>
                            <div className="text-purple-400 font-mono font-bold">{stats2.variance.toFixed(1)}</div>
                        </div>
                        <div>
                            <div className="text-gray-400">Std Dev</div>
                            <div className="text-purple-400 font-mono">{stats2.stdDev.toFixed(1)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Notice: Both distributions have the same mean (~50), but different spreads! The shaded region shows ±1 standard deviation from the mean.
            </p>
        </div>
    );
};

export default VarianceSection;