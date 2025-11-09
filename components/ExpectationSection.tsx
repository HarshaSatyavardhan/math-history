import React from 'react';

const ExpectationSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-sky-400 pl-4">Part IV: The Measure of Uncertainty — Probability and Statistics</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">6. The Birth of Probability: Expectation</h3>
                    <p><strong>The Inventors:</strong> The concept of expected value was born from a 1654 correspondence between Blaise Pascal and Pierre de Fermat.</p>
                    <p className="mt-4"><strong>The Problem:</strong> They were solving the "Problem of Points," posed to them by the gambler Chevalier de Méré. The problem: Two players put money in a pot for a game that will be won by the first player to win, for example, five rounds. If the game is interrupted early (say, with Player A leading 3 to 1), how should they fairly divide the stakes?.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Story & Intuition</h3>
                    <p>Earlier solutions were naive. Luca Pacioli, for instance, suggested dividing the pot in proportion to the rounds already won (3:1). This is intuitively wrong, as an early lead is far from decisive.</p>
                    <p className="mt-4">Pascal and Fermat solved it by calculating all possible future outcomes of the game. They weighted the prize money for each outcome by its probability of occurring. This "weighted average" of all possible outcomes was the fair value of the game for each player. This idea was formalized by Christiaan Huygens in 1657 and is the genesis of <strong className="text-white">Expected Value</strong>. It is not a description of what will happen, but what one can "expect" on average. The formal definition using integration was provided much later by Pierre-Simon Laplace in 1814.</p>
                </div>
            </div>
        </section>
    );
};

export default ExpectationSection;