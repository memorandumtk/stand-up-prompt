import { Summary, DefaultDuration, AimDuration } from "./types/Summary";
import { GetCurrentMinutes } from "./utils/GetCurrentMinutes";
import {CreateAlarm, UpdateAlarm} from "./utils/ManipulateAlarm";
import GetObjectFromStorage from "./utils/GetObjectFromStorage";
import {ChangeTimeToMinutes} from "./utils/ChangeTimeToMinutes";
import CreateOrUpdateStorage from "./utils/CreateOrUpdateStorage";

export {};  // This line makes the file a module
const ALARM_NAME = "StandUpAlarm";
const NOTIFICATION_NAME = "StandUpNotification";

console.log("Hello from the background script!", ALARM_NAME);

/**
 * Create an alarm if it doesn't exist on chrome storage.
 */
GetObjectFromStorage('summary')
    .then(async data => {
        const currentSummary = data as Summary;
        console.log('Current Summary:', currentSummary);
        if (!currentSummary) {
            CreateAlarm().then(r => console.log('Alarm created'));
        }
    });

/**
 * Listen for the storage to change and log the new value
 */
chrome.storage.onChanged.addListener(async (changes, namespace) => {
    if (namespace === "sync" && changes.summary) {
        const newSummary = changes.summary.newValue as Summary;
        await UpdateAlarm(newSummary.span_of_alarm, newSummary.aim_duration);
    }
});

/**
 * Listen for the alarm to go off and create a notification
 */
chrome.alarms.onAlarm.addListener(alarm => {
    console.log('Received alarm: ', alarm);
    if (alarm.name === ALARM_NAME) {
        chrome.notifications.create(NOTIFICATION_NAME, {
            type: "basic",
            iconUrl: "logo192.png",
            title: "Time to Stand Up!",
            message: "It's time to stand up and stretch a bit.",
            priority: 0
        });

        chrome.notifications.onClicked.addListener(notificationId => {
            if (notificationId === NOTIFICATION_NAME) {
                chrome.notifications.clear(NOTIFICATION_NAME);

                console.log('Notification clicked and storage will be updated.');
                CreateOrUpdateStorage('summary')
                    .then(r => console.log('Summary updated successfully'))
            }
        })
    }
});
