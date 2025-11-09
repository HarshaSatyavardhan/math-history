import React from 'react';

const MarginalLikelihoodSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-purple-400 pl-4">Model Evidence: Marginal Likelihood</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🎲 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">Context:</strong> Bayesian statistics (1700s-present)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> In Bayesian inference, we need to compare different models. The <span className="text-indigo-200 font-semibold">marginal likelihood</span> (model evidence) tells us how well a model explains the data!</p>

                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">The marginal likelihood <span className="text-yellow-400 font-bold">P(data|model)</span> integrates over all parameter values, automatically implementing Occam's razor - penalizing complex models!</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"<strong className="text-white">Marginal likelihood</strong> averages likelihood over prior: <span className="text-yellow-400 font-bold">P(D) = ∫ P(D|θ)P(θ)dθ</span>. It's the normalizing constant in Bayes' theorem!"</p>
                    </div>

                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>Model comparison via Bayes factors</li>
                        <li>Automatic Occam's razor</li>
                        <li>Often intractable - needs approximation</li>
                        <li>Foundation of Bayesian model selection!</li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Definition</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                P(D|M) = ∫ P(D|θ,M) P(θ|M) dθ
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Bayes Factor</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                BF = P(D|M₁) / P(D|M₂)
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. In Bayes' Rule</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                P(θ|D) = P(D|θ)P(θ) / P(D)  (P(D) is marginal likelihood)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Model Selection</h4>
                            <p className="text-sm">Bayesian model comparison for choosing between competing hypotheses!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧬 Genomics</h4>
                            <p className="text-sm">Comparing evolutionary models, selecting genetic architectures!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🌌 Cosmology</h4>
                            <p className="text-sm">Model selection for cosmological theories based on observational data!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Machine Learning</h4>
                            <p className="text-sm">Bayesian neural networks, variational inference uses marginal likelihood!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarginalLikelihoodSection;
