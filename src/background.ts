import { Summary } from "./types/Summary";

export {};  // This line makes the file a module
const ALARM_NAME = "StandUpAlarm";
const NOTIFICATION_NAME = "StandUpNotification";

console.log("Hello from the background script!", ALARM_NAME);

async function createAlarm() {
    const alarm = await chrome.alarms.get(ALARM_NAME);
    if (typeof alarm === 'undefined') {
        await chrome.alarms.create(ALARM_NAME, {
            periodInMinutes: 1
        });
    }
}

createAlarm();

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
