import Summary from "../types/Summary";

const UpdateNumberOfStanding = async (numberOfStanding: number) => {
    chrome.storage.sync.get(["summary"], (result) => {
        let summary: Summary = result.summary;
        summary.number_of_standing = numberOfStanding;
        chrome.storage.sync.set({summary});
    });
}

export default UpdateNumberOfStanding;
