import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const GeodesicsSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-red-400 pl-4">The Straightest Path in Curved Space: Geodesics</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🌍 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Pioneers:</strong> Johann Bernoulli (1697), Bernhard Riemann (1854)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> In flat Euclidean space, the shortest path between two points is a straight line. But what about on <span className="text-indigo-200 font-semibold">curved surfaces like spheres or curved spacetime</span>?</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">Johann Bernoulli first studied this in 1697 with the brachistochrone problem. Riemann generalized it to arbitrary curved spaces. The question: What is the <span className="text-yellow-400 font-bold">"straightest possible path"</span> on a manifold?</p>
                        <p className="text-sm text-indigo-200">This became crucial for Einstein's general relativity: particles move along geodesics in curved spacetime!</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Einstein realized gravity isn't a force - it's particles following geodesics through curved spacetime! Riemann's pure math became physical reality.</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"A geodesic is the path a particle takes when <strong className="text-white">no external forces act on it</strong>. On a sphere, it's a great circle. In spacetime, it's an orbit! The <span className="text-yellow-400 font-bold">locally shortest distance</span> between points."</p>
                        <p className="text-sm text-purple-200">It generalizes "straight line" to curved spaces!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">On Earth</strong>: Great circles (equator, meridians) are geodesics</li>
                        <li><strong className="text-white">Zero acceleration</strong>: Geodesics have zero covariant derivative</li>
                        <li>Parallel transport: Direction doesn't change along geodesic</li>
                        <li>Minimizes distance locally (may not be global minimum!)</li>
                        <li>Planets orbit Sun along geodesics in curved spacetime!</li>
                    </ul>

                    <p className="mt-4">Think: Airplane routes look curved on flat maps, but they're straight (geodesics) on the spherical Earth!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Geodesic Equation</h4>
                            <p className="mb-2">Curve γ(t) is a geodesic if:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ∇_γ' γ' = 0
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Covariant derivative of velocity = 0 (no acceleration!)</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. In Coordinates</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                d²xᵏ/dt² + Γᵏᵢⱼ (dxⁱ/dt)(dxʲ/dt) = 0
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Christoffel symbols Γ encode curvature!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Great Circles on Sphere</h4>
                            <p className="mb-2">Geodesics on S² are intersections with planes through origin:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                Examples: Equator, all meridians
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Variational Principle</h4>
                            <p className="mb-2">Geodesics minimize arc length:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                L[γ] = ∫ ||γ'(t)|| dt  (minimize!)
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Exponential Map</h4>
                            <p className="mb-2">Geodesic starting at p with velocity v:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                exp_p(v) = γ_v(1)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Maps tangent space to manifold!</p>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <GeodesicsVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🌌 General Relativity</h4>
                            <p className="text-sm">Planets orbit along geodesics in curved spacetime. Gravity is geometry! Light bends around Sun following geodesics.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">✈️ Navigation</h4>
                            <p className="text-sm">Great circle routes minimize distance on Earth. Airlines save fuel by following geodesics!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🤖 Robotics</h4>
                            <p className="text-sm">Optimal paths in configuration space are geodesics. Motion planning uses Riemannian metrics!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Computer Vision</h4>
                            <p className="text-sm">Geodesic distances on shape manifolds for 3D object recognition and shape analysis!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Geodesics Visualization
const GeodesicsVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 500 });
    const [startAngle, setStartAngle] = useState(0);
    const [endAngle, setEndAngle] = useState(90);

    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 500);

        const centerX = 400;
        const centerY = 250;
        const radius = 150;

        // Draw sphere (circle in 2D)
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Convert angles to radians
        const theta1 = (startAngle * Math.PI) / 180;
        const theta2 = (endAngle * Math.PI) / 180;

        // Start and end points
        const x1 = centerX + radius * Math.cos(theta1);
        const y1 = centerY - radius * Math.sin(theta1);
        const x2 = centerX + radius * Math.cos(theta2);
        const y2 = centerY - radius * Math.sin(theta2);

        // Draw points
        drawCircle(ctx, x1, y1, 8, '#fbbf24');
        drawCircle(ctx, x2, y2, 8, '#10b981');

        // Draw geodesic (great circle arc)
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, -theta1, -theta2, theta2 < theta1);
        ctx.stroke();

        // Draw chord (non-geodesic path)
        ctx.setLineDash([5, 5]);
        drawLine(ctx, x1, y1, x2, y2, '#6b7280', 2);
        ctx.setLineDash([]);

        // Calculate arc length
        const deltaTheta = Math.abs(theta2 - theta1);
        const arcLength = radius * deltaTheta;
        const chordLength = 2 * radius * Math.sin(deltaTheta / 2);

        // Labels
        drawText(ctx, 'Geodesic on Sphere (Great Circle)', 400, 30, {
            font: 'bold 18px sans-serif',
            fillColor: '#e8e8f0',
            align: 'center'
        });

        drawText(ctx, 'Start', x1 - 40, y1, {
            font: '14px sans-serif',
            fillColor: '#fbbf24'
        });

        drawText(ctx, 'End', x2 + 30, y2, {
            font: '14px sans-serif',
            fillColor: '#10b981'
        });

        drawText(ctx, 'Geodesic (shortest)', 400, 450, {
            font: 'bold 16px sans-serif',
            fillColor: '#ef4444',
            align: 'center'
        });

        drawText(ctx, 'Chord (not on surface!)', 400, 475, {
            font: '14px sans-serif',
            fillColor: '#6b7280',
            align: 'center'
        });

    }, [ctx, startAngle, endAngle]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Geodesics</h3>
            <p className="text-gray-300 mb-4">
                Move the start and end points. The red arc is the geodesic (shortest path on sphere)!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <label className="block text-amber-400 font-semibold mb-2">
                        Start Angle: {startAngle}°
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="360"
                        value={startAngle}
                        onChange={(e) => setStartAngle(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                    <label className="block text-emerald-400 font-semibold mb-2">
                        End Angle: {endAngle}°
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="360"
                        value={endAngle}
                        onChange={(e) => setEndAngle(Number(e.target.value))}
                        className="w-full"
                    />
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 The gray dashed line is shorter in 3D space, but it cuts through the sphere! On the surface, the red arc is shortest.
            </p>
        </div>
    );
};

export default GeodesicsSection;
