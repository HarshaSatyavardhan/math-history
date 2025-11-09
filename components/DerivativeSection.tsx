import React from 'react';
import VisualizationCard from './VisualizationCard';

const DerivativeVisualizations: React.FC = () => {
    const vizData = [
        {
            title: "1. Bad Guess (Secant Line)",
            description: "The average slope between two distant points.",
            svg: (
                <svg viewBox="0 0 300 200" className="w-full h-auto rounded" aria-labelledby="title1" role="img">
                    <title id="title1">A bad approximation of slope</title>
                    <path d="M 50 150 Q 150 50 250 150" stroke="#f0abfc" strokeWidth="3" fill="none" />
                    <line x1="75" y1="122" x2="225" y2="122" stroke="#f87171" strokeWidth="3" strokeDasharray="5,5" />
                    <circle cx="75" cy="122" r="5" fill="#f87171" />
                    <circle cx="225" cy="122" r="5" fill="#f87171" />
                </svg>
            )
        },
        {
            title: "2. Better Guess (Zoom In)",
            description: "The points are moved closer, giving a better approximation.",
            svg: (
                <svg viewBox="0 0 300 200" className="w-full h-auto rounded" aria-labelledby="title2" role="img">
                    <title id="title2">A better approximation of slope</title>
                    <path d="M 50 150 Q 150 50 250 150" stroke="#f0abfc" strokeWidth="3" fill="none" />
                    <line x1="120" y1="69" x2="180" y2="69" stroke="#fb923c" strokeWidth="3" strokeDasharray="5,5" />
                    <circle cx="120" cy="69" r="5" fill="#fb923c" />
                    <circle cx="180" cy="69" r="5" fill="#fb923c" />
                </svg>
            )
        },
        {
            title: "3. Perfect! (Tangent Line)",
            description: "At an infinitely small gap, the line shows the *exact* slope at one point.",
            svg: (
                <svg viewBox="0 0 300 200" className="w-full h-auto rounded" aria-labelledby="title3" role="img">
                    <title id="title3">A perfect 'tangent' line for slope</title>
                    <path d="M 50 150 Q 150 50 250 150" stroke="#f0abfc" strokeWidth="3" fill="none" />
                    <line x1="100" y1="50" x2="200" y2="50" stroke="#4ade80" strokeWidth="3" />
                    <circle cx="150" cy="50" r="5" fill="#4ade80" />
                </svg>
            )
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {vizData.map((item, index) => (
                <VisualizationCard key={index} title={item.title} description={item.description}>
                    {item.svg}
                </VisualizationCard>
            ))}
        </div>
    );
};


const DerivativeSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-cyan-400 pl-4">Problem: The "Change" Problem (Derivatives)</h2>

            <p className="text-lg text-gray-300 mb-6">This is the first big question. The question is: <strong>"How fast is something changing at one specific instant?"</strong></p>

            <p className="text-lg text-gray-300 mb-6"><strong>The Analogy:</strong> If you have a graph of your car's <strong>total distance</strong> traveled, how can you find your <strong>exact speed</strong> at 3:00 PM? Finding an "average" speed (e.g., "we traveled 120 miles in 2 hours") is easy. But calculus lets us find the *exact* speed at *one* instant.</p>

            <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-white mb-4">The "Aha!" Moment: Zooming In</h3>
                <p className="text-gray-300 mb-6">The big idea was to "zoom in" closer and closer. They took two points on the curve (two moments in time) and moved them infinitely close together until they essentially became one. The slope of the line connecting them became the *perfect* slope—the instantaneous speed—at that single point.</p>

                <DerivativeVisualizations />

                <div className="mt-8 p-6 bg-gradient-to-r from-cyan-900 to-gray-800 rounded-lg">
                    <h4 className="text-2xl font-bold text-cyan-300">This is the DERIVATIVE</h4>
                    <p className="text-lg text-cyan-100 mt-2">It's a "machine" (a formula) that takes a "path" function (like position) and gives you a new function for its <strong>instantaneous slope</strong> (like speed).</p>
                </div>
            </div>
        </section>
    );
};

export default DerivativeSection;