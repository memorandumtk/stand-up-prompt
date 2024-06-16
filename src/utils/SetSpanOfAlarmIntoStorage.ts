import GetObjectFromStorage from "./GetObjectFromStorage";
import {AimDuration} from "../types/Summary";

/**
 * Set the span of notifications
 * @constructor
 */
const SetSpanOfAlarmIntoStorage = async (spanOfAlarm: number) => {
    const summary = await GetObjectFromStorage('summary');
    summary.span_of_alarm = spanOfAlarm;
    console.log('Summary from SetSpanOfNotifications: ', summary);
    chrome.storage.sync.set({summary: summary}, () => {
        console.log('Summary updated for: ', summary);
    });
    await chrome.alarms.clear('standUpAlarm');
}

export default SetSpanOfAlarmIntoStorage;