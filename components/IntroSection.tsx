import React from 'react';

const tableData = [
    { concept: "Euler-Lagrange Equation", figures: "L. Euler, J.L. Lagrange", date: "1755", problem: "Finding the 'tautochrone' curve; birth of calculus of variations." },
    { concept: "Orthogonal Polynomials", figures: "A.M. Legendre, P.S. Laplace", date: "c. 1782", problem: "Calculating the gravitational attraction of a non-spherical Earth." },
    { concept: "Lagrangian Mechanics", figures: "J.L. Lagrange", date: "1788", problem: "Reformulating all of classical mechanics based on energy and 'least action'." },
    { concept: "Lagrange Multipliers", figures: "J.L. Lagrange", date: "c. 1788", problem: "Solving constrained equilibrium problems in physics (statics)." },
    { concept: "Fourier Analysis", figures: "Joseph Fourier", date: "1822", problem: "Modeling the diffusion of heat in solid bodies." },
    { concept: "Eigenvalues", figures: "Augustin-Louis Cauchy", date: "1829", problem: "Determining the stability of the solar system's planetary orbits." },
    { concept: "Riemann Integral", figures: "Bernhard Riemann", date: "1854", problem: "Providing a rigorous definition of the integral to validate Fourier's claims." },
    { concept: "Riemannian Geometry", figures: "Bernhard Riemann", date: "1854", problem: "Generalizing geometry to n-dimensions and curved spaces." },
    { concept: "Covariance / Correlation", figures: "Francis Galton", date: "c. 1888", problem: "Quantifying the relationship of inherited traits between parents and children." },
    { concept: "Law of Large Numbers (LLN)", figures: "Jacob Bernoulli", date: "1713", problem: "Proving that a sample average will converge to the true 'urn' probability." },
    { concept: "Central Limit Theorem (CLT)", figures: "Abraham de Moivre", date: "1733", problem: "Computationally approximating binomial probabilities for games of chance." },
    { concept: "Topological Compactness", figures: "Maurice Fréchet", date: "1906", problem: "Generalizing the 'closed and bounded' property to abstract function spaces." },
    { concept: "Hilbert Spaces", figures: "David Hilbert", date: "c. 1900-1910", problem: "Generalizing Fourier analysis and solving integral equations." },
    { concept: "Fixed-Point Theorems", figures: "L.E.J. Brouwer", date: "1911", problem: "Proving the existence of solutions for certain differential equations." },
    { concept: "Likelihood", figures: "R.A. Fisher", date: "1922", problem: "Creating a new foundation for statistics, free from Bayesian 'prior' beliefs." },
    { concept: "Variance (Analysis of)", figures: "R.A. Fisher", date: "c. 1923-1925", problem: "Separating 'signal' (e.g., fertilizer effect) from 'noise' in agricultural data." },
    { concept: "Shannon Entropy", figures: "Claude Shannon", date: "1948", problem: "Defining the fundamental limit of communication over a noisy channel." },
    { concept: "Kullback-Leibler Divergence", figures: "S. Kullback, R. Leibler", date: "1951", problem: "Measuring the 'information loss' when one distribution approximates another." }
];

const MainIntroductionSection: React.FC = () => {
    return (
        <section className="mb-16">
            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-3xl font-bold text-white mb-4 border-l-4 border-gray-400 pl-4">The Architecture of Understanding</h2>
                    <h3 className="text-2xl font-semibold text-white mb-4">Introduction: The Great Convergence: From Clockwork Orbits to Digital Minds</h3>
                    <p>The history of mathematics is not a simple timeline of discoveries but a narrative of problem-solving. It is a story of how one generation’s concrete challenges—the stability of planets, the flow of heat, the fairness of games—forge the abstract tools and powerful language for the next. The concepts requested, spanning analysis, physics, statistics, and topology, are not a disparate list; they are the architectural blueprints of modern scientific thought.</p>
                    <p className="mt-4">There is a golden thread connecting an 18th-century physicist's question about the true shape of the Earth to the concept of orthogonality that now underpins all signal processing. The Lagrangian mechanics developed to describe a cannonball's flight is the same framework used to optimize a modern neural network. A 19th-century biologist's attempt to quantify heredity in sweet peas led to the covariance matrices that now drive global financial modeling.</p>
                    <p className="mt-4">This report traces this convergence. It reveals how the solutions to one set of problems became the foundational language for the next, following the evolution of these ideas from their specific, practical origins to their current status as the universal, abstract machinery of science, engineering, and artificial intelligence.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                     <h3 className="text-2xl font-semibold text-white mb-4">A Chronological and Thematic Map of Key Concepts</h3>
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Concept</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Key Figure(s)</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Approx. Date</th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Motivating Problem</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700/50 bg-gray-800">
                                {tableData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">{item.concept}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{item.figures}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{item.date}</td>
                                        <td className="px-3 py-4 text-sm text-gray-300 text-wrap">{item.problem}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-3xl font-bold text-white mb-4">Conclusion: The Great Convergence</h2>
                    <p>The journey through these concepts reveals a profound truth about intellectual progress. There is no "pure" and "applied" mathematics, only "solved" and "unsolved" problems. The tools forged to solve one generation's most practical challenges—the stability of planets, the flow of heat, the fairness of games, the yield of crops—become the abstract language of the next.</p>
                    <p className="mt-4">Lagrange's mechanics, born from a desire to unify celestial motion, provides the optimization framework for artificial intelligence. Riemann's geometry, conceived as a "purely mathematical" exploration of n-dimensional space, became the literal fabric of Einstein's universe. Hilbert's "spectral analysis," designed to generalize Fourier series, became the scaffolding for quantum mechanics. And Shannon's engineering problem of "bits in a wire" provided the key—cross-entropy—that unlocks the power of deep learning.</p>
                    <p className="mt-4">Each concept is a solution, a new lens for seeing the world. Together, they form the grand, interconnected architecture of modern scientific understanding.</p>
                </div>
            </div>
        </section>
    );
};

export default MainIntroductionSection;
