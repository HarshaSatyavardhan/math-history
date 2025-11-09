import React from 'react';

const FixedPointTheoremSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-amber-400 pl-4">The Logic of Proximity: Fixed-Point Theorems</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Inventors & The Problem</h3>
                    <p><strong>The Inventors:</strong> Henri Poincaré (1880s), L.E.J. Brouwer (1911), and Stefan Banach (1922).</p>
                    <p className="mt-4"><strong>The Problem:</strong> The original motivation was not game theory. It was the study of differential equations. Poincaré and Picard were studying the stability of the solar system and needed topological methods to prove that solutions (stable orbits) exist.</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition</h3>
                    <p>A fixed point is a point <code className="bg-gray-700 p-1 rounded-md text-sm">x</code> such that <code className="bg-gray-700 p-1 rounded-md text-sm">f(x) = x</code>.</p>
                    <ul className="list-disc list-inside ml-4 mt-4 space-y-2">
                        <li><strong>Brouwer's Theorem:</strong> A continuous map from a compact, convex set (like a full disk) to itself must have at least one fixed point. (Intuitively: you cannot stir a cup of coffee without some particle ending up exactly where it started).</li>
                        <li><strong>Banach's Theorem:</strong> A contraction mapping (a function that pulls points closer together) on a complete metric space has one and only one fixed point. This is the basis for many iterative algorithms.</li>
                    </ul>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Game Theory Connection</h3>
                    <p><strong>Inventor:</strong> John Nash (1950).</p>
                    <p className="mt-4"><strong>The Story:</strong> Nash wanted to prove that every finite game (with any number of players) has at least one stable equilibrium.</p>
                    <p className="mt-4"><strong>The Intuition:</strong> He defined a "best response" function <code className="bg-gray-700 p-1 rounded-md text-sm">r(s)</code> that takes the current set of all players' strategies (<code className="bg-gray-700 p-1 rounded-md text-sm">s</code>) and maps it to the new set of best-response strategies (<code className="bg-gray-700 p-1 rounded-md text-sm">r(s)</code>). The set of all (mixed) strategies in a game is a compact and convex set.</p>
                    <p className="mt-4">A <strong className="text-white">Nash Equilibrium</strong> is a state <code className="bg-gray-700 p-1 rounded-md text-sm">s*</code> where no player wishes to change their strategy, given what everyone else is doing. This is, by definition, a fixed point of the best-response function: <code className="bg-gray-700 p-1 rounded-md text-sm">r(s*) = s*</code>. Nash used Brouwer's theorem to prove that such a fixed point must always exist. This provided the fundamental guarantee for all of modern game theory, connecting 19th-century topology directly to 20th-century economics.</p>
                </div>
            </div>
        </section>
    );
};

export default FixedPointTheoremSection;