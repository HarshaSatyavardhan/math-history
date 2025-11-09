import React from 'react';

const TangentSpaceSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-indigo-400 pl-4">The Fabric of Reality: Tangent Space</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">Intuition</h3>
                    <p>A manifold M (a curved space) is locally approximated at every point p by a flat, Euclidean vector space that contains all the "directional velocities" possible at that point. This is the Tangent Space <code className="bg-gray-700 p-1 rounded-md text-sm">T_p M</code>.</p>
                </div>
            </div>
        </section>
    );
};

export default TangentSpaceSection;