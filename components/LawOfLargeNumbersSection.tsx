import React from 'react';

const LawOfLargeNumbersSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-indigo-400 pl-4">7. The Guarantees of Stability: Law of Large Numbers (LLN)</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventor & The Problem</h3>
                    <p><strong>The Inventor:</strong> Jacob Bernoulli.</p>
                    <p className="mt-4"><strong>The Problem:</strong> Bernoulli was deeply troubled by the gap between theoretical probability (e.g., a 50% chance of heads) and empirical reality. He was haunted by the lack of a proof that sampling actually works. His motivating problem was the urn: If an urn contains an unknown ratio of black to white balls, can one become "morally certain" of the true ratio simply by drawing enough samples (with replacement)?.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Story & Intuition</h3>
                    <p>Bernoulli spent 20 years on this proof. He called it his "Golden Theorem," and it was the crowning achievement of his 1713 book, <em className="italic">Ars Conjectandi</em> ("The Art of Conjecturing").</p>
                    <p className="mt-4">The LLN is the fundamental guarantee that bridges probability and the real world. It proves that as the number of trials (n) approaches infinity, the sample average is guaranteed to converge to the true expected value. It is why a casino knows it will win in the long run.</p>
                </div>
            </div>
        </section>
    );
};

export default LawOfLargeNumbersSection;