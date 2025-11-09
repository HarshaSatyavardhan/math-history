import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="text-center mb-16 rounded-lg p-8 hero-gradient">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Was Calculus Invented?</h2>
            <p className="text-xl md:text-2xl text-blue-100">It's the story of solving two problems that stumped humanity for centuries.</p>
        </section>
    );
};

export default Hero;