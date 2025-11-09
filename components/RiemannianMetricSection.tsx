import React, { useEffect, useState } from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { fillCanvas, drawLine, drawText, drawCircle } from '../utils/canvasUtils';

const RiemannianMetricSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-green-400 pl-4">The Local Ruler: Riemannian Metric</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">📏 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventor:</strong> Bernhard Riemann (1854)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> Riemann needed a way to <span className="text-indigo-200 font-semibold">measure distances on curved surfaces</span> without embedding them in Euclidean space.</p>

                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">On a sphere, distance isn't Euclidean! The <span className="text-yellow-400 font-bold">metric tensor g</span> is a local "ruler" defining inner products on tangent spaces, varying smoothly point to point.</p>
                        <p className="text-sm text-indigo-200">Einstein realized: spacetime is a Riemannian manifold, and gravity IS the metric tensor!</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> The metric is the foundation of Riemannian geometry and general relativity - it encodes curvature and defines geodesics!</p>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100 mb-4">"The <strong className="text-white">metric tensor g</strong> is a dot product that varies from point to point. It measures <span className="text-yellow-400 font-bold">lengths and angles</span> on the manifold!"</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>Metric g is symmetric, positive-definite tensor</li>
                        <li>Length of curve: ∫ √(g(γ',γ')) dt</li>
                        <li>In coordinates: ds² = gᵢⱼ dxⁱ dxʲ</li>
                        <li>Determines geodesics, curvature, volumes</li>
                        <li>In GR: metric = gravitational field!</li>
                    </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Metric Tensor</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                g: T_p M × T_p M → ℝ (inner product)
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Arc Length</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                L[γ] = ∫ √(g(γ'(t), γ'(t))) dt
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Sphere Metric</h4>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                ds² = R²(dθ² + sin²θ dφ²)
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 The Metric in Action</h3>
                    <p className="text-gray-300">The metric determines all geometric properties: distances, angles, volumes, curvature, and geodesics!</p>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🌌 General Relativity</h4>
                            <p className="text-sm">The metric tensor IS the gravitational field! Massive objects curve spacetime by changing the metric.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Machine Learning</h4>
                            <p className="text-sm">Information geometry uses Riemannian metrics on probability distributions. Natural gradient descent!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🤖 Robotics</h4>
                            <p className="text-sm">Configuration spaces with Riemannian metrics for optimal motion planning!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🗺️ Computer Graphics</h4>
                            <p className="text-sm">Texture mapping, mesh processing, and surface parameterization use intrinsic metrics!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RiemannianMetricSection;
