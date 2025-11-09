import React from 'react';

const MarginalLikelihoodSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-emerald-400 pl-4">The Logic of Inference: Marginal Likelihood</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventor & The Problem</h3>
                    <p>This is a fundamentally Bayesian concept, formalized by figures like Harold Jeffreys in 1935. The problem it solves is model selection.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition</h3>
                    <p>Instead of finding the best parameter <code className="bg-gray-700 p-1 rounded-md text-sm">θ</code>, the marginal likelihood integrates out all possible values of <code className="bg-gray-700 p-1 rounded-md text-sm">θ</code>. This gives the probability of the data given the entire model, <code className="bg-gray-700 p-1 rounded-md text-sm">P(data | M)</code>.</p>
                    <p className="mt-4">Its primary purpose is <strong className="text-white">model selection</strong>. By comparing <code className="bg-gray-700 p-1 rounded-md text-sm">P(data | M₁)</code> to <code className="bg-gray-700 p-1 rounded-md text-sm">P(data | M₂)</code>, one can see which model provides a better "fit" or "evidence" for the data that was observed. It naturally penalizes overly complex models, embodying Ockham's razor.</p>
                </div>
            </div>
        </section>
    );
};

export default MarginalLikelihoodSection;