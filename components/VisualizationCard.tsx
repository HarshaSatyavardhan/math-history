
import React from 'react';

interface VisualizationCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const VisualizationCard: React.FC<VisualizationCardProps> = ({ title, description, children }) => {
    return (
        <div className="bg-gray-700 p-4 rounded-lg">
            {children}
            <p className="mt-2 text-white font-medium">{title}</p>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    );
};

export default VisualizationCard;
