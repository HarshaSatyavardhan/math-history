import React from 'react';

const FundamentalTheoremSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-yellow-400 pl-4">🤯 The Big Secret: The Two Problems Are Opposites!</h2>

            <p className="text-lg text-gray-300 mb-6">This is the <strong>Fundamental Theorem of Calculus</strong>, and it's the most important part of the story. Newton and Leibniz discovered that these two problems aren't separate. They are <strong>perfect inverse operations</strong>—like addition and subtraction, or multiplication and division.</p>

            <p className="text-lg text-gray-300 mb-6">Think about the two problems we just defined:</p>

            <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center space-y-4">

                <div className="text-center bg-gray-700 p-6 rounded-lg w-full md:w-2/3">
                    <span className="text-lg text-gray-400">Your Odometer</span>
                    <h4 className="text-3xl font-bold text-white">Total Distance Traveled</h4>
                    <p className="math">(e.g., a graph of your position)</p>
                </div>

                <div className="flex justify-between w-full md:w-2/3 items-center text-lg font-medium">
                    <div className="text-cyan-400 text-left w-2/5">
                        <span className="text-4xl">&darr;</span>
                        <p>The <strong>Derivative</strong> (Change Problem) finds your <i>instant speed</i></p>
                    </div>
                    <div className="text-fuchsia-400 text-right w-2/5">
                        <span className="text-4xl">&uarr;</span>
                        <p>The <strong>Integral</strong> (Accumulation Problem) <i>adds up your speed</i></p>
                    </div>
                </div>

                <div className="text-center bg-gray-700 p-6 rounded-lg w-full md:w-2/3">
                    <span className="text-lg text-gray-400">Your Speedometer</span>
                    <h4 className="text-3xl font-bold text-white">Instantaneous Speed</h4>
                    <p className="math">(e.g., a graph of your speed)</p>
                </div>
            </div>

            <p className="text-lg text-gray-300 mt-6">The <strong>Derivative</strong> (Problem 1) of your total Distance graph gives you your instant Speed. The <strong>Integral</strong> (Problem 2) of your instant Speed graph adds everything up and gives you your total Distance. They undo each other!</p>
            <p className="text-lg text-gray-300 mt-6">This is what makes calculus so powerful. It's the "language" of change, allowing us to take a "blueprint" for *position* and instantly derive the blueprint for *speed*, and vice-versa.</p>
        </section>
    );
};

export default FundamentalTheoremSection;