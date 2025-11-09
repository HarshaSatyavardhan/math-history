import React from 'react';

const OpenClosedSetsSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">11. The Logic of Proximity: Open and Closed Sets</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Problem (The "Why")</h3>
                    <p>In the late 19th century, mathematicians like Georg Cantor and Karl Weierstrass needed to define continuity and convergence with absolute rigor, but without always having to use the concept of distance (a "metric").</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Concepts & Intuition (The "What" and "How")</h3>
                    <p><strong>Inventor:</strong> Georg Cantor (1872); the terms were coined later by René Baire (1899) and Henri Lebesgue.</p>
                    <p className="mt-4"><strong>Intuition:</strong> Cantor, studying sets of points on the real line, defined a <strong className="text-white">closed set</strong> as one that contains all of its "limit points". An <strong className="text-white">open set</strong> is the complement of a closed set. Felix Hausdorff (1914) used this "open set" idea as the foundation for a <strong className="text-white">Topological Space</strong>—a set where we just define a collection of subsets as "open," which in turn rigorously defines "nearness" and continuity.</p>
                </div>
            </div>
        </section>
    );
};

export default OpenClosedSetsSection;