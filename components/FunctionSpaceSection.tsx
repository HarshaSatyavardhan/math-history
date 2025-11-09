import React from 'react';

const FunctionSpaceSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-blue-400 pl-4">10. The Infinite-Dimensional World: Functional Analysis</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventors & The Problem</h3>
                    <p><strong>The Inventors:</strong> David Hilbert and Stefan Banach.</p>
                    <p className="mt-4"><strong>The Problem (The "Why"):</strong> The core idea of functional analysis is to treat an entire function <code className="bg-gray-700 p-1 rounded-md text-sm">f(x)</code> as a single point (a "vector") in an infinite-dimensional space.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Concepts</h3>
                    <ul className="list-disc list-inside ml-4 mt-4 space-y-2">
                        <li><strong>Hilbert Space:</strong> A complete vector space with an inner product. The inner product (e.g., <code className="bg-gray-700 p-1 rounded-md text-sm">⟨f, g⟩ = ∫ f(x)g(x)dx</code>) generalizes the dot product, giving this infinite-dimensional space a geometry with "length" and "angle" (orthogonality).</li>
                        <li><strong>Banach Space:</strong> A complete vector space with a norm (length), but not necessarily an inner product (angle).</li>
                    </ul>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Quantum Connection (The "Aha!" Moment)</h3>
                    <p>Hilbert developed his "spectral analysis" of operators on Hilbert spaces for "purely mathematical interests," namely, to solve integral equations. He was reportedly astonished when it was discovered decades later that this was the exact mathematical framework required for Quantum Mechanics.</p>
                    <ul className="list-disc list-inside ml-4 mt-4 space-y-2">
                        <li>The "state" of a particle (its wavefunction) is a "vector" in a Hilbert Space.</li>
                        <li>Physical "observables" (like energy, momentum, or position) are represented by Operators on that space.</li>
                        <li>The measurable values of that observable are the Eigenvalues (the "spectrum") of that operator.</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FunctionSpaceSection;