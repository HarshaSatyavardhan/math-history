import React from 'react';

const MutualInformationSection: React.FC = () => {
    return (
        <section id="mutual-information" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-amber-400 pl-4">Mutual Information</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">Intuition</h3>
                    <p>Mutual Information (<code className="bg-gray-700 p-1 rounded-md text-sm">I(X;Y)</code>) was defined by Shannon, with the term coined by Robert Fano. It measures the "mutual dependence" or reduction in uncertainty about variable X that comes from knowing variable Y.</p>
                    <p className="mt-4">It is formally <code className="bg-gray-700 p-1 rounded-md text-sm">I(X;Y) = H(X) - H(X|Y)</code> (the Entropy of X minus the Entropy of X given Y).</p>
                </div>
            </div>
        </section>
    );
};

export default MutualInformationSection;