import React from 'react';

const RiemannianMetricSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-green-400 pl-4">The Fabric of Reality: Riemannian Metric</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">Intuition</h3>
                    <p>The Riemannian Metric (<code className="bg-gray-700 p-1 rounded-md text-sm">g</code>) is the engine of Riemannian geometry. It is an inner product (a dot product) defined on each tangent space, which varies smoothly from point to point. The metric <code className="bg-gray-700 p-1 rounded-md text-sm">g</code> is the local "ruler" that allows one to measure the lengths of tangent vectors and the angles between them. With <code className="bg-gray-700 p-1 rounded-md text-sm">g</code>, one can now define the length of any curve on the manifold.</p>
                    <p className="mt-4">In a profound convergence, Einstein realized that spacetime is a 4-dimensional Riemannian manifold, and the "gravitational field" is the Riemannian metric tensor (<code className="bg-gray-700 p-1 rounded-md text-sm">g</code>).</p>
                </div>
            </div>
        </section>
    );
};

export default RiemannianMetricSection;