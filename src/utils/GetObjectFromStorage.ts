import {Summary, Result} from "../types/Summary";

const GetObjectFromStorage = async (StoreId: string): Promise<Summary> => {
    // This process of making Promise object is needed to insert Summary object into the Promise object.
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([StoreId], (result) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                const summary: Summary = result.summary || {
                    aim_duration: {
                        start_time: '09:00',
                        end_time: '18:00',
                    },
                    span_of_alarm: 1,
                    results: {} as {
                        [key: string]: Result
                    }
                };
                console.log('Summary from GetObjectFromStorage: ', summary);
                resolve(summary);
            }
        )
        ;
    });
}

export default GetObjectFromStorage;