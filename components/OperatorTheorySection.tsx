import React from 'react';

const OperatorTheorySection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-teal-400 pl-4">Functional Analysis: Operator Theory</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition</h3>
                    <p>This is the generalization of matrices to infinite dimensions. An operator T (like the derivative d/dx) is a transformation that maps one function (a "vector") to another function (<code className="bg-gray-700 p-1 rounded-md text-sm">Tf = g</code>). Hilbert developed "spectral theory" to find the "eigenvectors" (eigenfunctions) and "eigenvalues" of these operators.</p>
                </div>
            </div>
        </section>
    );
};

export default OperatorTheorySection;