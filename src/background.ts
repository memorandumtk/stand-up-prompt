import { Summary } from "./types/Summary";

export {};  // This line makes the file a module
const ALARM_NAME = "StandUpAlarm";
const NOTIFICATION_NAME = "StandUpNotification";

console.log("Hello from the background script!", ALARM_NAME);

/**
 * Create an alarm to go off every minute
 * @param newAimValue unit: minutes
 */
async function createAlarm(newAimValue: number = 1) {
    const alarm = await chrome.alarms.get(ALARM_NAME);
    if (typeof alarm === 'undefined') {
        await chrome.alarms.create(ALARM_NAME, {
            periodInMinutes: newAimValue
        });
    }
}
createAlarm();

/**
 * Listen for the storage to change and log the new value
 */

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    if (namespace === "sync" && changes.summary) {
        const newSummary = changes.summary.newValue as Summary;
        await updateAlarm(newSummary.aim_minutes);
    }
});

/**
 * Update the alarm to go off every newAimHours
 * @param newAimValue unit: minutes
 */
async function updateAlarm(newAimValue: number) {
    await chrome.alarms.clear(ALARM_NAME);  // Clear existing alarm
    await createAlarm(newAimValue);
    console.log(`Alarm updated to repeat every ${newAimValue} minutes.`);
}

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
                        summary = Summary.create(2);
                    }

                    console.log('Summary From background:', summary);
                    // Format current date as YYYY-MM-DD to use as a key.
                    const currentDate = new Date().toISOString().split('T')[0];

                    if (!summary.results[currentDate]) {
                        summary.results[currentDate] = {
                            number_of_standing: 0
                        };
                    }

                    // Add or update the number of standings for today
                    const numberOfStanding = summary.results[currentDate].number_of_standing ?? 0;
                    summary.results[currentDate].number_of_standing = numberOfStanding + 1;

                    chrome.storage.sync.set({ summary: summary }, () => {
                        console.log('Summary updated for', currentDate, ':', summary);
                    });
                });
            }
        })
    }
});
