import {Result, Summary} from "../types/Summary";
import React from "react";

interface TitleWithProgressProps {
    dataOfTheDay: Result | null;
}

const TitleWithProgress: React.FC<TitleWithProgressProps> = ({dataOfTheDay}) => {
    const numberOfStanding = dataOfTheDay && dataOfTheDay.number_of_standing ? dataOfTheDay.number_of_standing : 0;
    const howManyTimesToStand = dataOfTheDay && dataOfTheDay.how_many_times_to_stand ? dataOfTheDay.how_many_times_to_stand : 0;

    const percentage = Math.min((numberOfStanding / howManyTimesToStand) * 100, 100);

    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, #FFAA33 ${percentage}%, lightgreen, white)`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
    };

    return (
        <h1
            className="text-2xl font-bold inline-block"
            style={gradientStyle}
        >
            Stand Up Reminder {percentage.toFixed(2)}%
        </h1>
    )
}

export default TitleWithProgress;