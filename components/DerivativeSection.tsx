import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const DerivativeSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">The Birth of Calculus: The Derivative</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🔬 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventors:</strong> Isaac Newton (1643-1727) & Gottfried Leibniz (1646-1716)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context (1660s-1680s):</strong> A fundamental question plagued 17th-century mathematicians: <span className="text-indigo-200 font-semibold">How do we measure instantaneous rate of change?</span></p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">Physics demanded precise descriptions of motion. Average velocity is easy: distance/time. But what is the <span className="text-yellow-400 font-bold">exact velocity at a single instant</span>? At one moment, distance = 0, time = 0. We get 0/0 - meaningless!</p>
                        <p className="text-sm text-indigo-200">Newton needed this for planetary motion (gravity). Leibniz sought it for optimization problems (finding maxima/minima).</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Without instantaneous rates, we couldn't describe acceleration, optimization, or any changing quantity precisely. The derivative became the foundation of physics, engineering, economics, and all of modern science!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Inventor's Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"<strong className="text-white">Instantaneous velocity</strong> is the limit of average velocities as the time interval shrinks to zero!"</p>
                        <p className="text-sm text-purple-200">Newton called his approach "fluxions" (flowing quantities). Leibniz introduced the elegant notation dy/dx (differential). Both discovered the same truth independently!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">The limit</strong>: f'(x) = lim[h→0] [f(x+h) - f(x)] / h</li>
                        <li><strong className="text-white">Geometric meaning</strong>: Slope of the tangent line</li>
                        <li><strong className="text-white">Physical meaning</strong>: Instantaneous rate of change</li>
                        <li>Power rule: d/dx(xⁿ) = nxⁿ⁻¹</li>
                        <li>The derivative is itself a function!</li>
                    </ul>

                    <p className="mt-4">Think: If you have a graph of position vs. time, the derivative at any point tells you the velocity at that exact instant - the slope of the tangent line!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. The Limit Definition</h4>
                            <p className="mb-2">The derivative of f at x:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                f'(x) = lim[h→0] [f(x+h) - f(x)] / h
                            </div>
                            <p className="text-sm text-blue-200 mt-2">As h shrinks to 0, the secant becomes tangent!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. The Power Rule</h4>
                            <p className="mb-2">Most important rule for polynomials:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                d/dx(xⁿ) = nxⁿ⁻¹
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Example: d/dx(x³) = 3x²</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Linearity</h4>
                            <p className="mb-2">Derivatives distribute over sums:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                d/dx[af(x) + bg(x)] = af'(x) + bg'(x)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Constants pull out, derivatives add!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Product & Quotient Rules</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                Product: (fg)' = f'g + fg'
                                <br />
                                Quotient: (f/g)' = (f'g - fg') / g²
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Chain Rule</h4>
                            <p className="mb-2">For composite functions f(g(x)):</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                d/dx[f(g(x))] = f'(g(x)) · g'(x)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">The most powerful differentiation rule!</p>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <DerivativeVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🚗 Physics & Motion</h4>
                            <p className="text-sm">Position → Velocity → Acceleration. All physics equations (F=ma, energy, momentum) use derivatives!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📈 Optimization</h4>
                            <p className="text-sm">Find maxima/minima by setting derivative = 0. Used in economics, engineering, machine learning (gradient descent)!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Neural Networks</h4>
                            <p className="text-sm">Backpropagation = chain rule! Training AI means computing derivatives of loss with respect to millions of parameters.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">💰 Finance</h4>
                            <p className="text-sm">Option pricing (Black-Scholes), portfolio optimization, risk analysis - all use derivatives and differential equations!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Derivative Visualization
const DerivativeVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 500 });
    const [xPoint, setXPoint] = useState(2);

    // Function to visualize: f(x) = 0.3x³ - 2x² + 3x + 1
    const f = (x: number) => 0.3 * x * x * x - 2 * x * x + 3 * x + 1;

    // Derivative: f'(x) = 0.9x² - 4x + 3
    const fPrime = (x: number) => 0.9 * x * x - 4 * x + 3;

    // Drawing
    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 500);

        // Coordinate system
        const marginX = 60;
        const marginY = 50;
        const plotWidth = 800 - 2 * marginX;
        const plotHeight = 500 - 2 * marginY;

        // Domain: x ∈ [-1, 6]
        const xMin = -1;
        const xMax = 6;
        const yMin = -5;
        const yMax = 15;

        const xToCanvas = (x: number) => marginX + ((x - xMin) / (xMax - xMin)) * plotWidth;
        const yToCanvas = (y: number) => marginY + plotHeight - ((y - yMin) / (yMax - yMin)) * plotHeight;

        // Draw axes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        drawLine(ctx, xToCanvas(xMin), yToCanvas(0), xToCanvas(xMax), yToCanvas(0), 'rgba(255, 255, 255, 0.2)', 2);
        drawLine(ctx, xToCanvas(0), yToCanvas(yMin), xToCanvas(0), yToCanvas(yMax), 'rgba(255, 255, 255, 0.2)', 2);

        // Draw function curve
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = xMin; x <= xMax; x += 0.05) {
            const y = f(x);
            const canvasX = xToCanvas(x);
            const canvasY = yToCanvas(y);
            if (x === xMin) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        ctx.stroke();

        // Highlight point
        const yPoint = f(xPoint);
        drawCircle(ctx, xToCanvas(xPoint), yToCanvas(yPoint), 8, '#fbbf24');

        // Draw tangent line
        const slope = fPrime(xPoint);

        // Tangent line: y - yPoint = slope * (x - xPoint)
        // => y = slope * (x - xPoint) + yPoint
        const tangentY1 = slope * (xMin - xPoint) + yPoint;
        const tangentY2 = slope * (xMax - xPoint) + yPoint;

        drawLine(ctx, xToCanvas(xMin), yToCanvas(tangentY1), xToCanvas(xMax), yToCanvas(tangentY2), '#10b981', 3);

        // Labels
        drawText(ctx, 'f(x) = 0.3x³ - 2x² + 3x + 1', 400, 25, {
            font: 'bold 18px sans-serif',
            fillColor: '#a78bfa',
            align: 'center'
        });

        drawText(ctx, `x = ${xPoint.toFixed(2)}`, xToCanvas(xPoint) + 15, yToCanvas(yPoint) - 15, {
            font: '14px sans-serif',
            fillColor: '#fbbf24'
        });

        // Display derivative value
        drawText(ctx, `f'(${xPoint.toFixed(2)}) = ${slope.toFixed(2)}`, 650, 80, {
            font: 'bold 16px monospace',
            fillColor: '#10b981'
        });

        drawText(ctx, 'Tangent line (slope = derivative)', 650, 110, {
            font: '14px sans-serif',
            fillColor: '#10b981'
        });

        // Function value
        drawText(ctx, `f(${xPoint.toFixed(2)}) = ${yPoint.toFixed(2)}`, 650, 150, {
            font: 'bold 16px monospace',
            fillColor: '#fbbf24'
        });

    }, [ctx, xPoint]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Tangent Line & Derivative</h3>
            <p className="text-gray-300 mb-4">
                Move the slider to see how the tangent line (green) changes slope. The derivative f'(x) is the slope of this line!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="bg-gray-900 p-4 rounded-lg">
                <label className="block text-cyan-400 font-semibold mb-2">
                    Point on Curve: x = {xPoint.toFixed(2)}
                </label>
                <input
                    type="range"
                    min="-1"
                    max="6"
                    step="0.1"
                    value={xPoint}
                    onChange={(e) => setXPoint(Number(e.target.value))}
                    className="w-full"
                />
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Notice: When the curve is steep, the derivative (slope) is large. When flat, derivative ≈ 0. When decreasing, derivative is negative!
            </p>
        </div>
    );
};

export default DerivativeSection;
