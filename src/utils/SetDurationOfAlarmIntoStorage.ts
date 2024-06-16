import GetObjectFromStorage from "./GetObjectFromStorage";
import {AimDuration} from "../types/Summary";

/**
 * Set the duration of alarm to be fired.
 * @constructor
 */
const SetDurationOfAlarmIntoStorage = async (aimDuration: AimDuration) => {
    const summary = await GetObjectFromStorage('summary');
    summary.aim_duration = aimDuration;
    chrome.storage.sync.set({summary: summary}, () => {
        console.log('Summary updated for: ', summary);
    });
    await chrome.alarms.clear('standUpAlarm');
}

export default SetDurationOfAlarmIntoStorage;