import Summary from "../types/Summary";

const GetSummaryFromStorage = async (): Promise<Summary> => {
    // This process of making Promise object is needed to insert Summary object into the Promise object.
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(["summary"], (result) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            const summary = result.summary || {};
            resolve(summary);
        });
    });
}

export default GetSummaryFromStorage;