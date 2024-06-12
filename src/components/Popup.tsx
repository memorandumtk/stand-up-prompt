import React, {useState, useEffect, ChangeEvent} from 'react';
import ReactDOM from 'react-dom';
import {Summary, Result} from "../types/Summary";
import GetObjectFromStorage from "../utils/GetObjectFromStorage";
import DeleteObjectFromStorage from "../utils/DeleteObjectFromStorage";
import SetSpanOfNotifications from "../utils/SetSpanOfNotifications";

const Popup: React.FC = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const [summary, setSummary] = useState<Summary | null>(null);
    const [aimHours, setAimHours] = useState<number>();

    useEffect(() => {
        const fetchSummary = async () => {
            const fetchedSummary = await GetObjectFromStorage('summary');
            setSummary(fetchedSummary);
            setAimHours(fetchedSummary?.aim_hours);
        };

        fetchSummary();
    }, []);

    console.log('Summary from Popup:', summary);
    const numberOfStanding = summary ? summary.results[currentDate]?.number_of_standing ?? 0 : 0;

    const HandleDeleteClick = async () => {
        await DeleteObjectFromStorage('summary');
    };

    const HandleSetSpanOfNotifications = async (event: ChangeEvent<HTMLInputElement>) => {
        const newAimHours = Number(event.target.value);
        setAimHours(newAimHours);  // Update local state
        if (summary) {
            const updatedSummary: Summary = {...summary, aim_hours: newAimHours};
            setSummary(updatedSummary);  // Update the summary state with the new aim hours
            await SetSpanOfNotifications(newAimHours);
        }
    };

    return (
        <div>
            <h1>Stand-Up Reminder</h1>
            <div>
                <p>{numberOfStanding}</p>
            </div>
            <div>
                <input
                    type="number"
                    value={aimHours ?? 0}  // Use local state for input value
                    onChange={HandleSetSpanOfNotifications}
                />
            </div>
            <div>
                <button onClick={HandleDeleteClick}>
                    Delete Summary from Storage
                </button>
            </div>
        </div>
    );
};

ReactDOM.render(<Popup/>, document.getElementById('root'));
