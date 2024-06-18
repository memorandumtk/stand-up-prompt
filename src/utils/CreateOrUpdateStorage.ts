import {DefaultDuration, Summary} from "../types/Summary";
import {ChangeTimeToMinutes} from "./ChangeTimeToMinutes";
import CalculateHowManyTimesToStand from "./CalculateHowManyTimesToStand";

/**
 * Create or update the storage with the key of summary.
 * @param keyOfStorage
 * @constructor
 */
const CreateOrUpdateStorage = async (keyOfStorage: string) => {
    try {
        chrome.storage.sync.get(keyOfStorage, async (result: { summary?: Summary }) => {
            let summary = result.summary;
            if (!summary) {
                summary = Summary.create(DefaultDuration.start_time, DefaultDuration.end_time);
            }

            const spanOfAlarm = summary.span_of_alarm;

            console.log('Summary From background:', summary);

            // Format current date as YYYY-MM-DD to use as a key.
            const currentDate = new Date().toISOString().split('T')[0];

            // Set the number that user to stand up.
            const howManyToStand = CalculateHowManyTimesToStand(summary.aim_duration.start_time, summary.aim_duration.end_time, spanOfAlarm);

            // If results or results[currentDate] doesn't exist, create it.
            if (summary.results === undefined) {
                summary.results = {};
            }

            if (!summary.results[currentDate]) {
                summary.results[currentDate] = {
                    number_of_standing: 0,
                    how_many_times_to_stand: howManyToStand
                }
            } else {
                const currentNumberOfStanding = summary.results[currentDate].number_of_standing
                    ? summary.results[currentDate].number_of_standing : 0;
                summary.results[currentDate] = {
                    number_of_standing: currentNumberOfStanding,
                    how_many_times_to_stand: howManyToStand
                }
            }

            // Update the number of standings for today
            summary.results[currentDate].number_of_standing += 1;

            chrome.storage.sync.set({summary: summary}, () => {
                console.log('Summary updated for', currentDate, ':', summary);
            });
        });

    } catch (error) {
        console.log('Error in CreateOrUpdateStorage:');
        console.error('Error in CreateOrUpdateStorage:', error);
    }
}

export default CreateOrUpdateStorage;