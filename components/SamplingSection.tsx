import React from 'react';

const SamplingSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-400 pl-4">Drawing from Distributions: Sampling Methods</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🎲 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Pioneers:</strong> Nicholas Metropolis (1950s), Geman & Geman (1980s)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> Many probability distributions are <span className="text-indigo-200 font-semibold">too complex to sample directly</span>. How do we generate random samples from complicated distributions?</p>

                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4"><span className="text-yellow-400 font-bold">MCMC (Markov Chain Monte Carlo)</span> constructs a Markov chain whose stationary distribution is the target! Gibbs sampling and Metropolis-Hastings are workhorses of Bayesian inference.</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"Create a <strong className="text-white">random walk</strong> that explores the probability space. After burn-in, samples approximate the target distribution! <span className="text-yellow-400 font-bold">Clever proposal + acceptance rule</span> ensures correctness."</p>
                    </div>

                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>Metropolis-Hastings: propose + accept/reject</li>
                        <li>Gibbs sampling: sample each variable conditionally</li>
                        <li>Hamiltonian Monte Carlo: uses gradient info</li>
                        <li>Enables Bayesian inference for complex models!</li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Metropolis-Hastings</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                Propose x' ~ q(x'|x), Accept with prob α = min(1, P(x')q(x|x') / P(x)q(x'|x))
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Gibbs Sampling</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                Sample xᵢ ~ P(xᵢ|x₁,...,xᵢ₋₁,xᵢ₊₁,...,xₙ)
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Stationary Distribution</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                π(x) stationary if Σ P(x→y)π(x) = π(y)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Bayesian ML</h4>
                            <p className="text-sm">MCMC enables Bayesian deep learning, uncertainty quantification!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧬 Genomics</h4>
                            <p className="text-sm">Population genetics, phylogenetic inference use MCMC extensively!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">⚛️ Physics</h4>
                            <p className="text-sm">Statistical mechanics simulations, lattice QCD!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Statistics</h4>
                            <p className="text-sm">Bayesian regression, hierarchical models - MCMC makes them tractable!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SamplingSection;
