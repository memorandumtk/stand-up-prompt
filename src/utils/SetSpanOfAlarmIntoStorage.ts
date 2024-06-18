import GetObjectFromStorage from "./GetObjectFromStorage";
import {AimDuration} from "../types/Summary";
import {ChangeTimeToMinutes} from "./ChangeTimeToMinutes";

/**
 * Set the span of notifications
 * @constructor
 */
const SetSpanOfAlarmIntoStorage = async (spanOfAlarm: number, currentDate: string) => {
    const summary = await GetObjectFromStorage('summary');
    summary.span_of_alarm = spanOfAlarm;

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

export default SetSpanOfAlarmIntoStorage;