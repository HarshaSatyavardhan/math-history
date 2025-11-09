import React from 'react';

const CovarianceSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">The Birth of Probability: Covariance</h2>

            <div className="space-y-8 text-lg text-gray-300">
                 <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventor & The Problem</h3>
                    <p><strong className="text-white">The "Who":</strong> Francis Galton, Charles Darwin's cousin, invented the concept (as "co-relation") in the 1880s.</p>
                    <p className="mt-4"><strong className="text-white">The Problem:</strong> Galton was obsessed with heredity and eugenics. He wanted to quantify the relationship between the traits of one generation and the next (e.g., do taller fathers have taller sons?). He needed a single number to measure how two variables vary together.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition</h3>
                    <p>Covariance measures the direction of a linear relationship (positive or negative), while its normalized version, correlation, measures the strength (from -1 to 1). This work also led Galton to discover the "regression toward the mean".</p>
                </div>
            </div>
        </section>
    );
};

export default CovarianceSection;