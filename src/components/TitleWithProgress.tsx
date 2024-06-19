import {Result, Summary} from "../types/Summary";
import React, {useEffect, useState} from "react";

interface TitleWithProgressProps {
    dataOfTheDay: Result | null;
}

const TitleWithProgress: React.FC<TitleWithProgressProps> = ({dataOfTheDay}) => {
    const [numberOfStanding, setNumberOfStanding] = useState(dataOfTheDay && dataOfTheDay.number_of_standing ? dataOfTheDay.number_of_standing : 0);
    const [howManyTimesToStand, setHowManyTimesToStand] = useState(dataOfTheDay && dataOfTheDay.how_many_times_to_stand ? dataOfTheDay.how_many_times_to_stand : 0);
    const [percentage, setPercentage] = useState(Math.min((numberOfStanding / howManyTimesToStand) * 100, 100));
    const [fixedPercentage, setFixedPercentage] = useState(isNaN(percentage) ? 0 : percentage.toFixed(2));

    useEffect(() => {
        if (dataOfTheDay) {
            setNumberOfStanding(dataOfTheDay.number_of_standing);
            setHowManyTimesToStand(dataOfTheDay.how_many_times_to_stand);
            setPercentage(Math.min((numberOfStanding / howManyTimesToStand) * 100, 100));
            setFixedPercentage(isNaN(percentage) ? 0 : percentage.toFixed(2));
        }
    }, [dataOfTheDay, numberOfStanding, howManyTimesToStand, percentage]);

    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, #FFAA33 ${fixedPercentage}%, lightgreen, white)`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
    };

    return (
        <h1
            className="text-2xl font-bold inline-block"
            style={gradientStyle}
        >
            Stand Up For Yourself!
        </h1>
    )
}

export default TitleWithProgress;