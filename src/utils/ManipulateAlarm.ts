import { Summary, DefaultDuration, AimDuration } from "../types/Summary";
import { GetCurrentMinutes } from "./GetCurrentMinutes";
import { ChangeTimeToMinutes } from "./ChangeTimeToMinutes";
import CreateOrUpdateStorage from "./CreateOrUpdateStorage";

const ALARM_NAME = "StandUpAlarm";
const NOTIFICATION_NAME = "StandUpNotification";

/**
 * Create an alarm to go off every minute
 * for production, span_of_alarm should be 60 minutes. 1 minute is for testing.
 */
export async function CreateAlarm(span_of_alarm: number = 1, start_time = 540, end_time = 1020) {
    const currentMinutes = GetCurrentMinutes();
    let nextAlarmInMinutes = span_of_alarm - (currentMinutes % span_of_alarm);
    const currentDate = new Date().toISOString().split('T')[0];

    if (currentMinutes < start_time) {
        // If the current time is before the start time, set the alarm to go off at the start time
        nextAlarmInMinutes = start_time - currentMinutes;

    } else if (currentMinutes >= end_time) {
        // If the current time is after the end time, set the alarm to start at the start time tomorrow
        nextAlarmInMinutes = (1440 - currentMinutes) + start_time; // 1440 minutes in a day

    } else {
        const alarm = await chrome.alarms.get(ALARM_NAME);
    }

    await chrome.alarms.create(ALARM_NAME, {
        delayInMinutes: nextAlarmInMinutes,
        periodInMinutes: span_of_alarm,
    });

}

/**
 * Update the alarm to go off every newAimHours
 */
export async function UpdateAlarm(newSpanOfAlarm: number, newAimDuration: AimDuration) {
    await chrome.alarms.clear(ALARM_NAME);  // Clear existing alarm

    const convertedStartTime = ChangeTimeToMinutes(newAimDuration.start_time);
    const convertedEndTime = ChangeTimeToMinutes(newAimDuration.end_time);

    await CreateAlarm(newSpanOfAlarm, convertedStartTime, convertedEndTime);

    console.log(`Alarm updated to repeat within: `, newAimDuration.start_time, newAimDuration.end_time);
}

