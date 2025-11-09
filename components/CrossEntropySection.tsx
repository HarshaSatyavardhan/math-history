import React from 'react';

const CrossEntropySection: React.FC = () => {
    return (
        <section id="cross-entropy" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-rose-400 pl-4">Cross-Entropy</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">Intuition</h3>
                    <p><code className="bg-gray-700 p-1 rounded-md text-sm">H(P,Q) = -Σ p(x) log q(x)</code>. This is the average number of bits needed to encode data from the true distribution P using an approximate code designed for the model distribution Q.</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The "Great Convergence" with Machine Learning</h3>
                    <p>The relationship between these concepts is the key to modern machine learning. The mathematical identity is:</p>
                    <p className="my-4 p-4 bg-gray-900 rounded-md text-center font-mono text-white text-xl">H(P,Q) = H(P) + D_KL(P||Q)</p>
                    <p className="text-center italic">(Cross-Entropy) = (True Entropy) + (KL Divergence)</p>
                    <p className="mt-4">In a machine learning classification problem, P is the true distribution (the "ground truth" data). Q is the model's predicted distribution. The goal of training is to make the model Q as close as possible to the truth P. This means we want to minimize the KL Divergence, <code className="bg-gray-700 p-1 rounded-md text-sm">D_KL(P||Q)</code>.</p>
                    <p className="mt-4">Looking at the identity, <code className="bg-gray-700 p-1 rounded-md text-sm">H(P)</code>—the entropy of the true data—is a fixed constant. We can't change it. Therefore, minimizing the Cross-Entropy <code className="bg-gray-700 p-1 rounded-md text-sm">H(P,Q)</code> is mathematically identical to minimizing the KL Divergence.</p>
                    <p className="mt-4">Because <code className="bg-gray-700 p-1 rounded-md text-sm">H(P,Q)</code> is simpler to compute, it has become the de facto loss function for virtually all modern classification models, from logistic regression to the largest neural networks. This provides a direct, unbroken line from 1940s communication theory to 21st-century artificial intelligence.</p>
                </div>
            </div>
        </section>
    );
};

export default CrossEntropySection;