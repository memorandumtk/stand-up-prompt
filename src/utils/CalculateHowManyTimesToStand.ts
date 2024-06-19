import {ChangeTimeToMinutes} from "./ChangeTimeToMinutes";
import {DefaultDuration} from "../types/Summary";

/**
 * Calculate how many times to stand up
 * @constructor
 */
const CalculateHowManyTimesToStand = (startTime: string, endTime: string, spanOfAlarm: number): number => {
    if (!startTime || !endTime) {
        return 0;
    }
    // Calculate for end time of the next day.
    if (endTime < startTime) {
        return Math.floor(1440 + ChangeTimeToMinutes(endTime) - ChangeTimeToMinutes(startTime) / spanOfAlarm);
    }
    return Math.floor((ChangeTimeToMinutes(endTime) - ChangeTimeToMinutes(startTime)) / spanOfAlarm);
}

export default CalculateHowManyTimesToStand;