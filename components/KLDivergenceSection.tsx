import React from 'react';

const KLDivergenceSection: React.FC = () => {
    return (
        <section id="kl-divergence" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-teal-400 pl-4">Kullback-Leibler (KL) Divergence</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventors & Intuition</h3>
                    <p><strong>Inventors:</strong> Solomon Kullback and Richard Leibler (1951).</p>
                    <p className="mt-4"><strong>Intuition:</strong> This measures the "distance" (though it is not a true distance, as it's asymmetric) or information loss when you approximate a true distribution P with a model distribution Q.</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The "Coding" Intuition</h3>
                    <p>The most powerful intuition is this: <code className="bg-gray-700 p-1 rounded-md text-sm">D_KL(P||Q)</code> is the average number of "extra bits" you will waste per message if you design your encoding scheme (like Morse code) to be optimal for Q, when the real distribution of messages is P.</p>
                </div>
            </div>
        </section>
    );
};

export default KLDivergenceSection;