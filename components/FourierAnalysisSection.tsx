import React from 'react';

const FourierAnalysisSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-purple-400 pl-4">Functional Analysis: Fourier Analysis</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventor & The Problem</h3>
                    <p><strong>Inventor:</strong> Joseph Fourier.</p>
                    <p className="mt-4"><strong>Problem:</strong> His 1822 <em className="italic">Théorie analytique de la chaleur</em> (The Analytical Theory of Heat) modeled heat diffusion.</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition</h3>
                    <p>The heat equation is linear. Sine and cosine functions are simple, stable solutions to the equation. Therefore, a sum of sines/cosines is also a solution. Fourier's revolutionary claim was that any initial temperature profile <code className="bg-gray-700 p-1 rounded-md text-sm">f(x)</code> could be written as such a sum (a Fourier Series). This allows one to solve a complex diffusion problem by decomposing it into an infinite sum of simple problems. In the language of functional analysis, the sines and cosines form an orthogonal basis for the Hilbert space of functions.</p>
                </div>
            </div>
        </section>
    );
};

export default FourierAnalysisSection;