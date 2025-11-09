import React from 'react';

const JacobianSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-400 pl-4">Mapping Change: The Jacobian</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventor & The Problem</h3>
                    <p>The Jacobian is named for Carl Gustav Jacob Jacobi, a towering figure in 19th-century mathematics, working on problems from number theory to celestial mechanics. His "functional determinant" arose as a practical tool for a common, difficult problem: changing variables in multiple integrals.</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition</h3>
                    <p>The Jacobian is the multivariable generalization of the familiar u-substitution from single-variable calculus.</p>
                    <p className="mt-4">In one dimension, if <code className="bg-gray-700 p-1 rounded-md text-sm">x = g(u)</code>, the "scaling factor" that adjusts the differential is <code className="bg-gray-700 p-1 rounded-md text-sm">dx = g'(u)du</code>. The derivative <code className="bg-gray-700 p-1 rounded-md text-sm">g'(u)</code> is the local ratio of lengths.</p>
                    <p className="mt-4">In multiple dimensions (e.g., transforming from Cartesian coordinates <code className="bg-gray-700 p-1 rounded-md text-sm">(x, y)</code> to polar coordinates <code className="bg-gray-700 p-1 rounded-md text-sm">(r, θ)</code>), the Jacobian matrix is the matrix of all first-order partial derivatives. It acts as the best linear approximation of this complex, non-linear transformation at a single point.</p>
                    <p className="mt-4">The <strong className="text-white">Jacobian determinant</strong> is the local ratio of volumes (or areas). It is the scaling factor that tells you how an infinitesimal square in the <code className="bg-gray-700 p-1 rounded-md text-sm">(r, θ)</code> coordinate system is stretched, shrunk, and sheared into a tiny, distorted parallelogram in the <code className="bg-gray-700 p-1 rounded-md text-sm">(x, y)</code> system.</p>
                </div>
            </div>
        </section>
    );
};

export default JacobianSection;