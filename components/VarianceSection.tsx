import React from 'react';

const VarianceSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-rose-400 pl-4">The Birth of Probability: Variance</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventor & The Problem</h3>
                    <p><strong className="text-white">The "Who":</strong> R.A. Fisher, arguably the father of modern statistics, formalized variance in the 1920s.</p>
                    <p className="mt-4"><strong className="text-white">The Problem:</strong> Fisher worked at the Rothamsted Agricultural Experiment Station. He was faced with messy, real-world data on crop yields and needed to answer a simple question: did the new fertilizer cause a better yield, or was the difference just due to random, natural variability?.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition</h3>
                    <p>Fisher invented the <strong className="text-white">Analysis of Variance (ANOVA)</strong>. His revolutionary idea was to partition the total "spread" of the data (variance) into its component parts: the variance <em className="italic">between</em> the test groups (the fertilizer) and the variance <em className="italic">within</em> each group (the random error). By comparing this ratio (the F-statistic), he could determine, with a specified probability, whether the fertilizer's effect was "statistically significant". This transformed statistics from a descriptive tool into a causal, inferential one.</p>
                </div>
            </div>
        </section>
    );
};

export default VarianceSection;