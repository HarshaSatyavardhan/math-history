import React from 'react';

const GeodesicsSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-400 pl-4">The Fabric of Reality: Geodesics</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">Intuition</h3>
                    <p>A geodesic is the generalization of a "straight line". It is the path of locally shortest distance between two points on the manifold. The problem of finding such lines was first studied by Johann Bernoulli in 1697.</p>
                    <p className="mt-4">Einstein realized that a particle "in orbit" (which Newton saw as a force) is simply a particle moving along a geodesic (the "straightest possible path") through this curved spacetime. Riemann's 1854 pure mathematics became the physical fabric of reality.</p>
                </div>
            </div>
        </section>
    );
};

export default GeodesicsSection;