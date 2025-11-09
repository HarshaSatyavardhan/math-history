import React from 'react';

const CentralLimitTheoremSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-pink-400 pl-4">The Guarantees of Stability: Central Limit Theorem (CLT)</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventor & The Problem</h3>
                    <p><strong>The Inventor:</strong> Abraham de Moivre, later generalized by Pierre-Simon Laplace.</p>
                    <p className="mt-4"><strong>The Problem:</strong> De Moivre's problem was computational, not philosophical. As a consultant for high-stakes gamblers, he needed to calculate binomial probabilities for large n (e.g., the chance of 5,500 heads in 10,000 coin flips). Calculating this directly with factorials was impossible.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Story & Intuition</h3>
                    <p>In his 1733 book <em className="italic">The Doctrine of Chances</em>, de Moivre discovered that the Normal Distribution (the "bell curve," which he was the first to identify) provided a remarkably accurate approximation.</p>
                    <p className="mt-4">Laplace generalized this, proving the <strong className="text-white">Central Limit Theorem</strong>: This convergence to a bell curve was not just a trick for coin flips. The sum (or average) of any set of independent and identically distributed random variables will be approximately normally distributed, regardless of the original distribution, as long as the sample size is large enough.</p>
                    <p className="mt-4">The LLN and CLT work as a "one-two punch." The LLN tells you that your sample mean will be close to the true mean. The CLT tells you how it's distributed around that true mean: it gives you the shape of the error (a normal distribution), which is what allows for the calculation of confidence intervals and p-values.</p>
                </div>
            </div>
        </section>
    );
};

export default CentralLimitTheoremSection;