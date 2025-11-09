import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const IntegralSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-fuchsia-400 pl-4">Area Under the Curve: The Integral</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">📐 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventor:</strong> Bernhard Riemann (1826-1866)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context (1854):</strong> A crisis of rigor plagued 19th-century mathematics. Joseph Fourier's 1822 work on the heat equation made the "scandalous" claim that <span className="text-indigo-200 font-semibold">any arbitrary function, even discontinuous ones, could be represented by sine and cosine waves.</span></p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">The integral had been used intuitively since Newton and Leibniz. But mathematicians like Augustin-Louis Cauchy had only <span className="text-yellow-400 font-bold">intuitive definitions</span>. It was unclear if integration held for "pathological" functions with sharp corners and breaks.</p>
                        <p className="text-sm text-indigo-200">Riemann, a student of Carl Friedrich Gauss, took on this challenge in his 1854 Habilitation dissertation on Fourier series.</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Without a rigorous definition of the integral, the very foundations of calculus were unstable. Riemann provided the first fully rigorous test for integrability!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 Riemann's Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"Bound the area from <strong className="text-white">above AND below</strong>! If the upper and lower sums converge to the <span className="text-yellow-400 font-bold">same value</span> as rectangles get finer, the function is integrable!"</p>
                        <p className="text-sm text-purple-200">Simple, geometric, and rigorous!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">Upper sum</strong>: Rectangles just OVER the curve</li>
                        <li><strong className="text-white">Lower sum</strong>: Rectangles just UNDER the curve</li>
                        <li>Function is Riemann-integrable iff upper and lower sums converge to same limit</li>
                        <li>Partition gets finer → rectangles approximate area better</li>
                        <li>This proved many of Fourier's discontinuous functions were integrable!</li>
                    </ul>

                    <p className="mt-4">Think: Squeeze the area between upper and lower bounds. If they meet at a single value, that's the integral!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Partition the Interval</h4>
                            <p className="mb-2">Divide [a, b] into n subintervals:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                a = x₀ &lt; x₁ &lt; x₂ &lt; ... &lt; xₙ = b
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Width of each subinterval: Δxᵢ = xᵢ - xᵢ₋₁</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Upper and Lower Sums</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                Upper sum: U = Σ Mᵢ · Δxᵢ  (Mᵢ = max on [xᵢ₋₁, xᵢ])
                                <br />
                                Lower sum: L = Σ mᵢ · Δxᵢ  (mᵢ = min on [xᵢ₋₁, xᵢ])
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. The Riemann Integral</h4>
                            <p className="mb-2">f is Riemann-integrable if:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                lim[||P||→0] U = lim[||P||→0] L = ∫ₐᵇ f(x) dx
                            </div>
                            <p className="text-sm text-blue-200 mt-2">||P|| = mesh size (maximum Δxᵢ)</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Fundamental Theorem of Calculus</h4>
                            <p className="mb-2">Connects derivatives and integrals:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                ∫ₐᵇ f'(x) dx = f(b) - f(a)
                                <br />
                                d/dx[∫ₐˣ f(t) dt] = f(x)
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Limitations</h4>
                            <p className="mb-2">The Riemann integral fails for highly discontinuous functions like:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                Dirichlet function: f(x) = 1 if x rational, 0 if irrational
                            </div>
                            <p className="text-sm text-blue-200 mt-2">This led to Lebesgue's more powerful integration theory!</p>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <RiemannSumVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">⚛️ Physics</h4>
                            <p className="text-sm">Work = ∫ F·dx, Energy = ∫ P·dt, Electric charge from current. Every accumulation problem uses integrals!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Probability</h4>
                            <p className="text-sm">Continuous probability distributions: P(a ≤ X ≤ b) = ∫ₐᵇ f(x)dx. Expected value E[X] = ∫ x·f(x)dx!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🏗️ Engineering</h4>
                            <p className="text-sm">Center of mass, moments of inertia, beam deflection, fluid flow - all require computing integrals!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">💰 Economics</h4>
                            <p className="text-sm">Consumer surplus = integral of demand curve. Total revenue from marginal revenue. Net present value!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Riemann Sum Visualization
const RiemannSumVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 500 });
    const [numRectangles, setNumRectangles] = useState(8);
    const [method, setMethod] = useState<'lower' | 'upper' | 'midpoint'>('midpoint');

    // Function to integrate: f(x) = 2 + 1.5*sin(x) (always positive)
    const f = (x: number) => 2 + 1.5 * Math.sin(x);

    // Drawing
    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 500);

        // Coordinate system
        const marginX = 60;
        const marginY = 50;
        const plotWidth = 800 - 2 * marginX;
        const plotHeight = 500 - 2 * marginY;

        // Domain: x ∈ [0, 2π]
        const a = 0;
        const b = 2 * Math.PI;
        const yMin = 0;
        const yMax = 4;

        const xToCanvas = (x: number) => marginX + ((x - a) / (b - a)) * plotWidth;
        const yToCanvas = (y: number) => marginY + plotHeight - ((y - yMin) / (yMax - yMin)) * plotHeight;

        // Draw axes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 2;
        drawLine(ctx, xToCanvas(a), yToCanvas(0), xToCanvas(b), yToCanvas(0), 'rgba(255, 255, 255, 0.2)', 2);
        drawLine(ctx, xToCanvas(a), yToCanvas(yMin), xToCanvas(a), yToCanvas(yMax), 'rgba(255, 255, 255, 0.2)', 2);

        // Draw rectangles
        const dx = (b - a) / numRectangles;
        let sum = 0;

        for (let i = 0; i < numRectangles; i++) {
            const x0 = a + i * dx;
            const x1 = a + (i + 1) * dx;

            // Determine rectangle height based on method
            let height;
            if (method === 'lower') {
                // Sample at left endpoint
                height = f(x0);
            } else if (method === 'upper') {
                // Sample at right endpoint
                height = f(x1);
            } else {
                // Midpoint
                height = f((x0 + x1) / 2);
            }

            sum += height * dx;

            // Draw rectangle
            const rectX = xToCanvas(x0);
            const rectY = yToCanvas(height);
            const rectWidth = xToCanvas(x1) - xToCanvas(x0);
            const rectHeight = yToCanvas(0) - yToCanvas(height);

            ctx.fillStyle = method === 'lower' ? 'rgba(239, 68, 68, 0.3)' : method === 'upper' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(251, 191, 36, 0.3)';
            ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

            ctx.strokeStyle = method === 'lower' ? '#ef4444' : method === 'upper' ? '#10b981' : '#fbbf24';
            ctx.lineWidth = 1;
            ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
        }

        // Draw function curve (on top)
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = a; x <= b; x += 0.01) {
            const y = f(x);
            const canvasX = xToCanvas(x);
            const canvasY = yToCanvas(y);
            if (x === a) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
        ctx.stroke();

        // Labels
        drawText(ctx, 'f(x) = 2 + 1.5·sin(x)', 400, 25, {
            font: 'bold 18px sans-serif',
            fillColor: '#a78bfa',
            align: 'center'
        });

        // Display Riemann sum
        const methodName = method === 'lower' ? 'Lower Sum' : method === 'upper' ? 'Upper Sum' : 'Midpoint Sum';
        const color = method === 'lower' ? '#ef4444' : method === 'upper' ? '#10b981' : '#fbbf24';

        drawText(ctx, `${methodName}: ${sum.toFixed(3)}`, 650, 80, {
            font: 'bold 16px monospace',
            fillColor: color
        });

        // True integral value
        const trueIntegral = 4 * Math.PI; // ∫₀²ᵖ (2 + 1.5sin(x))dx = 2·2π = 4π
        drawText(ctx, `True integral: ${trueIntegral.toFixed(3)}`, 650, 110, {
            font: '14px monospace',
            fillColor: '#14b8a6'
        });

        drawText(ctx, `Error: ${Math.abs(sum - trueIntegral).toFixed(3)}`, 650, 140, {
            font: '14px monospace',
            fillColor: '#f87171'
        });

        drawText(ctx, `n = ${numRectangles} rectangles`, 650, 170, {
            font: '14px sans-serif',
            fillColor: '#9ca3af'
        });

    }, [ctx, numRectangles, method]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Riemann Sums</h3>
            <p className="text-gray-300 mb-4">
                Adjust the number of rectangles and see how Riemann sums approximate the integral!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="space-y-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <label className="block text-purple-400 font-semibold mb-2">
                        Number of Rectangles: {numRectangles}
                    </label>
                    <input
                        type="range"
                        min="2"
                        max="100"
                        value={numRectangles}
                        onChange={(e) => setNumRectangles(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <button
                        onClick={() => setMethod('lower')}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${
                            method === 'lower'
                                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Lower Sum
                    </button>

                    <button
                        onClick={() => setMethod('midpoint')}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${
                            method === 'midpoint'
                                ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Midpoint
                    </button>

                    <button
                        onClick={() => setMethod('upper')}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${
                            method === 'upper'
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        Upper Sum
                    </button>
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Notice: As n increases, the error decreases! Riemann sums converge to the true integral.
            </p>
        </div>
    );
};

export default IntegralSection;
