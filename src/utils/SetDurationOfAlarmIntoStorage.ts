import GetObjectFromStorage from "./GetObjectFromStorage";
import {AimDuration, Result} from "../types/Summary";
import {ChangeTimeToMinutes} from "./ChangeTimeToMinutes";
import CalculateHowManyTimesToStand from "./CalculateHowManyTimesToStand";

/**
 * Set the duration of alarm to be fired.
 * @constructor
 */
const SetDurationOfAlarmIntoStorage = async (aimDuration: AimDuration, currentDate: string) => {
    const summary = await GetObjectFromStorage('summary');
    summary.aim_duration = aimDuration;
    const spanOfAlarm = summary.span_of_alarm;

    const howManyToStand = CalculateHowManyTimesToStand(aimDuration.start_time, aimDuration.end_time, spanOfAlarm);

    console.log('result from SetDurationOfAlarmIntoStorage: ', summary.results[currentDate])

    if (!summary.results[currentDate]) {
        summary.results[currentDate] = {} as Result;
        summary.results[currentDate].number_of_standing = 0;
    }

    summary.results[currentDate] = {
        number_of_standing: summary.results[currentDate].number_of_standing,
        how_many_times_to_stand: howManyToStand
    }

    chrome.storage.sync.set({summary: summary}, () => {
        console.log('Summary updated for SetDuration: ', summary);
    });
    await chrome.alarms.clear('standUpAlarm');
}

export default SetDurationOfAlarmIntoStorage;