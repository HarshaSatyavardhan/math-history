import React from 'react';

const ChangeOfVariableSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-yellow-400 pl-4">Integration by Substitution: Change of Variables</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🔄 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">Context:</strong> Fundamental calculus technique</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> When integrals are difficult in one coordinate system, <span className="text-indigo-200 font-semibold">change coordinates</span> to make them simpler! The Jacobian determines the correction factor.</p>

                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">In 1D: ∫ f(x)dx becomes ∫ f(g(u))g'(u)du. In higher dimensions, the <span className="text-yellow-400 font-bold">Jacobian determinant</span> is the scaling factor!</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"When changing coordinates, <strong className="text-white">volume elements change</strong>! The derivative (1D) or Jacobian (nD) tells us the <span className="text-yellow-400 font-bold">local scaling factor</span>."</p>
                    </div>

                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>1D: u-substitution with du/dx</li>
                        <li>2D/3D: Jacobian |∂(x,y)/∂(u,v)|</li>
                        <li>Polar/spherical coordinates use change of variables</li>
                        <li>Essential for probability transformations!</li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. 1D Formula</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ∫ f(x)dx = ∫ f(g(u))|g'(u)|du
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Multidimensional</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ∫∫ f(x,y)dxdy = ∫∫ f(x(u,v), y(u,v))|J|dudv
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Example: Polar</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                x=r cos θ, y=r sin θ → |J| = r → dxdy = r dr dθ
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🔬 Physics</h4>
                            <p className="text-sm">Spherical/cylindrical coordinates for symmetry. Every physics integral uses this!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Probability</h4>
                            <p className="text-sm">Transform random variables: if Y=g(X), then p_Y(y) = p_X(x)|dx/dy|!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🎮 Computer Graphics</h4>
                            <p className="text-sm">Coordinate transformations for rendering, texture mapping!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 ML</h4>
                            <p className="text-sm">Normalizing flows use invertible transformations with Jacobian!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangeOfVariableSection;
