import React from 'react';

const IntegralSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-fuchsia-400 pl-4">Part I: The Foundations of Certainty — Rigor in Analysis</h2>
            
            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">1. Defining the Indefinable: The Riemann Integral</h3>
                    <p><strong>The Inventor:</strong> Bernhard Riemann.</p>
                    <p className="mt-4"><strong>The Problem (The "Why"):</strong> The common explanation—that the integral was invented to find the "area under a curve"—mistakes the intuition for the motivation. The integral had been used intuitively since Newton and Leibniz. The Riemann integral was created to solve a crisis of rigor in 19th-century mathematics.</p>
                    <p className="mt-4">This crisis was ignited by Joseph Fourier's 1822 work on the heat equation. Fourier made the "scandalous" claim that any arbitrary function, even one with sharp corners and breaks (discontinuities), could be represented by an infinite sum of smooth sine and cosine waves. This claim "was met with considerable skepticism". Mathematicians like Augustin-Louis Cauchy had an intuitive definition of the integral, but it was unclear if it held for these "pathological" functions. The very foundations of calculus were suddenly unstable.</p>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Story & Intuition (The "How")</h3>
                    <p>Bernhard Riemann, a brilliant student of the great Carl Friedrich Gauss, took on this challenge. The work was presented in his 1854 Habilitation dissertation, which was, fittingly, on the subject of Fourier series. To determine when a function could be represented by a Fourier series, he first had to rigorously define what it meant for a function to be integrable.</p>
                    <p className="mt-4">His intuition was simple and geometric. Instead of one set of infinitely thin rectangles, he bounded the area from above and below.</p>
                    <ul className="list-disc list-inside ml-4 mt-4 space-y-2">
                        <li>He defined the <strong>"upper sum"</strong> as the sum of rectangles that were just over the curve.</li>
                        <li>He defined the <strong>"lower sum"</strong> as the sum of rectangles just under the curve.</li>
                    </ul>
                    <p className="mt-4">He then proposed his criterion: a function is "Riemann-integrable" if and only if, as the width of the rectangles gets progressively smaller, the upper and lower sums converge to the same, single value. This was the first fully rigorous definition of the integral. It provided a definitive test that proved many of Fourier's discontinuous functions were, in fact, perfectly integrable.</p>
                    <p className="mt-4">This act of rigor, however, also revealed its own limitations. The Riemann integral is not all-powerful; for example, it fails for highly discontinuous functions like the Dirichlet function (which is 1 for rational numbers and 0 for irrational). This limitation created the next problem in analysis, which was solved decades later by Henri Lebesgue and his more powerful theory of integration.</p>
                </div>
            </div>
        </section>
    );
};

export default IntegralSection;