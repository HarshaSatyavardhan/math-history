import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const EigenSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-green-400 pl-4">3. The Invariant Directions: Eigenvalues & Eigenvectors</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🪐 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventor:</strong> Augustin-Louis Cauchy (1789-1857)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context (1829):</strong> Cauchy was tackling one of the <span className="text-indigo-200 font-semibold">most profound physics questions</span> of his era: <strong className="text-white">Will the solar system remain stable, or will planets eventually collide?</strong></p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">His 1829 paper analyzed <span className="text-yellow-400 font-bold">"secular inequalities"</span> - slow, cumulative drifts in planetary orbits caused by tiny gravitational tugs from other planets. To analyze this immensely complex N-body system, Cauchy needed to find its <strong className="text-white">"natural" axes of oscillation</strong> - directions where the system vibrates "purely."</p>
                        <p className="text-sm text-indigo-200">This required finding special directions (eigenvectors) that remain unchanged under the transformation, only scaled by a factor (eigenvalue)!</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Eigenvalues/vectors are THE fundamental tool of linear algebra. They determine: planetary stability, bridge vibration frequencies, quantum energy levels, PCA for data science, and Google's PageRank!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Inventor's Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 Cauchy's "Aha!" Moment:</p>
                        <p className="text-purple-100">"A matrix transformation rotates, stretches, and shears space. But there must exist <strong className="text-white">special directions</strong> that are <span className="text-yellow-400 font-bold">only scaled</span>, never rotated!"</p>
                        <p className="mt-4">These invariant directions are <strong className="text-white">eigenvectors</strong> (from German "eigen" = "own/proper"). The scaling factors are <strong className="text-white">eigenvalues</strong>.</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>Matrix A represents a linear transformation</li>
                        <li><strong className="text-white">Eigenvector v</strong>: invariant direction (Av = λv)</li>
                        <li><strong className="text-white">Eigenvalue λ</strong>: scaling factor along that direction</li>
                        <li>λ &gt; 1: stretching, λ &lt; 1: shrinking, λ &lt; 0: flipping</li>
                        <li>Complex eigenvalues = rotation (happens in real matrices!)</li>
                    </ul>

                    <p className="mt-4">Think: stretching a rubber sheet. Most points move in complex ways, but along principal axes they only stretch/shrink!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. The Eigenvalue Equation</h4>
                            <p className="mb-2">Vector v is an eigenvector of matrix A if:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                Av = λv
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Transformation = scaling! No rotation component.</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Characteristic Equation</h4>
                            <p className="mb-2">Rearrange to find eigenvalues:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                (A - λI)v = 0
                                <br />
                                det(A - λI) = 0  ← Characteristic equation
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Polynomial in λ; roots are eigenvalues!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Example: 2×2 Matrix</h4>
                            <p className="mb-2">For A = [[a, b], [c, d]]:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                λ² - (a+d)λ + (ad-bc) = 0
                                <br />
                                λ = [trace ± √(trace² - 4det)] / 2
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Trace = sum of diagonal, det = determinant</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Finding Eigenvectors</h4>
                            <p className="mb-2">For each eigenvalue λᵢ, solve:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                (A - λᵢI)v = 0
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Null space of (A - λI) gives eigenvectors!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Diagonalization</h4>
                            <p className="mb-2">If A has n independent eigenvectors:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                A = PDP⁻¹
                                <br />
                                P = [v₁ v₂ ... vₙ], D = diag(λ₁, λ₂, ..., λₙ)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">A is diagonal in its eigenbasis!</p>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <EigenvectorVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 PCA (Data Science)</h4>
                            <p className="text-sm">Principal Component Analysis finds eigenvectors of covariance matrix - directions of maximum variance for dimensionality reduction!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🔍 Google PageRank</h4>
                            <p className="text-sm">Web page importance = eigenvector of link matrix! The dominant eigenvector ranks all pages.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">⚛️ Quantum Mechanics</h4>
                            <p className="text-sm">Observable quantities (energy, momentum) are eigenvalues of operators. Eigenvectors are quantum states!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🌉 Structural Engineering</h4>
                            <p className="text-sm">Bridge vibration modes = eigenvectors. Eigenvalues = natural frequencies. Avoid resonance disasters!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Eigenvector Visualization
const EigenvectorVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 400 });
    const [matrix, setMatrix] = useState({ a: 2, b: 1, c: 1, d: 2 });

    // Calculate eigenvalues for 2x2 matrix
    const getEigenvalues = () => {
        const { a, b, c, d } = matrix;
        const trace = a + d;
        const det = a * d - b * c;
        const discriminant = trace * trace - 4 * det;

        if (discriminant < 0) {
            return { lambda1: null, lambda2: null, complex: true };
        }

        const sqrtDisc = Math.sqrt(discriminant);
        return {
            lambda1: (trace + sqrtDisc) / 2,
            lambda2: (trace - sqrtDisc) / 2,
            complex: false
        };
    };

    const { lambda1, lambda2, complex } = getEigenvalues();

    // Drawing
    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 400);

        const centerX = 400;
        const centerY = 200;
        const scale = 50;

        // Draw grid
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        for (let i = -10; i <= 10; i++) {
            drawLine(ctx, centerX + i * scale, 0, centerX + i * scale, 400, 'rgba(255,255,255,0.05)', 1);
            drawLine(ctx, 0, centerY + i * scale, 800, centerY + i * scale, 'rgba(255,255,255,0.05)', 1);
        }

        // Draw axes
        drawLine(ctx, 0, centerY, 800, centerY, 'rgba(255,255,255,0.3)', 2);
        drawLine(ctx, centerX, 0, centerX, 400, 'rgba(255,255,255,0.3)', 2);

        if (!complex && lambda1 !== null && lambda2 !== null) {
            // Calculate eigenvectors (simplified for 2x2)
            const { a, b, c } = matrix;

            // Eigenvector 1
            let v1x = 1, v1y = 0;
            if (Math.abs(b) > 0.01) {
                v1y = (lambda1 - a) / b;
                const norm1 = Math.sqrt(v1x * v1x + v1y * v1y);
                v1x /= norm1;
                v1y /= norm1;
            } else if (Math.abs(c) > 0.01) {
                v1x = (lambda1 - matrix.d) / c;
                const norm1 = Math.sqrt(v1x * v1x + v1y * v1y);
                v1x /= norm1;
                v1y /= norm1;
            }

            // Eigenvector 2
            let v2x = 1, v2y = 0;
            if (Math.abs(b) > 0.01) {
                v2y = (lambda2 - a) / b;
                const norm2 = Math.sqrt(v2x * v2x + v2y * v2y);
                v2x /= norm2;
                v2y /= norm2;
            } else if (Math.abs(c) > 0.01) {
                v2x = (lambda2 - matrix.d) / c;
                const norm2 = Math.sqrt(v2x * v2x + v2y * v2y);
                v2x /= norm2;
                v2y /= norm2;
            }

            // Draw eigenvectors
            const arrowLen = 100;

            // Eigenvector 1 (green)
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + v1x * arrowLen, centerY - v1y * arrowLen);
            ctx.stroke();

            // Eigenvector 2 (blue)
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + v2x * arrowLen, centerY - v2y * arrowLen);
            ctx.stroke();

            // Draw labels
            drawText(ctx, `λ₁ = ${lambda1.toFixed(2)}`, centerX + v1x * arrowLen + 10, centerY - v1y * arrowLen, {
                font: '14px sans-serif',
                fillColor: '#10b981'
            });

            drawText(ctx, `λ₂ = ${lambda2.toFixed(2)}`, centerX + v2x * arrowLen + 10, centerY - v2y * arrowLen, {
                font: '14px sans-serif',
                fillColor: '#3b82f6'
            });
        }

        // Title
        drawText(ctx, 'Eigenvectors and Eigenvalues', 400, 30, {
            font: 'bold 18px sans-serif',
            fillColor: '#e8e8f0',
            align: 'center'
        });

        if (complex) {
            drawText(ctx, 'Complex eigenvalues - rotation!', 400, 200, {
                font: '16px sans-serif',
                fillColor: '#ef4444',
                align: 'center'
            });
        }

    }, [ctx, matrix, lambda1, lambda2, complex]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Eigenvector Viewer</h3>
            <p className="text-gray-300 mb-4">
                Adjust the 2×2 matrix and watch the eigenvectors (green & blue arrows) change!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Matrix A:</h4>
                    <div className="grid grid-cols-2 gap-2">
                        {['a', 'b', 'c', 'd'].map((key) => (
                            <div key={key}>
                                <label className="block text-gray-300 text-sm mb-1">{key}: {matrix[key as keyof typeof matrix]}</label>
                                <input
                                    type="range"
                                    min="-3"
                                    max="3"
                                    step="0.1"
                                    value={matrix[key as keyof typeof matrix]}
                                    onChange={(e) => setMatrix({ ...matrix, [key]: Number(e.target.value) })}
                                    className="w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Eigenvalues:</h4>
                    {complex ? (
                        <div className="text-red-400 font-mono">Complex (rotation)</div>
                    ) : (
                        <div className="space-y-2">
                            <div className="text-green-400 font-mono">λ₁ = {lambda1?.toFixed(3)}</div>
                            <div className="text-blue-400 font-mono">λ₂ = {lambda2?.toFixed(3)}</div>
                        </div>
                    )}
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Green and blue arrows show eigenvector directions. They only scale under transformation, never rotate!
            </p>
        </div>
    );
};

export default EigenSection;
