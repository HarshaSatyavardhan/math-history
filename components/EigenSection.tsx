import React from 'react';

const EigenSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-green-400 pl-4">Part II: The Geometrization of Problems — Linear Algebra and Transformations</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">3. The Invariant Directions: Eigenvalues and Eigenvectors</h3>
                    <p><strong>The Inventor:</strong> The core,  mathematical idea was first formulated by Augustin-Louis Cauchy in 1829. The concept was independently developed in mechanics to describe principal axes of rotation. The name "eigenvector," from the German <code className="bg-gray-700 p-1 rounded-md text-sm">eigen</code> for "own" or "proper," came much later, likely from the 20th-century school of David Hilbert.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Problem (The "Why")</h3>
                    <p>Cauchy was not merely manipulating matrices; he was tackling one of the most profound physics questions of his day: the long-term stability of the solar system.</p>
                    <p className="mt-4">His 1829 paper, "On the equation which helps one determine the secular inequalities in the movements of the planets", analyzed the "secular inequalities"—the slow, cumulative, non-periodic drifts in planetary orbits caused by the tiny gravitational tugs of other planets. To analyze this immensely complex, N-body system, Cauchy needed to find its "natural" axes of oscillation, the directions in which the system would vibrate "purely." These are its principal axes.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Story & Intuition (The "How")</h3>
                    <p>A matrix represents a linear transformation, which is a combination of rotating, stretching, and shearing space. Most vectors, when transformed, will point in a new direction.</p>
                    <p className="mt-4">Cauchy's realization was that for any such transformation, there must exist special, "proper" vectors that are invariant in direction. When the transformation is applied to them, these vectors are only scaled—that is, stretched, shrunk, or reversed.</p>
                    <ul className="list-disc list-inside ml-4 mt-4 space-y-2">
                        <li>An <strong className="text-white">Eigenvector</strong> is this invariant direction—the principal axis.</li>
                        <li>Its corresponding <strong className="text-white">Eigenvalue</strong> is the scaling factor—the amount it is stretched or shrunk.</li>
                    </ul>
                    <p className="mt-4">For Cauchy's planetary problem, the eigenvectors were the principal axes of the system's oscillations, and the eigenvalues were the frequencies of those oscillations. If the eigenvalues were all real and stable, the solar system would not tear itself apart.</p>
                    <p className="mt-4">This concept of decomposing a complex transformation into its "simplest" parts—its invariant directions—is the central tool of linear algebra. It is used to find the principal components of a dataset, the natural frequencies of a bridge, and the observable energy levels in quantum mechanics.</p>
                </div>
            </div>
        </section>
    );
};

export default EigenSection;
