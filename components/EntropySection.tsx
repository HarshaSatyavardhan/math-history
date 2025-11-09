import React from 'react';
import { EntropyVisualization } from './domains/information-theory/EntropyVisualization';

const EntropySection: React.FC = () => {
    return (
        <section id="entropy" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-blue-400 pl-4">Part V: The Measure of Meaning — Information Theory</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventor & The Problem</h3>
                    <p>This entire field was created almost single-handedly by one man, in one paper, to solve one problem. The Inventor: <strong className="text-white">Claude Shannon</strong>.</p>
                    <p className="mt-4"><strong>The Problem (The "Why"):</strong> Shannon was an engineer at Bell Telephone Laboratories. He sought a grand unified theory of communication. As he defined it, the "fundamental problem of communication is that of reproducing at one point either exactly or approximately a message selected at another point"—all in the presence of noise.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Story & The Central Insight</h3>
                    <p>Shannon's 1948 paper, "A Mathematical Theory of Communication", laid the entire foundation for the digital age. It introduced the word "bit" as the fundamental unit of information.</p>
                    <p className="mt-4">Shannon's genius was to divorce information from meaning. He stated that the "semantic aspects of communication are irrelevant to the engineering problem". The key to quantifying information is uncertainty. A message only contains "information" if it resolves uncertainty for the receiver. An event that is certain (<code className="bg-gray-700 p-1 rounded-md text-sm">p=1</code>) provides zero information. A highly "surprising" event (<code className="bg-gray-700 p-1 rounded-md text-sm">p</code> is low) provides a great deal of information.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">Shannon Entropy</h3>
                    <p><code className="bg-gray-700 p-1 rounded-md text-sm">H(p) = -Σ p(x) log p(x)</code>. This is the average uncertainty or "expected surprise" of a probability distribution. Its practical, concrete meaning is the fundamental lower bound on the average number of bits required to losslessly encode messages from that source. A fair coin (<code className="bg-gray-700 p-1 rounded-md text-sm">p(H)=0.5, p(T)=0.5</code>) has an entropy of 1 bit, because you need (on average) 1 bit to communicate its outcome.</p>
                    <p className="mt-4">This section also touches on Statistical Entropy, developed by Ludwig Boltzmann, which connects the macroscopic property of thermodynamic entropy to the number of microscopic arrangements ("microstates") of atoms. The formula for Gibbs Entropy is mathematically identical to Shannon's Information Entropy.</p>
                </div>

                {/* Interactive Visualization */}
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">Interactive: Entropy Explorer</h3>
                    <p className="mb-4">Experiment with different probability distributions and see how entropy changes in real-time!</p>
                    <EntropyVisualization />
                </div>
            </div>
        </section>
    );
};

export default EntropySection;