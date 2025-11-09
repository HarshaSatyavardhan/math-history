import React from 'react';

const OperatorTheorySection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-violet-400 pl-4">Functions on Function Spaces: Operator Theory</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🔧 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Pioneers:</strong> David Hilbert (1900s), John von Neumann (1920s)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> Quantum mechanics and differential equations required studying <span className="text-indigo-200 font-semibold">linear transformations on infinite-dimensional spaces</span>.</p>

                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">Operators are "functions that eat functions and output functions." In QM, observables ARE operators! <span className="text-yellow-400 font-bold">Spectral theory</span> generalizes eigenvalues to infinite dimensions.</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"An <strong className="text-white">operator</strong> is a linear map T: V → W between function spaces. Just like matrices act on vectors, operators act on <span className="text-yellow-400 font-bold">functions</span>!"</p>
                    </div>

                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>Bounded vs unbounded operators</li>
                        <li>Spectrum generalizes eigenvalues</li>
                        <li>Self-adjoint operators = quantum observables</li>
                        <li>Compact operators behave like finite-dimensional</li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Linear Operator</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                T: H → H, T(αf + βg) = αT(f) + βT(g)
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Bounded Operator</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ||T|| = sup ||T(f)|| / ||f|| &lt; ∞
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Spectrum</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                σ(T) = {'{λ: (T - λI) not invertible}'}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Example: Derivative</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                D: f ↦ f' (unbounded operator)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">⚛️ Quantum Mechanics</h4>
                            <p className="text-sm">Observables are self-adjoint operators. Measurement = eigenvalue decomposition!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🔬 PDEs</h4>
                            <p className="text-sm">Laplacian, heat, wave operators. Spectral methods solve PDEs!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Signal Processing</h4>
                            <p className="text-sm">Fourier transform, wavelet transform - all linear operators!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Machine Learning</h4>
                            <p className="text-sm">Kernel methods, reproducing kernel Hilbert spaces use operator theory!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-teal-400 pl-4">Functional Analysis: Operator Theory</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition</h3>
                    <p>This is the generalization of matrices to infinite dimensions. An operator T (like the derivative d/dx) is a transformation that maps one function (a "vector") to another function (<code className="bg-gray-700 p-1 rounded-md text-sm">Tf = g</code>). Hilbert developed "spectral theory" to find the "eigenvectors" (eigenfunctions) and "eigenvalues" of these operators.</p>
                </div>
            </div>
        </section>
    );
};

export default OperatorTheorySection;