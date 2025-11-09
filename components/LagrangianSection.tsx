import React from 'react';

const LagrangianSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-amber-400 pl-4">The Tool for Constraints: Lagrange Multipliers</h2>
            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Origin Story & Problem</h3>
                    <p>Lagrange invented the necessary tool for handling constraints years earlier, in a different field: statics. He was trying to find the equilibrium (a minimum of potential energy) for a system of points that were constrained (e.g., connected by rigid rods).</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Intuition (The "Why it Works")</h3>
                    <p>The method of Lagrange multipliers is a strategy for converting a constrained optimization problem into an unconstrained one. The intuition is purely geometric:</p>
                    <ul className="list-disc list-inside ml-4 mt-4 space-y-2">
                        <li>Imagine the function you want to maximize, <code className="bg-gray-700 p-1 rounded-md text-sm">f(x,y)</code>, as a "hill" (represented by its contour lines).</li>
                        <li>Imagine your constraint, <code className="bg-gray-700 p-1 rounded-md text-sm">g(x,y) = c</code>, as a "fence" drawn on that hill.</li>
                    </ul>
                    <p className="mt-4">You are looking for the highest point on the fence. This point must occur where the fence runs <strong className="text-white">tangent</strong> to a contour line of the hill. If it weren't tangent, you could move along the fence and go "uphill" to a higher point.</p>
                    <p className="mt-4">The gradient (<code className="bg-gray-700 p-1 rounded-md text-sm">∇f</code>) always points in the steepest "uphill" direction, which is perpendicular to the contour lines. The gradient of the constraint (<code className="bg-gray-700 p-1 rounded-md text-sm">∇g</code>) is, likewise, perpendicular to the "fence" line.</p>
                    <p className="mt-4">At that optimal tangent point, <code className="bg-gray-700 p-1 rounded-md text-sm">∇f</code> and <code className="bg-gray-700 p-1 rounded-md text-sm">∇g</code> must be pointing in the exact same (or opposite) direction. They are parallel.</p>
                    <p className="mt-4">The <strong className="text-white">Lagrange Multiplier (λ)</strong> is simply the "indeterminate multiplier", the scalar constant, that formalizes this parallel relationship: <code className="bg-gray-700 p-1 rounded-md text-sm">∇f = λ∇g</code>.</p>
                </div>
            </div>
        </section>
    );
};

export default LagrangianSection;