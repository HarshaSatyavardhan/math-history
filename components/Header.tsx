import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="sticky-header bg-gray-900 bg-opacity-80 backdrop-blur-md border-b border-gray-700">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h1 className="text-2xl font-bold text-white">A Conceptual History of Modern Mathematics</h1>
            </div>
        </header>
    );
};

export default Header;