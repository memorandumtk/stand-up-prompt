import GetObjectFromStorage from "./GetObjectFromStorage";
import {AimDuration, Result} from "../types/Summary";
import {ChangeTimeToMinutes} from "./ChangeTimeToMinutes";
import CalculateHowManyTimesToStand from "./CalculateHowManyTimesToStand";

/**
 * Set the span of notifications
 * @constructor
 */
const SetSpanOfAlarmIntoStorage = async (spanOfAlarm: number, currentDate: string) => {
    const summary = await GetObjectFromStorage('summary');
    summary.span_of_alarm = spanOfAlarm;

    const howManyToStand = CalculateHowManyTimesToStand(summary.aim_duration.start_time, summary.aim_duration.end_time, spanOfAlarm);

    console.log('result from SetSpanOfAlarmIntoStorage: ', summary.results[currentDate])

    if (!summary.results[currentDate]) {
        summary.results[currentDate] = {} as Result;
        summary.results[currentDate].number_of_standing = 0;
    }

    summary.results[currentDate] = {
        number_of_standing: summary.results[currentDate].number_of_standing || 0,
        how_many_times_to_stand: howManyToStand
    }

    chrome.storage.sync.set({summary: summary}, () => {
        console.log('Summary updated for SetSpanOfAlarm: ', summary);
    });
    await chrome.alarms.clear('standUpAlarm');
}

export default SetSpanOfAlarmIntoStorage;