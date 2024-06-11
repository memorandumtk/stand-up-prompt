export {};  // This line makes the file a module
const ALARM_NAME = "standUpAlarm";
const NOTIFICATION_NAME = "standUpNotification";

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
            buttons: [{ title: "Got it!" }],
            priority: 0
        });
    }
});
