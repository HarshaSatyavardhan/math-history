import React from 'react';

const ProjectionsSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-purple-400 pl-4">The Geometry of Independence: Projections</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">Intuition: Decomposing the Complex</h3>
                    <p>In 3D, any vector can be "decomposed" by projecting it onto the orthogonal x, y, and z axes. The coordinates of the vector are simply the lengths of these projections.</p>
                    <p className="mt-4">Orthogonality allows for the exact same decomposition of a complex function. A signal can be broken down into a sum of simple, orthogonal "basis" functions (like the sines and cosines in a Fourier Series, or the Legendre Polynomials).</p>
                    <p className="mt-4">The coefficients of this series are found by "projecting" the complex function onto each simple basis function. This is the core mechanism that makes techniques like Fourier analysis possible.</p>
                </div>
            </div>
        </section>
    );
};

export default ProjectionsSection;