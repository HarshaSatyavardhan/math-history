import React, { useState } from 'react';

const ExpectationSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-sky-400 pl-4">6. The Birth of Probability: Expected Value</h2>

            <div className="space-y-8 text-lg text-gray-300">
                {/* 1. PROBLEM SECTION */}
                <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 rounded-xl p-8 border border-indigo-500/30">
                    <h3 className="text-2xl font-bold text-indigo-300 mb-4">🎲 The Problem</h3>
                    <p className="mb-4"><strong className="text-white">The Inventors:</strong> Blaise Pascal (1623-1662) and Pierre de Fermat (1607-1665)</p>
                    <p className="mb-4"><strong className="text-white">Historical Context (1654):</strong> The gambler <strong className="text-white">Chevalier de Méré</strong> posed a puzzle to Blaise Pascal that would give birth to probability theory. The famous 1654 correspondence between Pascal and Fermat about this problem is considered <span className="text-indigo-200 font-semibold">the founding moment of mathematical probability</span>.</p>

                    <p className="mt-4"><strong className="text-white">The Challenge - "The Problem of Points":</strong></p>
                    <div className="mt-4 p-6 bg-indigo-950/50 rounded-lg border-2 border-indigo-400">
                        <p className="mb-4">Two players put equal stakes in a pot for a game that will be won by the first to win 5 rounds. The game is interrupted when <strong className="text-yellow-400">Player A leads 3-1</strong>. How should they <span className="text-white font-semibold">fairly divide the stakes?</span></p>

                        <p className="text-sm text-indigo-200">Earlier "solutions" were laughably wrong: Luca Pacioli (1494) suggested dividing 3:1 based on rounds won. This is absurd - an early lead isn't decisive! The correct answer requires understanding <strong className="text-white">probability and expectation</strong>.</p>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-950/50 rounded-lg border-l-4 border-indigo-400">
                        <p className="text-sm text-indigo-200"><strong>Why This Mattered:</strong> Without a rigorous way to quantify "fair value" under uncertainty, gambling contracts, insurance policies, and financial decisions had no mathematical foundation. This problem launched all of probability theory!</p>
                    </div>
                </div>

                {/* 2. INTUITION SECTION */}
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-8 border border-purple-500/30">
                    <h3 className="text-2xl font-bold text-purple-300 mb-4">💡 The Inventor's Intuition</h3>

                    <div className="my-6 p-6 bg-purple-950/50 rounded-lg border-2 border-purple-400">
                        <p className="text-xl font-semibold text-purple-200 mb-3">🎯 Pascal's "Aha!" Moment:</p>
                        <p className="text-purple-100">"Don't count what <em className="italic">has</em> happened - count all possible <strong className="text-white">futures</strong>!"</p>
                        <p className="mt-4">Pascal realized: enumerate every way the game could finish from the current state. Weight each outcome by its probability. The <span className="text-yellow-400 font-bold">"expected value"</span> is the weighted average of all possible futures!</p>
                    </div>

                    <p className="mb-2"><strong className="text-white">Key Insights:</strong></p>
                    <ul className="list-disc list-inside space-y-2 text-purple-100">
                        <li>From 3-1 state, Player A needs <strong className="text-white">2 more wins</strong> to reach 5</li>
                        <li>Player B needs <strong className="text-white">4 more wins</strong> to reach 5</li>
                        <li>Enumerate all possible sequences of the next 4 rounds (2⁴ = 16 outcomes)</li>
                        <li>Count how many sequences result in each player winning</li>
                        <li>The <strong className="text-white">fair split</strong> is proportional to these counts!</li>
                    </ul>

                    <p className="mt-4">Christiaan Huygens formalized this in 1657 as the <strong className="text-white">Expected Value</strong> - not what <em className="italic">will</em> happen, but what you can "expect" on average.</p>
                </div>

                {/* 3. SOLUTION SECTION */}
                <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-8 border border-blue-500/30">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">✓ The Solution</h3>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">1. Enumerate Possible Futures (3-1 state)</h4>
                            <p className="mb-2">From 3-1, the game ends in at most 4 more rounds. List all 2⁴ = 16 sequences:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-xs text-blue-200">
                                AAAA, AAAB, AABA, AABB, ABAA, ABAB, ABBA, ABBB,
                                <br />
                                BAAA, BAAB, BABA, BABB, BBAA, BBAB, BBBA, BBBB
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">2. Count Wins for Each Player</h4>
                            <p className="mb-2">Player A needs 2 wins to reach 5 total. Player B needs 4 wins to reach 5.</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg text-blue-200">
                                <p>• Player A wins if sequence contains ≥2 A's: <strong className="text-white">11 out of 16</strong></p>
                                <p>• Player B wins if sequence contains 4 B's: <strong className="text-white">5 out of 16</strong></p>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">3. Calculate Fair Division</h4>
                            <p className="mb-2">Fair split proportional to probabilities:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                Player A gets: (11/16) × Pot = 68.75% of pot
                                <br />
                                Player B gets: (5/16) × Pot = 31.25% of pot
                            </div>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">4. General Definition (Discrete)</h4>
                            <p className="mb-2">For a random variable X taking values x₁, x₂, ..., xₙ with probabilities p₁, p₂, ..., pₙ:</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                𝔼[X] = Σᵢ xᵢpᵢ = x₁p₁ + x₂p₂ + ... + xₙpₙ
                            </div>
                            <p className="text-sm text-blue-200 mt-2">The probability-weighted average of all possible outcomes!</p>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-3">5. Continuous Case (Laplace, 1814)</h4>
                            <p className="mb-2">For continuous random variables with density f(x):</p>
                            <div className="bg-blue-950/50 p-4 rounded-lg font-mono text-sm text-blue-200">
                                𝔼[X] = ∫ x f(x) dx
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. VISUALIZATION */}
                <ProblemOfPointsViz />

                {/* 5. APPLICATIONS SECTION */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
                    <h3 className="text-2xl font-bold text-green-300 mb-4">🌍 Real-World Impact</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🎰 Gambling & Games</h4>
                            <p className="text-sm">Casino odds, poker expected value calculations, optimal betting strategies (Kelly criterion) all use expected value!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">💼 Finance & Insurance</h4>
                            <p className="text-sm">Pricing insurance policies, calculating fair premiums, portfolio expected returns - all founded on this 1654 insight!</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">📊 Decision Theory</h4>
                            <p className="text-sm">Expected utility theory: rational agents maximize expected value of their utility function under uncertainty.</p>
                        </div>
                        <div className="p-4 bg-green-950/50 rounded-lg">
                            <h4 className="font-semibold text-white mb-2">🤖 Machine Learning</h4>
                            <p className="text-sm">Risk minimization, loss functions, reinforcement learning (expected reward), Bayesian inference - all use expectation!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Simple Problem of Points Interactive Visualization
const ProblemOfPointsViz: React.FC = () => {
    const [scoreA, setScoreA] = useState(3);
    const [scoreB, setScoreB] = useState(1);
    const targetScore = 5;

    // Calculate probability using combinatorics
    const calculateProbability = (): { probA: number; probB: number } => {
        const roundsNeededA = targetScore - scoreA;
        const roundsNeededB = targetScore - scoreB;
        const maxRounds = roundsNeededA + roundsNeededB - 1;

        let winsA = 0;
        const totalOutcomes = Math.pow(2, maxRounds);

        // Enumerate all possible outcomes
        for (let outcome = 0; outcome < totalOutcomes; outcome++) {
            let a = scoreA;
            let b = scoreB;

            for (let round = 0; round < maxRounds; round++) {
                if (outcome & (1 << round)) {
                    a++;
                } else {
                    b++;
                }
                if (a >= targetScore || b >= targetScore) break;
            }

            if (a >= targetScore) winsA++;
        }

        return {
            probA: winsA / totalOutcomes,
            probB: (totalOutcomes - winsA) / totalOutcomes
        };
    };

    const { probA, probB } = calculateProbability();

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-300 mb-4">🎮 Interactive: Problem of Points Calculator</h3>
            <p className="text-gray-300 mb-4">
                Adjust the current scores and see how the fair division of stakes changes based on expected value!
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-900 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-white mb-4">Player A</h4>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Current Score: {scoreA}</label>
                        <input
                            type="range"
                            min="0"
                            max="4"
                            value={scoreA}
                            onChange={(e) => setScoreA(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div className="mt-4 p-4 bg-indigo-900/50 rounded-lg">
                        <p className="text-sm text-gray-300">Needs {targetScore - scoreA} more win(s)</p>
                        <p className="text-3xl font-bold text-indigo-400 mt-2">{(probA * 100).toFixed(1)}%</p>
                        <p className="text-xs text-gray-400 mt-1">Win Probability</p>
                    </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold text-white mb-4">Player B</h4>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2">Current Score: {scoreB}</label>
                        <input
                            type="range"
                            min="0"
                            max="4"
                            value={scoreB}
                            onChange={(e) => setScoreB(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <div className="mt-4 p-4 bg-purple-900/50 rounded-lg">
                        <p className="text-sm text-gray-300">Needs {targetScore - scoreB} more win(s)</p>
                        <p className="text-3xl font-bold text-purple-400 mt-2">{(probB * 100).toFixed(1)}%</p>
                        <p className="text-xs text-gray-400 mt-1">Win Probability</p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-white mb-4">Fair Division of 100 coins:</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-indigo-400">{(probA * 100).toFixed(0)}</div>
                        <div className="text-sm text-gray-300">Player A's share</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400">{(probB * 100).toFixed(0)}</div>
                        <div className="text-sm text-gray-300">Player B's share</div>
                    </div>
                </div>
            </div>

            <p className="text-sm text-gray-400 mt-4">
                💡 This is the exact problem Pascal and Fermat solved in 1654, giving birth to probability theory and the concept of expected value!
            </p>
        </div>
    );
};

export default ExpectationSection;