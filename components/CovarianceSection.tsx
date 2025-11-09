import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawCircle, drawText, drawLine } from '../utils/canvasUtils';
import { covariance, correlation } from '../utils/mathUtils';

const CovarianceSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Measuring Relationships: Covariance & Correlation</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">👨‍👦 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventor:</strong> Francis Galton (1822-1911) - Charles Darwin's cousin</p>
                    <p className="mb-4"><strong className="text-white">Historical Context (1880s):</strong> Galton was obsessed with <span className="text-indigo-200 font-semibold">heredity and eugenics</span>. He meticulously measured physical traits of parents and children, seeking mathematical patterns in inheritance. But how could he quantify <strong className="text-white">the relationship between two variables?</strong></p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">Do taller fathers have taller sons? Do intelligent parents have intelligent children? Galton needed <span className="text-yellow-400 font-bold">a single number</span> to measure how two traits "vary together."</p>
                        <p className="text-sm text-indigo-200">He collected data on thousands of families, measuring heights, intelligence scores, and other traits. But the data was messy - how to extract a clean signal about the strength and direction of relationships?</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Without measuring co-variation, science couldn't quantify cause-and-effect relationships, predict outcomes, or understand dependencies. This laid the foundation for all of modern statistics!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Inventor's Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 Galton's "Aha!" Moment:</p>
                        <p className="text-purple-100">"When X is above its mean, is Y also above its mean? Multiply the deviations - if <strong className="text-white">both are high or both are low</strong>, the product is positive. If they move oppositely, it's negative!"</p>
                        <p className="mt-4">Galton called it <span className="text-yellow-400 font-bold">"co-relation"</span> (now "correlation"). He discovered that child height regresses toward the mean - extremely tall parents have tall children, but <em className="italic">less extreme</em> than themselves!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">Covariance</strong> measures direction of linear relationship (positive/negative)</li>
                        <li><strong className="text-white">Correlation</strong> normalizes covariance to [-1, 1] scale</li>
                        <li>r = +1: perfect positive linear relationship</li>
                        <li>r = -1: perfect negative linear relationship</li>
                        <li>r = 0: no linear relationship (but may still be related non-linearly!)</li>
                    </ul>

                    <p className="mt-4">Think: Ice cream sales and drowning deaths are correlated (both high in summer), but ice cream doesn't <em className="italic">cause</em> drowning. <strong className="text-white">Correlation ≠ Causation!</strong></p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Covariance Definition</h4>
                            <p className="mb-2">For variables X and Y with means μₓ and μᵧ:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                Cov(X,Y) = 𝔼[(X - μₓ)(Y - μᵧ)]
                                <br />
                                = (1/N) Σᵢ₌₁ᴺ (xᵢ - μₓ)(yᵢ - μᵧ)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Average product of deviations from means!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Pearson Correlation Coefficient</h4>
                            <p className="mb-2">Normalize by standard deviations to get scale-free measure:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ρ = Cov(X,Y) / (σₓ σᵧ)
                                <br />
                                Always: -1 ≤ ρ ≤ 1
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Named after Karl Pearson who formalized it!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Alternative Formula</h4>
                            <p className="mb-2">Computational form:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                Cov(X,Y) = 𝔼[XY] - 𝔼[X]𝔼[Y]
                            </div>
                            <p className="text-sm text-blue-200 mt-2">"Expected product minus product of expectations"</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Properties</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg text-sm text-blue-200">
                                <p>• Cov(X,X) = Var(X)  (covariance with itself is variance!)</p>
                                <p>• Cov(X,Y) = Cov(Y,X)  (symmetric)</p>
                                <p>• Cov(aX, bY) = ab·Cov(X,Y)  (scaling)</p>
                                <p>• If X, Y independent: Cov(X,Y) = 0  (converse not always true!)</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Regression Toward the Mean</h4>
                            <p className="mb-2">Galton's discovery: predicted child height is:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                𝔼[Y|X] = μᵧ + ρ(σᵧ/σₓ)(X - μₓ)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">The ρ factor causes "regression" - extreme parents have less extreme children!</p>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <CovarianceVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">💰 Finance</h4>
                            <p className="text-sm">Portfolio diversification uses covariance matrices. If assets have low/negative correlation, portfolio risk decreases!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧬 Genetics</h4>
                            <p className="text-sm">Heritability estimates use parent-child correlations. GWAS studies find genetic variants correlated with traits.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🤖 Machine Learning</h4>
                            <p className="text-sm">Feature selection removes highly correlated features. PCA uses covariance matrix eigenvectors to find principal components!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Data Science</h4>
                            <p className="text-sm">Correlation matrices visualize relationships. Time series analysis uses autocorrelation. A/B testing measures treatment correlations.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Covariance/Correlation Visualization
const CovarianceVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 400 });
    const [corrStrength, setCorrStrength] = useState(0.8);

    // Generate correlated data
    const generateCorrelatedData = (corr: number): { x: number[]; y: number[] } => {
        const n = 100;
        const x: number[] = [];
        const y: number[] = [];

        for (let i = 0; i < n; i++) {
            // Generate standard normal x
            const u1 = Math.random();
            const u2 = Math.random();
            const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
            const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);

            // Generate y correlated with x
            const xi = z1;
            const yi = corr * z1 + Math.sqrt(1 - corr * corr) * z2;

            x.push(xi * 50 + 200);
            y.push(yi * 50 + 200);
        }

        return { x, y };
    };

    const { x, y } = generateCorrelatedData(corrStrength);

    const cov = covariance(x, y);
    const corr = correlation(x, y);

    // Drawing
    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 400);

        // Draw axes
        drawLine(ctx, 50, 350, 750, 350, 'rgba(255,255,255,0.3)', 1); // X-axis
        drawLine(ctx, 50, 50, 50, 350, 'rgba(255,255,255,0.3)', 1); // Y-axis

        // Draw grid
        for (let i = 0; i <= 4; i++) {
            const xPos = 50 + i * 175;
            const yPos = 350 - i * 75;
            drawLine(ctx, xPos, 50, xPos, 350, 'rgba(255,255,255,0.05)', 1);
            drawLine(ctx, 50, yPos, 750, yPos, 'rgba(255,255,255,0.05)', 1);
        }

        // Draw points
        for (let i = 0; i < x.length; i++) {
            const px = 50 + (x[i] - 100) * 1.75;
            const py = 350 - (y[i] - 100) * 0.75;

            const alpha = corrStrength >= 0 ? '80' : '80';
            const color = corrStrength >= 0 ? '#10b981' : '#ef4444';
            drawCircle(ctx, px, py, 4, color + alpha);
        }

        // Draw trend line if correlation is strong
        if (Math.abs(corr) > 0.3) {
            const lineColor = corrStrength >= 0 ? '#10b981' : '#ef4444';

            // Calculate regression line
            const meanX = x.reduce((a, b) => a + b, 0) / x.length;
            const meanY = y.reduce((a, b) => a + b, 0) / y.length;

            const slope = cov / x.reduce((sum, xi) => sum + (xi - meanX) ** 2, 0) * x.length;
            const intercept = meanY - slope * meanX;

            const x1 = 100;
            const y1 = slope * x1 + intercept;
            const x2 = 300;
            const y2 = slope * x2 + intercept;

            const px1 = 50 + (x1 - 100) * 1.75;
            const py1 = 350 - (y1 - 100) * 0.75;
            const px2 = 50 + (x2 - 100) * 1.75;
            const py2 = 350 - (y2 - 100) * 0.75;

            ctx.setLineDash([10, 5]);
            drawLine(ctx, px1, py1, px2, py2, lineColor, 3);
            ctx.setLineDash([]);
        }

        // Labels
        drawText(ctx, 'Scatter Plot', 400, 30, {
            font: 'bold 18px sans-serif',
            fillColor: '#e8e8f0',
            align: 'center'
        });

        drawText(ctx, 'Variable X', 400, 380, {
            font: '14px sans-serif',
            fillColor: '#a8a8c0',
            align: 'center'
        });

        drawText(ctx, 'Variable Y', 20, 200, {
            font: '14px sans-serif',
            fillColor: '#a8a8c0',
            align: 'center'
        });

    }, [ctx, corrStrength, x, y, corr, cov]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Explore Correlation</h3>
            <p className="text-gray-300 mb-4">
                Adjust the correlation strength and watch how the scatter plot changes!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <label className="block text-cyan-400 font-semibold mb-2">
                    Correlation Strength: {corrStrength > 0 ? '+' : ''}{corrStrength.toFixed(2)}
                </label>
                <input
                    type="range"
                    min="-1"
                    max="1"
                    step="0.05"
                    value={corrStrength}
                    onChange={(e) => setCorrStrength(Number(e.target.value))}
                    className="w-full"
                />
                <div className="mt-2 flex justify-between text-sm text-gray-400">
                    <span>Perfect Negative (-1)</span>
                    <span>No Correlation (0)</span>
                    <span>Perfect Positive (+1)</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-gray-400 text-sm">Covariance</div>
                    <div className="text-cyan-400 font-mono font-bold text-xl">{cov.toFixed(1)}</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-gray-400 text-sm">Correlation</div>
                    <div className="text-cyan-400 font-mono font-bold text-xl">{corr.toFixed(3)}</div>
                </div>
                <div className="bg-gray-900 p-3 rounded-lg">
                    <div className="text-gray-400 text-sm">Relationship</div>
                    <div className="text-cyan-400 font-semibold text-sm">
                        {Math.abs(corr) > 0.7 ? 'Strong' : Math.abs(corr) > 0.3 ? 'Moderate' : 'Weak'}
                        {corr > 0 ? ' Positive' : corr < 0 ? ' Negative' : ' None'}
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Try correlation = 0 to see no relationship, +1 for perfect positive (as X increases, Y increases), -1 for perfect negative (as X increases, Y decreases)!
            </p>
        </div>
    );
};

export default CovarianceSection;