import React from 'react';

const LikelihoodSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-violet-400 pl-4">8. The Logic of Inference: Likelihood</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventor & The Problem</h3>
                    <p><strong>The Inventor:</strong> R.A. Fisher.</p>
                    <p className="mt-4"><strong>The Problem:</strong> Fisher fundamentally rejected the "inverse probability" (Bayesian) methods popular in his time. He argued that assigning a "prior probability" to a parameter (e.g., "all values of this parameter are equally likely") was an arbitrary assumption "devoid of foundation".</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Story & Intuition</h3>
                    <p>Fisher needed a new, more objective foundation for statistical estimation. He provided it in his revolutionary 1922 paper, "On the Mathematical Foundations of Theoretical Statistics". This single paper introduced the modern statistical concepts of "parameter," "sufficiency," "efficiency," and "likelihood".</p>
                    <p className="mt-4">His idea was to flip the question:</p>
                    <ul className="list-disc list-inside ml-4 mt-4 space-y-2">
                        <li><strong>Probability <code className="bg-gray-700 p-1 rounded-md text-sm">P(data | θ)</code>:</strong> "Given a fair coin (<code className="bg-gray-700 p-1 rounded-md text-sm">θ = 0.5</code>), what is the probability of 3 heads in 4 flips?"</li>
                        <li><strong>Likelihood <code className="bg-gray-700 p-1 rounded-md text-sm">L(θ | data)</code>:</strong> "I observed 3 heads in 4 flips. What is the likelihood that the coin is fair (<code className="bg-gray-700 p-1 rounded-md text-sm">θ = 0.5</code>)? What is the likelihood that it's biased (<code className="bg-gray-700 p-1 rounded-md text-sm">θ = 0.75</code>)?".</li>
                    </ul>
                    <p className="mt-4">The likelihood function is not a probability. It is a function of the parameter (<code className="bg-gray-700 p-1 rounded-md text-sm">θ</code>). The <strong className="text-white">Maximum Likelihood Estimate (MLE)</strong> is simply the value of <code className="bg-gray-700 p-1 rounded-md text-sm">θ</code> that makes the data we actually observed most probable.</p>
                </div>
            </div>
        </section>
    );
};

export default LikelihoodSection;