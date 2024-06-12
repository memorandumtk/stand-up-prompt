import GetObjectFromStorage from "./GetObjectFromStorage";

/**
 * Set the span(aim_minutes) of notifications
 * @param span
 * @constructor
 */
const SetSpanOfNotifications = async (span: number) => {
    const summary = await GetObjectFromStorage('summary');
    summary.aim_minutes = span;
    console.log('Summary from SetSpanOfNotifications: ', summary);
    chrome.storage.sync.set({ summary: summary }, () => {
        console.log('Summary updated for: ', summary);
    });
    chrome.alarms.clear('standUpAlarm');

}

export default SetSpanOfNotifications;