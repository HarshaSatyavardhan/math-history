import React from 'react';

const FundamentalTheoremSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-gold-400 pl-4">The Bridge: Fundamental Theorem of Calculus</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🌉 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Discoverers:</strong> Isaac Newton & Gottfried Leibniz (1670s)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> Derivatives and integrals seemed like <span className="text-indigo-200 font-semibold">completely different operations</span>. Newton and Leibniz independently discovered they're inverse processes!</p>

                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">The <span className="text-yellow-400 font-bold">Fundamental Theorem</span> unifies calculus! Differentiation and integration are inverse operations. This single insight revolutionized mathematics!</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"<strong className="text-white">Differentiation and integration are inverses!</strong> ∫ₐᵇ f'(x)dx = f(b) - f(a). Accumulation of rate = <span className="text-yellow-400 font-bold">net change</span>!"</p>
                    </div>

                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>Part 1: F'(x) = f(x) where F(x) = ∫ₐˣ f(t)dt</li>
                        <li>Part 2: ∫ₐᵇ f'(x)dx = f(b) - f(a)</li>
                        <li>Connects slopes and areas</li>
                        <li>Makes computing integrals tractable!</li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Part 1 (FTC I)</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                d/dx[∫ₐˣ f(t)dt] = f(x)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Derivative of integral = original function!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Part 2 (FTC II)</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ∫ₐᵇ f'(x)dx = f(b) - f(a)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Integral of derivative = net change!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Example</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                ∫₀² 2x dx = [x²]₀² = 4 - 0 = 4
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🚗 Physics</h4>
                            <p className="text-sm">Velocity integrates to position. Force integrates to work. ALL of physics uses FTC!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">💰 Economics</h4>
                            <p className="text-sm">Marginal cost integrates to total cost. Revenue from demand curves!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Probability</h4>
                            <p className="text-sm">PDF integrates to CDF. Fundamental for probability theory!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🏗️ Engineering</h4>
                            <p className="text-sm">Accumulation of rates: charge from current, distance from velocity!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FundamentalTheoremSection;
