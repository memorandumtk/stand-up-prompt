import GetObjectFromStorage from "./GetObjectFromStorage";
import {AimDuration} from "../types/Summary";
import {ChangeTimeToMinutes} from "./ChangeTimeToMinutes";

/**
 * Set the duration of alarm to be fired.
 * @constructor
 */
const SetDurationOfAlarmIntoStorage = async (aimDuration: AimDuration, currentDate: string) => {
    const summary = await GetObjectFromStorage('summary');
    summary.aim_duration = aimDuration;
    const spanOfAlarm = summary.span_of_alarm;

    const howManyToStand = Math.floor((ChangeTimeToMinutes(summary.aim_duration.end_time) - ChangeTimeToMinutes(summary.aim_duration.start_time)) / spanOfAlarm);

    summary.results[currentDate] = {
        number_of_standing: summary.results[currentDate].number_of_standing,
        how_many_times_to_stand: howManyToStand
    }

    chrome.storage.sync.set({summary: summary}, () => {
        console.log('Summary updated for: ', summary);
    });
    await chrome.alarms.clear('standUpAlarm');
}

export default SetDurationOfAlarmIntoStorage;