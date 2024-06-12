import { Summary } from "../types/Summary";

const UpdateNumberOfStanding = async (numberOfStanding: number) => {
    chrome.storage.sync.get(["summary"], (result) => {
        let summary: Summary = result.summary;
        if (!summary) {
            summary = Summary.create(2);
        }
        chrome.storage.sync.set({summary});
    });
}

export default UpdateNumberOfStanding;
