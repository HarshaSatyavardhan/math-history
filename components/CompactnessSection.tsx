import React from 'react';

const CompactnessSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-rose-400 pl-4">The Logic of Proximity: Compactness</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventor & The Problem</h3>
                    <p><strong>Inventor:</strong> Maurice Fréchet (1906).</p>
                    <p className="mt-4"><strong>Problem:</strong> To generalize the useful properties of closed and bounded sets (like the interval [0,1]) from the real line to abstract spaces, especially function spaces.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition & The "Aha!" Moment</h3>
                    <p>Compactness is the topological generalization of "finiteness". A key (but not only) property is that any infinite sequence in a compact set must have a "limit point" inside the set (it can't "escape" to infinity or to a "hole").</p>
                    <p className="mt-4">The user query correctly identifies its main purpose: "why optimization minima exist." The <strong className="text-white">Extreme Value Theorem</strong> states that a continuous function on a compact set is guaranteed to achieve its maximum and minimum values. This is the fundamental guarantee that a minimum exists for an optimization algorithm to find.</p>
                </div>
            </div>
        </section>
    );
};

export default CompactnessSection;