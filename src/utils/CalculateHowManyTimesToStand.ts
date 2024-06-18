import {ChangeTimeToMinutes} from "./ChangeTimeToMinutes";
import {DefaultDuration} from "../types/Summary";

/**
 * Calculate how many times to stand up
 * @constructor
 */
const CalculateHowManyTimesToStand = (startTime: string, endTime: string, spanOfAlarm: number): number => {
    return Math.floor((ChangeTimeToMinutes(endTime) - ChangeTimeToMinutes(startTime)) / spanOfAlarm);
}

export default CalculateHowManyTimesToStand;