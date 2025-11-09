import React from 'react';

const ConnectednessSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-emerald-400 pl-4">The Logic of Proximity: Connectedness</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventor & Intuition</h3>
                    <p><strong>Inventor:</strong> Johann Listing (1847), further developed by Cantor.</p>
                    <p className="mt-4"><strong>Intuition:</strong> A space is disconnected if it can be split into two disjoint, non-empty open sets. If not, it is connected. This abstract property is the formal guarantee for the <strong className="text-white">Intermediate Value Theorem</strong>. This, in turn, is the reason a gradient-based optimizer can "traverse a space smoothly" without getting "stuck" by a sudden, uncrossable gap.</p>
                </div>
            </div>
        </section>
    );
};

export default ConnectednessSection;