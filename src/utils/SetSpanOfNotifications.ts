import GetObjectFromStorage from "./GetObjectFromStorage";

const SetSpanOfNotifications = async (span: number) => {
    const summary = await GetObjectFromStorage('summary');
    summary.aim_hours = span;
    chrome.storage.sync.set({summary});
}

export default SetSpanOfNotifications;