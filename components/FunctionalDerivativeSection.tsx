import React from 'react';

const FunctionalDerivativeSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-pink-400 pl-4">Functional Analysis: Functional Derivatives</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition</h3>
                    <p>This is the core mechanism of the Calculus of Variations. A "functional" <code className="bg-gray-700 p-1 rounded-md text-sm">I[y]</code> is a "function of a function" (it maps a function to a number). The Euler-Lagrange Equation is the statement that the functional derivative of the Action functional is zero.</p>
                </div>
            </div>
        </section>
    );
};

export default FunctionalDerivativeSection;