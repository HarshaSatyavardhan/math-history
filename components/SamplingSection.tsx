import React from 'react';

const SamplingSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-yellow-400 pl-4">The Logic of Inference: Sampling</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventors & The Problem</h3>
                    <p><strong>The Inventors:</strong> While John Graunt (1662) took an early sample, the "representative method" was first proposed by Anders Kiaer (1895). It was Jerzy Neyman (1930s) who gave it a rigorous mathematical foundation.</p>
                    <p className="mt-4"><strong>The Problem:</strong> A full census is costly, slow, and often impossible.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition</h3>
                    <p>Kiaer argued that a "representative" sample could replace a full enumeration. But Neyman's breakthrough was to insist on <strong className="text-white">probability-based sampling</strong> (random, stratified, etc.). By using randomization, Neyman could apply the laws of probability (the LLN and CLT) to make valid inferences about the entire population from the subset, and, most importantly, to quantify the uncertainty (sampling error, confidence intervals) of those inferences.</p>
                </div>
            </div>
        </section>
    );
};

export default SamplingSection;