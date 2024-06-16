import { Summary, DefaultDuration } from "../types/Summary";

/**
 * Update the number of standing in the summary object
 * @param numberOfStanding
 * @constructor
 */
const UpdateNumberOfStanding = async (numberOfStanding: number) => {
    chrome.storage.sync.get(["summary"], (result) => {
        let summary: Summary = result.summary;
        if (!summary) {
            summary = Summary.create(DefaultDuration.start_time, DefaultDuration.end_time);
        }
        chrome.storage.sync.set({summary});
    });
}

export default UpdateNumberOfStanding;
