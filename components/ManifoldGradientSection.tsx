import React from 'react';

const ManifoldGradientSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-orange-400 pl-4">Optimization on Curved Spaces: Manifold Gradients</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🎯 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">Context:</strong> Modern optimization (2000s+)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> Many problems have <span className="text-indigo-200 font-semibold">constraints defining manifolds</span> - orthogonal matrices, positive definite matrices, unit spheres. How do we optimize on these curved spaces?</p>

                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">Standard gradient descent assumes Euclidean space. But on manifolds, we need <span className="text-yellow-400 font-bold">Riemannian gradients</span> that respect curvature!</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"The gradient must lie in the <strong className="text-white">tangent space</strong>! Project Euclidean gradient onto manifold, then take geodesic step!"</p>
                    </div>

                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>Riemannian gradient uses metric tensor</li>
                        <li>Update: retract back to manifold</li>
                        <li>Natural gradient is manifold gradient on probability manifolds</li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Riemannian Gradient</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                grad_M f = g⁻¹(df)
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Update Rule</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                xₖ₊₁ = Retract_xₖ(-α grad_M f(xₖ))
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Deep Learning</h4>
                            <p className="text-sm">Natural gradient descent, matrix factorization, low-rank optimization all use manifold optimization!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 PCA</h4>
                            <p className="text-sm">Principal components live on Grassmann manifold. Manifold optimization finds them!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🤖 Robotics</h4>
                            <p className="text-sm">Rotation group SO(3) optimization for SLAM, pose estimation!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📡 Signal Processing</h4>
                            <p className="text-sm">Covariance matrix estimation on positive definite manifold!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManifoldGradientSection;
