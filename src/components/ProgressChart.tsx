// src/components/ProgressChart.tsx
import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js';

Chart.register(ArcElement);

interface ProgressChartProps {
    currentStanding: number;
    goal: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({currentStanding, goal}) => {
    const data = {
        labels: ['Standing', 'Remaining'],
        datasets: [
            {
                label: 'Progress Chart',
                data: [currentStanding, goal],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
            }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false
    };

    return (
        <div style={{width: '100%', height: '100px'}}>
            <Doughnut data={data} options={options}/>
        </div>
    );
};

export default ProgressChart;
