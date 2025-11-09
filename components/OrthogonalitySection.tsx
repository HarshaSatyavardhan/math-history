import React from 'react';

const OrthogonalitySection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-blue-400 pl-4">The Geometry of Independence: Orthogonality</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventors & The Problem</h3>
                    <p>The basic concept of "perpendicularity" is from Euclid. Its generalization to abstract spaces, particularly orthogonal functions, was pioneered by Adrien-Marie Legendre and Pierre-Simon Laplace in the late 18th century.</p>
                    <p className="mt-4">Like Cauchy's work, this concept was born from celestial mechanics. A pressing 18th-century question was to determine the true shape of the Earth (which was known to be a spheroid, flattened at the poles) and, more difficultly, to calculate the gravitational attraction of this non-spherical body.</p>
                    <p className="mt-4">This problem required solving Newton's law of gravitation for complex shapes, leading to new types of differential equations. Legendre and Laplace discovered that the solutions could be expressed as an infinite series of special functions, now known as Legendre Polynomials.</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Story & Intuition</h3>
                    <p>Legendre's key discovery was that these polynomials possessed a unique property: they were <strong className="text-white">orthogonal</strong>.</p>
                    <p className="mt-4">"Orthogonality" is the generalization of "perpendicularity" to any number of dimensions, and even to infinite-dimensional function spaces.</p>
                    <ul className="list-disc list-inside ml-4 mt-4 space-y-2">
                        <li>In 3D, two vectors are orthogonal if their dot product is zero. They are geometrically independent.</li>
                        <li>In a function space, two functions <code className="bg-gray-700 p-1 rounded-md text-sm">f(x)</code> and <code className="bg-gray-700 p-1 rounded-md text-sm">g(x)</code> are defined as orthogonal if their inner product—the integral of their product, <code className="bg-gray-700 p-1 rounded-md text-sm">∫ f(x)g(x)w(x)dx</code>—is zero.</li>
                    </ul>
                    <p className="mt-4">Orthogonality is the mathematical formalization of independence and decomposition. It is the mechanism that allows us to break an impossibly complex, high-dimensional problem (like a signal or a quantum wavefunction) into a simple sum of 1D problems that can be solved individually.</p>
                </div>
            </div>
        </section>
    );
};

export default OrthogonalitySection;