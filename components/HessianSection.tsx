import React from 'react';

const HessianSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-teal-400 pl-4">Mapping Change: The Hessian</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventor & The Problem</h3>
                    <p>Named for Ludwig Otto Hesse, a student of Jacobi, the Hessian was developed to solve the central problem of optimization: finding the maxima and minima of functions of many variables.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition</h3>
                    <p>The Hessian is the multivariable second derivative test.</p>
                    <p className="mt-4">In one dimension, <code className="bg-gray-700 p-1 rounded-md text-sm">f'(x) = 0</code> finds a critical point. The second derivative, <code className="bg-gray-700 p-1 rounded-md text-sm">f''(x)</code>, determines its nature (minimum, maximum, or inflection) by describing its curvature (concave up or down).</p>
                    <p className="mt-4">In multiple dimensions, the Hessian matrix is the matrix of all second-order partial derivatives. It provides a complete description of the local curvature of the function's "landscape" at a critical point.</p>
                    <p className="mt-4">This multivariable second derivative test is interpreted through the Hessian's eigenvalues. At a critical point, the eigenvectors of the Hessian point in the directions of principal (greatest and least) curvature. The eigenvalues specify the amount of curvature in those directions.</p>
                    <ul className="list-disc list-inside ml-4 mt-4 space-y-2">
                        <li>If all eigenvalues are positive, the surface curves up in all directions: a <strong className="text-white">local minimum</strong>.</li>
                        <li>If all are negative, it curves down: a <strong className="text-white">local maximum</strong>.</li>
                        <li>If the eigenvalues are mixed (some positive, some negative), it is a <strong className="text-white">saddle point</strong>.</li>
                    </ul>
                    <p className="mt-4">This tool is the foundation of modern numerical optimization.</p>
                </div>
            </div>
        </section>
    );
};

export default HessianSection;