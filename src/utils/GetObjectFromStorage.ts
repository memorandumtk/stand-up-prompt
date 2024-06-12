import { Summary, Result } from "../types/Summary";

const GetObjectFromStorage = async (StoreId: string): Promise<Summary> => {
    // This process of making Promise object is needed to insert Summary object into the Promise object.
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([StoreId], (result) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            const summary = result.summary || {};
            resolve(summary);
        });
    });
}

export default GetObjectFromStorage;