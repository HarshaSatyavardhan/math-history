import React from 'react';

const ChangeOfVariableSection: React.FC = () => {
    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-lime-400 pl-4">Change of Variables: Probability in a Warped Universe</h2>

            <div className="space-y-8 text-lg text-gray-300">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">The Big Idea: Probabilities Must Be Conserved</h3>
                    <p>Imagine you have a random variable `X` that is uniformly distributed between 0 and 1. This means it's equally likely to be anywhere in that interval. Its probability density function (PDF) is just a flat line at height 1.</p>
                    <p className="mt-4">Now, what happens if we create a new variable <code className="bg-gray-700 px-1 rounded">Y = X²</code>? Will Y also be uniformly distributed? <strong className="text-white">Absolutely not.</strong></p>
                    <p className="mt-4">The values of X between 0.1 and 0.2 get mapped to Y values between 0.01 and 0.04 (an interval of length 0.03). But X values between 0.8 and 0.9 get mapped to Y values between 0.64 and 0.81 (an interval of length 0.17). The transformation has "stretched" the space in some places and "squished" it in others.</p>
                     <div className="mt-6 p-6 bg-gradient-to-r from-lime-900 to-gray-800 rounded-lg">
                        <p className="text-xl text-lime-100">The <strong className="text-white">Change of Variables Formula</strong> is a rule that tells us how to adjust the original PDF to account for this stretching and squishing. It ensures that the total probability remains 1, no matter how much you warp the underlying space. The "correction factor" you need is the derivative (or, in higher dimensions, the <strong className="text-white">Jacobian determinant</strong>) of the transformation.</p>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">Who Figured This Out? The Calculus Giants</h3>
                    <p>This idea doesn't have a single "inventor" in the same way other concepts do. It's a natural consequence of the development of integral calculus and probability theory throughout the 18th and 19th centuries by mathematicians like <strong className="text-white">Lagrange, Laplace, and Jacobi</strong>.</p>
                    <blockquote className="mt-4 border-l-4 border-gray-600 pl-4 italic text-gray-400">
                        "If we know the probability distribution of a particle's velocity, how can we find the probability distribution of its kinetic energy?"
                    </blockquote>
                    <p className="mt-4">This was the type of problem that drove the discovery. The kinetic energy is a function of velocity (<code className="bg-gray-700 px-1 rounded">KE = ½mv²</code>). To get the new distribution, you can't just plug the formula in. You have to apply a "change of variables" to correctly map the probabilities from the "velocity space" to the "energy space".</p>
                    <p className="mt-4">When <strong className="text-white">Jacobi</strong> developed his determinant, he provided the master key for handling these transformations in any number of dimensions. The Jacobian determinant became the universal scaling factor needed to relate an integral in one coordinate system to another, which is the heart of the change of variables formula for probability densities.</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-white mb-4">From Physics to Computer Graphics</h3>
                    <p>The ability to transform probability distributions is a critical tool in many fields.</p>
                    <ul className="list-decimal list-inside ml-4 mt-4 space-y-2">
                        <li><strong>Statistics:</strong> It's used to derive the distributions of many important statistics. For example, the chi-squared distribution can be derived by starting with standard normal variables and applying a change of variables.</li>
                        <li><strong>Physics:</strong> Used constantly to switch between different coordinate systems (e.g., Cartesian to spherical) or to derive the distribution of one physical quantity from another (like in the kinetic energy example).</li>
                        <li><strong>Machine Learning:</strong> Advanced models like Normalizing Flows use a series of invertible transformations, each requiring the Jacobian determinant, to build up very complex probability distributions from simple ones. This is used in cutting-edge generative modeling to create realistic images and audio.</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ChangeOfVariableSection;
