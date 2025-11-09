import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const ProjectionsSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-purple-400 pl-4">The Geometry of Independence: Projections</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">📐 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Context:</strong> Classical Geometry & Modern Linear Algebra</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> The concept of projection dates back to <span className="text-indigo-200 font-semibold">Euclidean geometry</span>, but its modern formulation in linear algebra emerged in the 19th-20th centuries as mathematicians generalized geometric concepts to abstract vector spaces.</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">Given a complex vector in high-dimensional space, how do we <span className="text-yellow-400 font-bold">decompose it</span> into simpler components? How do we find the <strong className="text-white">"shadow"</strong> of a vector onto a subspace?</p>
                        <p className="text-sm text-indigo-200">This is crucial for: least squares regression, signal decomposition, dimensionality reduction, and understanding function spaces!</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Projections are the mechanism behind decomposition. They allow us to break complex problems into simple, independent parts - the foundation of Fourier analysis, PCA, and quantum mechanics!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100">"A projection is the <strong className="text-white">'shadow'</strong> of a vector onto a subspace. It's the <span className="text-yellow-400 font-bold">closest point</span> in that subspace!"</p>
                        <p className="mt-4">In 3D: projecting a vector onto a line gives you the component along that line. The perpendicular part is discarded.</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">Orthogonal projection</strong>: perpendicular distance is minimized</li>
                        <li>Projection onto unit vector: <strong className="text-white">proj_u(v) = (v·u)u</strong></li>
                        <li>Projection matrix P: satisfies <strong className="text-white">P² = P</strong> (idempotent)</li>
                        <li>Coordinates in basis = projections onto basis vectors!</li>
                        <li>Fourier coefficients = projections onto sin/cos functions!</li>
                    </ul>

                    <p className="mt-4">Think: sunshine creating a shadow. The shadow = projection onto the ground plane!</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Projection onto Unit Vector</h4>
                            <p className="mb-2">For unit vector u (||u|| = 1):</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                proj_u(v) = (v · u)u
                            </div>
                            <p className="text-sm text-blue-200 mt-2">The scalar (v·u) is the component along u!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Projection onto Arbitrary Vector</h4>
                            <p className="mb-2">For non-unit vector a:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                proj_a(v) = [(v · a) / (a · a)] a
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Normalize by a's magnitude!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Projection Matrix</h4>
                            <p className="mb-2">Projection onto subspace spanned by columns of A:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                P = A(A^T A)^(-1)A^T
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Key property: P² = P (applying twice = applying once)</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. Least Squares (Application)</h4>
                            <p className="mb-2">Best fit solution to Ax = b:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                x̂ = (A^T A)^(-1)A^T b
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Projects b onto column space of A!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Orthogonal Decomposition</h4>
                            <p className="mb-2">Any vector v decomposes as:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                v = proj_u(v) + perp_u(v)
                                <br />
                                where perp_u(v) = v - proj_u(v)
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <ProjectionVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📈 Least Squares Regression</h4>
                            <p className="text-sm">Linear regression projects data onto the line of best fit. Minimizes perpendicular distance!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🎵 Signal Processing</h4>
                            <p className="text-sm">Fourier coefficients = projections onto sin/cos basis. Decompose signal into frequency components!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 PCA</h4>
                            <p className="text-sm">Project high-dimensional data onto principal components (eigenvectors). Dimensionality reduction!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">⚛️ Quantum Mechanics</h4>
                            <p className="text-sm">Measurement = projection onto eigenstate. Probability = squared projection magnitude!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Projection Visualization
const ProjectionVisualization: React.FC = () => {
    const { canvasRef, ctx } = useCanvas({ width: 800, height: 400 });
    const [vectorAngle, setVectorAngle] = useState(60);
    const [basisAngle, setBasisAngle] = useState(20);

    // Drawing
    useEffect(() => {
        if (!ctx) return;

        fillCanvas(ctx, '#0f0f1e', 800, 400);

        const centerX = 200;
        const centerY = 300;

        // Convert angles to radians
        const vAngle = (vectorAngle * Math.PI) / 180;
        const bAngle = (basisAngle * Math.PI) / 180;

        // Vector coordinates
        const vLen = 150;
        const vx = vLen * Math.cos(vAngle);
        const vy = -vLen * Math.sin(vAngle);

        // Basis vector
        const bLen = 200;
        const bx = bLen * Math.cos(bAngle);
        const by = -bLen * Math.sin(bAngle);

        // Projection of v onto basis
        const dotProduct = vx * bx + vy * by;
        const basisMagSq = bx * bx + by * by;
        const projScale = dotProduct / basisMagSq;
        const projX = projScale * bx;
        const projY = projScale * by;

        // Draw basis line (extended)
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        drawLine(ctx, centerX - bx * 1.5, centerY - by * 1.5, centerX + bx * 1.5, centerY + by * 1.5, 'rgba(59, 130, 246, 0.3)', 2);
        ctx.setLineDash([]);

        // Draw basis vector (blue)
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + bx, centerY + by);
        ctx.stroke();

        // Draw arrowhead for basis
        const bAngleEnd = Math.atan2(-by, bx);
        ctx.beginPath();
        ctx.moveTo(centerX + bx, centerY + by);
        ctx.lineTo(centerX + bx - 15 * Math.cos(bAngleEnd - 0.3), centerY + by - 15 * Math.sin(bAngleEnd - 0.3));
        ctx.moveTo(centerX + bx, centerY + by);
        ctx.lineTo(centerX + bx - 15 * Math.cos(bAngleEnd + 0.3), centerY + by - 15 * Math.sin(bAngleEnd + 0.3));
        ctx.stroke();

        // Draw original vector (red)
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + vx, centerY + vy);
        ctx.stroke();

        // Draw arrowhead for vector
        const vAngleEnd = Math.atan2(-vy, vx);
        ctx.beginPath();
        ctx.moveTo(centerX + vx, centerY + vy);
        ctx.lineTo(centerX + vx - 15 * Math.cos(vAngleEnd - 0.3), centerY + vy - 15 * Math.sin(vAngleEnd - 0.3));
        ctx.moveTo(centerX + vx, centerY + vy);
        ctx.lineTo(centerX + vx - 15 * Math.cos(vAngleEnd + 0.3), centerY + vy - 15 * Math.sin(vAngleEnd + 0.3));
        ctx.stroke();

        // Draw projection (green)
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + projX, centerY + projY);
        ctx.stroke();

        // Draw perpendicular line (dashed yellow)
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(centerX + vx, centerY + vy);
        ctx.lineTo(centerX + projX, centerY + projY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Labels
        drawText(ctx, 'Vector Projection', 400, 30, {
            font: 'bold 18px sans-serif',
            fillColor: '#e8e8f0',
            align: 'center'
        });

        drawText(ctx, 'v (original)', centerX + vx + 15, centerY + vy - 10, {
            font: '14px sans-serif',
            fillColor: '#ef4444'
        });

        drawText(ctx, 'basis', centerX + bx + 15, centerY + by + 10, {
            font: '14px sans-serif',
            fillColor: '#3b82f6'
        });

        drawText(ctx, 'proj(v)', centerX + projX / 2 - 20, centerY + projY / 2 + 20, {
            font: 'bold 14px sans-serif',
            fillColor: '#10b981'
        });

        // Info text
        drawText(ctx, 'Component along basis:', 500, 150, {
            font: '14px sans-serif',
            fillColor: '#a8a8c0'
        });

        drawText(ctx, `||proj(v)|| = ${Math.sqrt(projX * projX + projY * projY).toFixed(1)}`, 500, 180, {
            font: 'bold 16px monospace',
            fillColor: '#10b981'
        });

    }, [ctx, vectorAngle, basisAngle]);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Vector Projection</h3>
            <p className="text-gray-300 mb-4">
                Adjust the vector (red) and basis direction (blue). The green arrow shows the projection!
            </p>

            <canvas ref={canvasRef} className="rounded-lg border border-gray-700 mb-4" />

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                    <label className="block text-red-400 font-semibold mb-2">
                        Vector Angle: {vectorAngle}°
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="180"
                        value={vectorAngle}
                        onChange={(e) => setVectorAngle(Number(e.target.value))}
                        className="w-full"
                    />
                </div>

                <div className="bg-gray-900 p-4 rounded-lg">
                    <label className="block text-blue-400 font-semibold mb-2">
                        Basis Angle: {basisAngle}°
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="180"
                        value={basisAngle}
                        onChange={(e) => setBasisAngle(Number(e.target.value))}
                        className="w-full"
                    />
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 The yellow dashed line shows the perpendicular component. Notice: projection + perpendicular = original vector!
            </p>
        </div>
    );
};

export default ProjectionsSection;