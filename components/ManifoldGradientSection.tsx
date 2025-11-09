import React from 'react';

const ManifoldGradientSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-yellow-400 pl-4">The Fabric of Reality: Gradient on Manifolds</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">Intuition</h3>
                    <p>The concept of a gradient is generalized to manifolds using the metric <code className="bg-gray-700 p-1 rounded-md text-sm">g</code>, which "translates" the derivative (a "covector") into a proper tangent vector that "points" in the direction of steepest ascent.</p>
                </div>
            </div>
        </section>
    );
};

export default ManifoldGradientSection;