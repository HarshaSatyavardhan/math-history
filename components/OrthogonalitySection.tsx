import React, { useState } from 'react';

const OrthogonalitySection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-blue-400 pl-4">The Geometry of Independence: Orthogonality</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🌍 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventors:</strong> Adrien-Marie Legendre (1752-1833) & Pierre-Simon Laplace (1749-1827)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context (Late 1700s):</strong> A pressing 18th-century question: What is the <span className="text-indigo-200 font-semibold">true shape of Earth</span> (known to be a spheroid, flattened at poles) and how to calculate gravitational attraction of this non-spherical body?</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">Solving Newton's law of gravitation for complex shapes led to new differential equations. Legendre and Laplace discovered solutions could be expressed as <span className="text-yellow-400 font-bold">infinite series of special functions</span> - now called Legendre Polynomials.</p>
                        <p className="text-sm text-indigo-200">The key discovery: these polynomials were <strong className="text-white">orthogonal</strong> - mathematically independent!</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Orthogonality is the mechanism for decomposition! It allows breaking impossibly complex problems (signals, quantum wavefunctions, PDEs) into simple 1D problems that can be solved individually.</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100">"<strong className="text-white">Orthogonality</strong> is the generalization of <span className="text-yellow-400 font-bold">perpendicularity</span> to ANY number of dimensions - even infinite-dimensional function spaces!"</p>
                        <p className="mt-4">Two things are orthogonal if they're <strong className="text-white">completely independent</strong> - knowing one tells you nothing about the other!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">Vectors</strong>: orthogonal if v · w = 0</li>
                        <li><strong className="text-white">Functions</strong>: orthogonal if ∫ f(x)g(x)w(x)dx = 0</li>
                        <li>Orthogonal basis = independent coordinate system</li>
                        <li>Fourier series works BECAUSE sin/cos are orthogonal!</li>
                        <li>QR decomposition, Gram-Schmidt, all use orthogonality</li>
                    </ul>

                    <p className="mt-4">Think: x, y, z axes in 3D. Perpendicular = orthogonal. Moving along x doesn't affect y or z coordinates!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Orthogonality in ℝⁿ</h4>
                            <p className="mb-2">Vectors u and v are orthogonal if:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                u · v = u₁v₁ + u₂v₂ + ... + uₙvₙ = 0
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Dot product = 0 means perpendicular!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Orthogonal Functions</h4>
                            <p className="mb-2">Functions f and g are orthogonal on [a,b] with weight w(x) if:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ⟨f, g⟩ = ∫ₐᵇ f(x)g(x)w(x)dx = 0
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Inner product = 0 in function space!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Orthonormal Basis</h4>
                            <p className="mb-2">Vectors (e₁, e₂, ..., eₙ) are orthonormal if:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                eᵢ · eⱼ = δᵢⱼ = (1 if i=j, 0 if i≠j)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Orthogonal + unit length = orthonormal!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Gram-Schmidt Process</h4>
                            <p className="mb-2">Convert any basis to orthogonal basis:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                u₁ = v₁
                                <br />
                                u₂ = v₂ - proj_u₁(v₂)
                                <br />
                                u₃ = v₃ - proj_u₁(v₃) - proj_u₂(v₃)
                                <br />
                                ...
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Example: Legendre Polynomials</h4>
                            <p className="mb-2">On [-1, 1] with w(x) = 1:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                ∫₋₁¹ Pₘ(x)Pₙ(x)dx = 0  (m ≠ n)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">P₀=1, P₁=x, P₂=(3x²-1)/2, ...</p>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <OrthogonalityVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🎵 Fourier Analysis</h4>
                            <p className="text-sm">Sin and cosine are orthogonal! This is WHY Fourier series works - each coefficient independent.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">⚛️ Quantum Mechanics</h4>
                            <p className="text-sm">Quantum states are orthogonal vectors in Hilbert space. Measurement outcomes are orthogonal eigenstates!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Statistics</h4>
                            <p className="text-sm">Uncorrelated variables are orthogonal in probability space. PCA finds orthogonal principal components!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🔐 Error Correction</h4>
                            <p className="text-sm">Orthogonal codes (like Hadamard codes) allow detecting/correcting errors in transmission!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Orthogonality Visualization
const OrthogonalityVisualization: React.FC = () => {
    const [v1, setV1] = useState({ x: 3, y: 1 });
    const [v2, setV2] = useState({ x: -1, y: 3 });

    const dotProduct = v1.x * v2.x + v1.y * v2.y;
    const isOrthogonal = Math.abs(dotProduct) < 0.5;

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Orthogonality Checker</h3>
            <p className="text-gray-300 mb-4">
                Adjust the two vectors. When the dot product = 0, they're orthogonal (perpendicular)!
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-green-400 font-semibold mb-3">Vector 1: ({v1.x}, {v1.y})</h4>
                    <div className="space-y-2">
                        <div>
                            <label className="block text-gray-300 text-sm mb-1">x: {v1.x}</label>
                            <input
                                type="range"
                                min="-5"
                                max="5"
                                step="0.5"
                                value={v1.x}
                                onChange={(e) => setV1({ ...v1, x: Number(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm mb-1">y: {v1.y}</label>
                            <input
                                type="range"
                                min="-5"
                                max="5"
                                step="0.5"
                                value={v1.y}
                                onChange={(e) => setV1({ ...v1, y: Number(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                    <h4 className="text-blue-400 font-semibold mb-3">Vector 2: ({v2.x}, {v2.y})</h4>
                    <div className="space-y-2">
                        <div>
                            <label className="block text-gray-300 text-sm mb-1">x: {v2.x}</label>
                            <input
                                type="range"
                                min="-5"
                                max="5"
                                step="0.5"
                                value={v2.x}
                                onChange={(e) => setV2({ ...v2, x: Number(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm mb-1">y: {v2.y}</label>
                            <input
                                type="range"
                                min="-5"
                                max="5"
                                step="0.5"
                                value={v2.y}
                                onChange={(e) => setV2({ ...v2, y: Number(e.target.value) })}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={`p-6 rounded-lg text-center ${isOrthogonal ? 'bg-green-900/50 border-2 border-green-500' : 'bg-gray-900'}`}>
                <div className="text-sm text-gray-300 mb-2">Dot Product: v₁ · v₂</div>
                <div className={`text-4xl font-mono font-bold ${isOrthogonal ? 'text-green-400' : 'text-white'}`}>
                    {dotProduct.toFixed(2)}
                </div>
                <div className="text-sm mt-2">
                    {isOrthogonal ? (
                        <span className="text-green-400 font-bold">✓ ORTHOGONAL (Perpendicular!)</span>
                    ) : (
                        <span className="text-gray-400">Not orthogonal</span>
                    )}
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Try making v1 = (3, 1) and v2 = (-1, 3). Dot product = -3 + 3 = 0. Orthogonal!
            </p>
        </div>
    );
};

export default OrthogonalitySection;