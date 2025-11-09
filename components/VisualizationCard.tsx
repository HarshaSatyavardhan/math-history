import React from 'react';

interface VisualizationCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const VisualizationCard: React.FC<VisualizationCardProps> = ({ title, description, children }) => {
    return (
        <div className="bg-white dark:bg-gray-700 p-5 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-3">
                {children}
            </div>
            <p className="mt-3 text-gray-900 dark:text-white font-semibold text-sm">{title}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        </div>
    );
};

export default VisualizationCard;
