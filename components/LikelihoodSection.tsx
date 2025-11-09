import React from 'react';

const LikelihoodSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-blue-400 pl-4">The Probability of Data: Likelihood</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">📊 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventor:</strong> Ronald Fisher (1920s)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> Given observed data, how do we <span className="text-indigo-200 font-semibold">estimate the parameters</span> of the underlying probability model? Fisher revolutionized statistics with the likelihood function!</p>

                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">The <span className="text-yellow-400 font-bold">likelihood L(θ|data)</span> measures how probable the observed data is under parameter θ. Maximum likelihood: find θ that makes data most probable!</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"<strong className="text-white">Likelihood</strong> isn't probability of parameters - it's probability of data given parameters! <span className="text-yellow-400 font-bold">L(θ|x) = P(x|θ)</span> as function of θ!"</p>
                    </div>

                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>Maximum likelihood: argmax L(θ)</li>
                        <li>Log-likelihood often easier: log L(θ)</li>
                        <li>MLE is asymptotically optimal</li>
                        <li>Foundation of modern statistics!</li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Likelihood Function</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                L(θ|x₁,...,xₙ) = ∏ P(xᵢ|θ)
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Log-Likelihood</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ℓ(θ) = log L(θ) = Σ log P(xᵢ|θ)
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. MLE</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                θ̂_MLE = argmax_θ L(θ|data)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧬 Genetics</h4>
                            <p className="text-sm">DNA sequence analysis, phylogenetic trees use maximum likelihood estimation!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Machine Learning</h4>
                            <p className="text-sm">Training neural networks = maximum likelihood! Cross-entropy loss is negative log-likelihood.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Econometrics</h4>
                            <p className="text-sm">Regression, time series, all use MLE for parameter estimation!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🔬 Physics</h4>
                            <p className="text-sm">Particle physics fits, cosmological parameter estimation!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LikelihoodSection;
