import React from 'react';

interface ProgressBarProps {
    currentStanding: number;
    goal: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({currentStanding, goal}) => {
    const percentage = Math.min((currentStanding / goal) * 100, 100);

    return (
        <div className="w-full bg-gray-900 dark:border-gray-600 rounded-full h-4">
                <span>
                    {currentStanding}
                </span>
            <div
                className="bg-green-500 h-4 rounded-full"
                style={{width: `${percentage}%`}}
            >
            </div>
        </div>
    );
};

export default ProgressBar;
