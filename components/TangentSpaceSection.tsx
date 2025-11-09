import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const TangentSpaceSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-indigo-400 pl-4">The Fabric of Reality: Tangent Space</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🌐 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Context:</strong> Bernhard Riemann (1850s), Élie Cartan (1920s)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> Mathematicians studying curved spaces (manifolds) needed a way to do calculus on these surfaces. But how do you take derivatives on a <span className="text-indigo-200 font-semibold">curved surface that has no "flat" coordinate system</span>?</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">On a curved surface like a sphere, there's no natural way to add vectors or take derivatives. We can't just use Cartesian coordinates! We need a <span className="text-yellow-400 font-bold">local flat approximation</span> at each point.</p>
                        <p className="text-sm text-indigo-200">This is crucial for general relativity (curved spacetime), differential geometry, and optimization on manifolds.</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> The tangent space makes calculus possible on curved spaces, enabling Einstein's general relativity and modern differential geometry!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"At every point p on a curved surface, imagine a <strong className="text-white">flat plane that just touches</strong> the surface - like a piece of paper on a ball. This is the <span className="text-yellow-400 font-bold">tangent space T_p M</span>!"</p>
                        <p className="text-sm text-purple-200">It's a vector space containing all possible "velocity directions" at that point!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">Local linearization</strong>: Tangent space approximates manifold locally</li>
                        <li>It's a <strong className="text-white">vector space</strong>: can add vectors, scale them</li>
                        <li>Dimension of T_p M = dimension of manifold</li>
                        <li>Velocities of curves through p live in T_p M</li>
                        <li>Gradients and directional derivatives use tangent vectors!</li>
                    </ul>

                    <p className="mt-4">Think: Walking on Earth feels flat locally (tangent plane), even though Earth is curved globally!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Tangent Vectors as Derivatives</h4>
                            <p className="mb-2">For curve γ(t) with γ(0) = p:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                v = γ'(0) = d/dt γ(t)|_{'{t=0}'} ∈ T_p M
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Velocity vector at p!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Basis for Tangent Space</h4>
                            <p className="mb-2">Using coordinates (x¹, ..., xⁿ), basis vectors:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                {'{∂/∂x¹, ∂/∂x², ..., ∂/∂xⁿ}'}
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Coordinate directions!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Tangent Space to Sphere S²</h4>
                            <p className="mb-2">At point p on unit sphere:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                T_p S² = {'{v ∈ ℝ³ : v · p = 0}'} (plane perpendicular to p)
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Directional Derivative</h4>
                            <p className="mb-2">Derivative of f in direction v:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                D_v f(p) = df(v) = ∇f(p) · v
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Tangent Bundle</h4>
                            <p className="mb-2">Collection of all tangent spaces:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                TM = ⋃_{'{p∈M}'} T_p M
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Itself a manifold!</p>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <TangentSpaceVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🌌 General Relativity</h4>
                            <p className="text-sm">Spacetime is a 4D manifold. Tangent spaces at each event contain 4-velocities of particles. Einstein's equations use tangent spaces!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🤖 Robotics</h4>
                            <p className="text-sm">Configuration space of robot (positions/orientations) is a manifold. Velocities live in tangent spaces - crucial for motion planning!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Machine Learning</h4>
                            <p className="text-sm">Manifold learning (like t-SNE) and optimization on Riemannian manifolds use tangent spaces for gradient descent!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Computer Vision</h4>
                            <p className="text-sm">Special orthogonal group SO(3) (rotations) is a manifold. Tangent space = space of angular velocities!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Tangent Space Visualization
const TangentSpaceVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 500 });
    const [angle, setAngle] = useState(45);

    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 500);

        const centerX = 400;
        const centerY = 350;
        const radius = 150;

        // Draw sphere (circle in 2D)
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();

        // Point on circle
        const theta = (angle * Math.PI) / 180;
        const px = centerX + radius * Math.cos(theta);
        const py = centerY - radius * Math.sin(theta);

        // Draw point
        drawCircle(ctx, px, py, 8, '#fbbf24');

        // Draw tangent line (perpendicular to radius)
        const tangentLength = 200;
        const tangentAngle = theta + Math.PI / 2;
        const tx1 = px - tangentLength * Math.cos(tangentAngle) / 2;
        const ty1 = py + tangentLength * Math.sin(tangentAngle) / 2;
        const tx2 = px + tangentLength * Math.cos(tangentAngle) / 2;
        const ty2 = py - tangentLength * Math.sin(tangentAngle) / 2;

        drawLine(ctx, tx1, ty1, tx2, ty2, '#10b981', 3);

        // Draw radius (dashed)
        ctx.setLineDash([5, 5]);
        drawLine(ctx, centerX, centerY, px, py, '#ef4444', 2);
        ctx.setLineDash([]);

        // Draw some tangent vectors
        const vectorLength = 60;
        for (let i = 0; i < 3; i++) {
            const t = -1 + i * 1;
            const vx = px + t * vectorLength * Math.cos(tangentAngle);
            const vy = py - t * vectorLength * Math.sin(tangentAngle);

            // Arrow
            ctx.strokeStyle = '#14b8a6';
            ctx.fillStyle = '#14b8a6';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(vx, vy);
            ctx.stroke();

            // Arrowhead
            const arrowAngle = Math.atan2(-(vy - py), vx - px);
            ctx.beginPath();
            ctx.moveTo(vx, vy);
            ctx.lineTo(vx - 10 * Math.cos(arrowAngle - 0.3), vy - 10 * Math.sin(arrowAngle - 0.3));
            ctx.lineTo(vx - 10 * Math.cos(arrowAngle + 0.3), vy - 10 * Math.sin(arrowAngle + 0.3));
            ctx.closePath();
            ctx.fill();
        }

        // Labels
        drawText(ctx, 'Manifold M (circle)', 400, 30, {
            font: 'bold 18px sans-serif',
            fillColor: '#a78bfa',
            align: 'center'
        });

        drawText(ctx, 'Tangent space T_p M', tx2 + 20, ty2, {
            font: 'bold 14px sans-serif',
            fillColor: '#10b981'
        });

        drawText(ctx, 'Point p', px + 15, py - 15, {
            font: '14px sans-serif',
            fillColor: '#fbbf24'
        });

        drawText(ctx, 'Tangent vectors', px + 70, py + 30, {
            font: '14px sans-serif',
            fillColor: '#14b8a6'
        });

    }, [ctx, angle]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Tangent Space</h3>
            <p className="text-gray-300 mb-4">
                Move the point around the circle. The tangent space (green line) is always perpendicular to the radius!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="bg-gray-900 p-4 rounded-lg">
                <label className="block text-indigo-400 font-semibold mb-2">
                    Angle: {angle}°
                </label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full"
                />
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 The tangent space is a flat vector space that approximates the curved manifold locally. All velocities at p live here!
            </p>
        </div>
    );
};

export default TangentSpaceSection;
