import { Summary, DefaultDuration, AimDuration } from "./types/Summary";
import { GetCurrentMinutes } from "./utils/GetCurrentMinutes";
import {CreateAlarm, UpdateAlarm} from "./utils/ManipulateAlarm";
import GetObjectFromStorage from "./utils/GetObjectFromStorage";
import {ChangeTimeToMinutes} from "./utils/ChangeTimeToMinutes";

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

                chrome.storage.sync.get(["summary"], (result: {summary?: Summary}) => {
                    let summary = result.summary;
                    if (!summary) {
                        summary = Summary.create(DefaultDuration.start_time, DefaultDuration.end_time);
                    }

                    console.log('Summary From background:', summary);
                    // Format current date as YYYY-MM-DD to use as a key.
                    const currentDate = new Date().toISOString().split('T')[0];

                    // If results or results[currentDate] doesn't exist, create it.
                    if (summary.results === undefined) {
                        summary.results = {};
                    }

                    if (!summary.results[currentDate]) {
                        summary.results[currentDate] = {
                            number_of_standing: 0
                        };
                    }

                    // Update the number of standings for today
                    summary.results[currentDate].number_of_standing += 1;

                    chrome.storage.sync.set({ summary: summary }, () => {
                        console.log('Summary updated for', currentDate, ':', summary);
                    });
                });
            }
        })
    }
});
