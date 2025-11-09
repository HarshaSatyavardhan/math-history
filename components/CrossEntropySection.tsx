import React, { useState } from 'react';
import { calculateCrossEntropy } from '../utils/mathUtils';

const CrossEntropySection: React.FC = () => {
    return (
        <section id="cross-entropy" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-rose-400 pl-4">Cross-Entropy Loss</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🤖 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Context:</strong> Machine Learning Era (1950s-present)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context:</strong> Cross-entropy wasn't invented as a standalone concept - it emerged from <span className="text-indigo-200 font-semibold">Shannon's entropy and KL divergence</span>. But in the 1980s-1990s, when neural networks exploded, researchers discovered it was THE perfect loss function for classification!</p>

                    <p className="mt-4"><strong className="text-white">The Challenge:</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">You're training a classifier. The <span className="text-yellow-400 font-bold">true labels</span> are P (one-hot: [0,0,1,0] means class 3). Your <span className="text-yellow-400 font-bold">model predictions</span> are Q (probabilities: [0.1, 0.2, 0.6, 0.1]). How do you measure <strong className="text-white">how wrong your predictions are?</strong></p>
                        <p className="text-sm text-indigo-200">You need a loss function that: (1) is always positive, (2) equals zero only when predictions perfectly match labels, (3) is differentiable for gradient descent!</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> The choice of loss function determines what a model learns! Cross-entropy became ubiquitous because it has perfect mathematical properties for probabilistic classification.</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 The "Aha!" Moment:</p>
                        <p className="text-purple-100">"Cross-entropy is the <strong className="text-white">average bits needed</strong> to encode data from true distribution P using a code optimized for predicted distribution Q!"</p>
                        <p className="mt-4">If your model predicts Q = P perfectly, you're using the optimal code. Any divergence increases the coding length (= increases loss)!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li><strong className="text-white">H(P,Q) = H(P) + D<sub>KL</sub>(P||Q)</strong> - The magic identity!</li>
                        <li>Since H(P) is fixed (true labels don't change), minimizing cross-entropy = minimizing KL divergence!</li>
                        <li>For classification: P is one-hot (true label), Q is model's softmax output</li>
                        <li>Heavily penalizes confident wrong predictions (log(small number) = large negative)</li>
                        <li>Convex in Q's parameters - easy to optimize with gradient descent!</li>
                    </ul>

                    <p className="mt-4">Think: If the true class is 3, and model predicts p=0.9 for class 3, loss is low. If it predicts p=0.01 for class 3, loss <strong className="text-white">explodes!</strong></p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Cross-Entropy Definition</h4>
                            <p className="mb-2">For discrete distributions P (true) and Q (predicted):</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                H(P,Q) = -Σ p(x) log q(x)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Expected surprise under P when using Q's code!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Binary Classification (Logistic Regression)</h4>
                            <p className="mb-2">For binary labels y ∈ {0,1} and predictions ŷ ∈ [0,1]:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ℒ = -[y log(ŷ) + (1-y) log(1-ŷ)]
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Binary cross-entropy (BCE) loss!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Multi-Class Classification (Softmax)</h4>
                            <p className="mb-2">For K classes, true one-hot y and predicted probabilities ŷ:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ℒ = -Σₖ₌₁ᴷ yₖ log(ŷₖ)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Categorical cross-entropy - THE loss for deep learning classification!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. The Magic Identity</h4>
                            <p className="mb-2">Connects to KL divergence and entropy:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                H(P,Q) = H(P) + D<sub>KL</sub>(P||Q)
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Cross-Entropy = True Entropy + Extra Bits (KL divergence)</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Gradient</h4>
                            <p className="mb-2">For softmax + cross-entropy (incredibly simple!):</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                ∂ℒ/∂zₖ = ŷₖ - yₖ
                            </div>
                            <p className="text-sm text-blue-200 mt-2">Predicted probability - true label. Elegant!</p>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <CrossEntropyVisualization />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🧠 Deep Learning</h4>
                            <p className="text-sm">THE loss function for classification! Image recognition (ImageNet), NLP (BERT, GPT), speech recognition - all use cross-entropy loss.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Logistic Regression</h4>
                            <p className="text-sm">Maximum likelihood estimation for logistic regression IS minimizing cross-entropy. They're mathematically equivalent!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🎯 Reinforcement Learning</h4>
                            <p className="text-sm">Policy gradient methods use cross-entropy to train agents. AlphaGo's policy network was trained with cross-entropy loss!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🔍 Information Retrieval</h4>
                            <p className="text-sm">Search engines, recommendation systems - cross-entropy measures how well predicted relevance matches actual clicks!</p>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-green-950/50 rounded-lg">
                        <h4 className="font-semibold text-white mb-2">🔗 The Great Convergence</h4>
                        <p className="text-sm">Cross-entropy provides a <strong className="text-white">direct, unbroken line from 1940s information theory to 21st-century AI</strong>. Shannon's entropy → KL divergence → Cross-entropy loss → Modern deep learning!</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Interactive Cross-Entropy Visualization
const CrossEntropyVisualization: React.FC = () => {
    const [trueClass, setTrueClass] = useState(2);
    const [predictions, setPredictions] = useState([0.1, 0.2, 0.6, 0.1]);

    // Update prediction for a class
    const updatePrediction = (idx: number, val: number) => {
        const newPreds = [...predictions];
        newPreds[idx] = val;
        // Normalize to sum to 1
        const sum = newPreds.reduce((a, b) => a + b, 0);
        const normalized = newPreds.map(p => p / sum);
        setPredictions(normalized);
    };

    // Calculate cross-entropy
    const crossEntropy = -Math.log(predictions[trueClass] + 1e-10);

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Cross-Entropy Loss Calculator</h3>
            <p className="text-gray-300 mb-4">
                Set the true class and adjust model predictions. Watch how the loss changes!
            </p>

            <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <label className="block text-white font-semibold mb-2">True Class (Ground Truth):</label>
                <div className="flex gap-2">
                    {[0, 1, 2, 3].map(idx => (
                        <button
                            key={idx}
                            onClick={() => setTrueClass(idx)}
                            className={`px-6 py-3 rounded-lg font-semibold transition ${
                                trueClass === idx
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            Class {idx}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <h4 className="text-white font-semibold mb-3">Model Predictions (Softmax Probabilities):</h4>
                <div className="space-y-3">
                    {predictions.map((prob, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between mb-1">
                                <label className="text-gray-300">Class {idx}</label>
                                <span className={`font-mono ${idx === trueClass ? 'text-green-400 font-bold' : 'text-gray-400'}`}>
                                    {(prob * 100).toFixed(1)}%
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={prob * 100}
                                onChange={(e) => updatePrediction(idx, Number(e.target.value) / 100)}
                                className="w-full"
                            />
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                    Predictions are automatically normalized to sum to 1.0
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 p-4 rounded-lg text-center">
                    <div className="text-yellow-400 font-mono text-4xl font-bold">{crossEntropy.toFixed(4)}</div>
                    <div className="text-gray-300 text-sm mt-1">Cross-Entropy Loss</div>
                    <div className="text-gray-400 text-xs mt-2">
                        {crossEntropy < 0.5 ? 'Excellent!' : crossEntropy < 1.5 ? 'Good' : crossEntropy < 3 ? 'Poor' : 'Terrible!'}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/50 to-teal-900/50 p-4 rounded-lg text-center">
                    <div className="text-green-400 font-mono text-4xl font-bold">{(predictions[trueClass] * 100).toFixed(1)}%</div>
                    <div className="text-gray-300 text-sm mt-1">Prob(True Class)</div>
                    <div className="text-gray-400 text-xs mt-2">
                        Model's confidence in correct answer
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 Try giving high probability to the true class - loss goes near 0! Give low probability to true class - loss explodes! This is why confident wrong predictions are heavily penalized.
            </p>
        </div>
    );
};

export default CrossEntropySection;