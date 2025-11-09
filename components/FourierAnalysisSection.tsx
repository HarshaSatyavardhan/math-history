import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText } from '../utils/canvasUtils';

const FourierAnalysisSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-purple-400 pl-4">Functional Analysis: Fourier Analysis</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🔥 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventor:</strong> Jean-Baptiste Joseph Fourier (1768-1830)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context (1807-1822):</strong> In 1807, Fourier was studying heat diffusion in metal objects for Napoleon's scientific commission in Paris. The heat equation - a partial differential equation - seemed <em className="italic text-indigo-200">impossible to solve for arbitrary initial conditions</em>. How could one predict how heat would flow through a metal ring over time, starting from ANY initial temperature distribution?</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong> Solving the heat equation required expressing <span className="text-indigo-300 font-semibold">arbitrary functions</span> as solutions. The existing mathematical methods could only handle simple, smooth cases. But real-world heat distributions could be discontinuous, jagged, or completely irregular. <strong className="text-white">How could complex, chaotic functions be tamed?</strong></p>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Without a general solution to the heat equation, engineers couldn't design furnaces, predict cooling times, or optimize industrial processes. More fundamentally, the inability to represent arbitrary functions as solutions revealed a deep gap in mathematical understanding of function spaces.</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Inventor's Intuition</h3>
                    <p className="mb-4">Fourier's claim in his 1822 masterpiece <em className="italic text-purple-200">Théorie analytique de la chaleur</em> (The Analytical Theory of Heat) was so revolutionary that <strong className="text-white">Lagrange and Laplace initially rejected it!</strong> They couldn't believe discontinuous functions could be represented by smooth sine and cosine waves.</p>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100">"<span className="text-yellow-400 font-bold">ANY periodic function</span>, no matter how complex or irregular, can be written as a sum of simple sine and cosine waves!"</p>
                        <p className="mt-4">Fourier's physical intuition came from vibrating strings: a plucked string produces a fundamental tone <strong className="text-white">plus harmonics</strong> (overtones). Just as a musical chord is composed of individual notes, <span className="text-purple-200 font-semibold">any complex wave is a superposition of simple harmonic oscillations</span>.</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>The heat equation is <strong className="text-white">linear</strong> - sums of solutions are solutions</li>
                        <li>Sine and cosine functions are <strong className="text-white">simple, stable solutions</strong> to the heat equation</li>
                        <li>These functions are <strong className="text-white">orthogonal</strong> - they don't interfere mathematically</li>
                        <li>Therefore, they form a <strong className="text-white">basis</strong> for the space of functions!</li>
                    </ul>

                    <p className="mt-4">Think of it this way: if you can only communicate using sine waves of different frequencies, you can still recreate ANY message by mixing these "pure tones" in the right proportions!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. The Fourier Series</h4>
                            <p className="mb-2">Any periodic function f(x) with period 2π can be written as:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                f(x) = a₀/2 + Σₙ₌₁^∞ [aₙcos(nx) + bₙsin(nx)]
                            </div>
                            <p className="text-sm text-blue-200 mt-2">An infinite sum of sines and cosines!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Orthogonality (The Secret Weapon)</h4>
                            <p className="mb-2">Sine and cosine functions are orthogonal over a period:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ∫₋π^π sin(mx)cos(nx) dx = 0  for all m, n
                            </div>
                            <p className="text-sm text-blue-200 mt-2">This means each harmonic can be extracted independently!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Fourier Coefficients</h4>
                            <p className="mb-2">To find how much of each harmonic is in f(x):</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                aₙ = (1/π) ∫₋π^π f(x)cos(nx) dx
                                <br />
                                bₙ = (1/π) ∫₋π^π f(x)sin(nx) dx
                            </div>
                            <p className="text-sm text-blue-200 mt-2">These formulas "project" f(x) onto each basis function!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. The Fourier Transform (Continuous Version)</h4>
                            <p className="mb-2">For non-periodic functions, the sum becomes an integral:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                F(ω) = ∫₋∞^∞ f(t)e^(-iωt) dt
                            </div>
                            <p className="text-sm text-blue-200 mt-2">This transforms from time domain → frequency domain!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Parseval's Theorem (Energy Conservation)</h4>
                            <p className="mb-2">The "energy" is the same in both domains:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ∫ |f(t)|² dt = ∫ |F(ω)|² dω
                            </div>
                            <p className="text-sm text-blue-200 mt-2">The Fourier transform preserves energy - it's a unitary operator!</p>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <FourierWaveBuilder />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📡 Signal Processing</h4>
                            <p className="text-sm">Every digital device uses FFT (Fast Fourier Transform): audio compression (MP3, AAC), image processing (JPEG), telecommunications (4G/5G), radar systems, and audio filters.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">⚛️ Quantum Mechanics</h4>
                            <p className="text-sm">The wave function in momentum space is the Fourier transform of position space. Heisenberg's uncertainty principle is fundamentally a property of Fourier transforms!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🏥 Medical Imaging</h4>
                            <p className="text-sm">MRI and CT scans use Fourier transforms to reconstruct images from frequency data. The raw MRI signal is actually captured in frequency space (k-space)!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🎵 Music & Audio</h4>
                            <p className="text-sm">Every synthesizer, audio equalizer, and spectrum analyzer uses Fourier analysis. When you see "bass" and "treble" knobs, you're controlling Fourier coefficients!</p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-950/50 rounded-lg">
                        <h4 className="font-semibold text-white mb-2">🔗 Connection to Functional Analysis</h4>
                        <p className="text-sm">In modern language: sine and cosine form a <strong className="text-white">complete orthonormal basis</strong> for the Hilbert space L²[−π, π]. Fourier series are just coordinate representations in this infinite-dimensional vector space!</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Inline Fourier Wave Builder Visualization
const FourierWaveBuilder: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 400 });
    const [coefficients, setCoefficients] = useState({
        sin1: 0,
        cos1: 1,
        sin2: 0,
        cos2: 0,
        sin3: 0,
        cos3: 0,
    });

    const calculateWave = (x: number): number => {
        let y = 0;
        y += coefficients.sin1 * Math.sin(x);
        y += coefficients.cos1 * Math.cos(x);
        y += coefficients.sin2 * Math.sin(2 * x);
        y += coefficients.cos2 * Math.cos(2 * x);
        y += coefficients.sin3 * Math.sin(3 * x);
        y += coefficients.cos3 * Math.cos(3 * x);
        return y;
    };

    const updateCoefficient = (name: keyof typeof coefficients, value: number) => {
        setCoefficients(prev => ({ ...prev, [name]: value / 100 }));
    };

    const setPreset = (type: string) => {
        const presets: Record<string, typeof coefficients> = {
            square: { sin1: 1, cos1: 0, sin2: 0, cos2: 0, sin3: 1/3, cos3: 0 },
            sawtooth: { sin1: 1, cos1: 0, sin2: -0.5, cos2: 0, sin3: 1/3, cos3: 0 },
            triangle: { sin1: 1, cos1: 0, sin2: 0, cos2: 0, sin3: -1/9, cos3: 0 },
        };
        setCoefficients(presets[type] || { sin1: 0, cos1: 1, sin2: 0, cos2: 0, sin3: 0, cos3: 0 });
    };

    // Drawing
    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 400);

        // Draw axes
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 1;
        drawLine(ctx, 50, 200, 750, 200, 'rgba(255,255,255,0.2)', 1); // X-axis
        drawLine(ctx, 400, 30, 400, 370, 'rgba(255,255,255,0.2)', 1); // Y-axis

        // Draw grid
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        for (let i = -3; i <= 3; i++) {
            if (i !== 0) {
                const x = 400 + i * 100;
                drawLine(ctx, x, 30, x, 370, 'rgba(255,255,255,0.05)', 1);
            }
        }

        // Draw individual components (faint)
        ctx.globalAlpha = 0.3;

        // Sine components (purple)
        ctx.strokeStyle = '#7b1fa2';
        ctx.lineWidth = 1;
        for (let n = 1; n <= 3; n++) {
            const coeffKey = `sin${n}` as keyof typeof coefficients;
            const coeff = coefficients[coeffKey];
            if (Math.abs(coeff) > 0.01) {
                ctx.beginPath();
                for (let px = 50; px < 750; px++) {
                    const x = (px - 400) / 50;
                    const y = coeff * Math.sin(n * x);
                    const py = 200 - y * 80;
                    if (px === 50) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.stroke();
            }
        }

        // Cosine components (teal)
        ctx.strokeStyle = '#4ecdc4';
        for (let n = 1; n <= 3; n++) {
            const coeffKey = `cos${n}` as keyof typeof coefficients;
            const coeff = coefficients[coeffKey];
            if (Math.abs(coeff) > 0.01) {
                ctx.beginPath();
                for (let px = 50; px < 750; px++) {
                    const x = (px - 400) / 50;
                    const y = coeff * Math.cos(n * x);
                    const py = 200 - y * 80;
                    if (px === 50) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.stroke();
            }
        }

        ctx.globalAlpha = 1;

        // Draw combined wave (gold)
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let px = 50; px < 750; px++) {
            const x = (px - 400) / 50;
            const y = calculateWave(x);
            const py = 200 - y * 80;
            if (px === 50) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();

        // Labels
        drawText(ctx, 'Combined Fourier Series', 20, 25, {
            font: 'bold 14px sans-serif',
            fillColor: '#e8e8f0'
        });

        // Legend
        drawText(ctx, '— Purple: Sine components', 600, 25, {
            font: '11px sans-serif',
            fillColor: '#7b1fa2'
        });
        drawText(ctx, '— Teal: Cosine components', 600, 45, {
            font: '11px sans-serif',
            fillColor: '#4ecdc4'
        });
        drawText(ctx, '— Gold: Combined wave', 600, 65, {
            font: '11px sans-serif',
            fillColor: '#d4af37'
        });

    }, [ctx, coefficients]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Build Your Own Fourier Series</h3>
            <p className="text-gray-300 mb-4">
                Adjust the sliders to control sine and cosine harmonics. Watch how combining simple waves creates complex patterns!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            {/* Harmonic Sliders */}
            <div className="grid md:grid-cols-3 gap-4 mb-4">
                {(['sin1', 'cos1', 'sin2', 'cos2', 'sin3', 'cos3'] as const).map((key) => {
                    const label = key.startsWith('sin') ? `sin(${key[3]}x)` : `cos(${key[3]}x)`;
                    const color = key.startsWith('sin') ? 'bg-purple-600' : 'bg-teal-600';
                    return (
                        <div key={key} className="bg-gray-900 p-3 rounded-lg">
                            <label className="block text-sm text-gray-300 mb-2">
                                <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${color}`}>
                                    {label}
                                </span>
                            </label>
                            <input
                                type="range"
                                min="-100"
                                max="100"
                                value={coefficients[key] * 100}
                                onChange={(e) => updateCoefficient(key, Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="text-center text-teal-400 font-mono text-sm mt-1">
                                {coefficients[key].toFixed(2)}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Preset Buttons */}
            <div className="flex gap-3 flex-wrap">
                <button
                    onClick={() => setPreset('square')}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition"
                >
                    Square Wave
                </button>
                <button
                    onClick={() => setPreset('sawtooth')}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-teal-700 transition"
                >
                    Sawtooth Wave
                </button>
                <button
                    onClick={() => setPreset('triangle')}
                    className="px-6 py-2 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-purple-700 transition"
                >
                    Triangle Wave
                </button>
                <button
                    onClick={() => setPreset('reset')}
                    className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition"
                >
                    ↺ Reset
                </button>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Try the presets to see how famous waveforms (square, sawtooth, triangle) are built from sine waves! Notice that a square wave needs only odd harmonics (sin(x) + sin(3x)/3 + sin(5x)/5 + ...).
            </p>
        </div>
    );
};

export default FourierAnalysisSection;