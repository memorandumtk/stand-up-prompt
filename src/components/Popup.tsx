import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Summary, Result} from "../types/Summary";
import GetObjectFromStorage from "../utils/GetObjectFromStorage";
import DeleteObjectFromStorage from "../utils/DeleteObjectFromStorage";

const Popup: React.FC = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const [summary, setSummary] = useState<Summary |null>(null);

    useEffect(() => {
        const fetchSummary = async () => {
            const summary = await GetObjectFromStorage('summary');
            setSummary(summary);
        };

        fetchSummary();
    }, []);

    console.log('Summary:', summary);
    const numberOfStanding = summary ? summary.results[currentDate]?.number_of_standing ?? 0 : 0;

    const HandleDeleteClick = async () => {
        await DeleteObjectFromStorage('summary');
    };

    return (
        <div>
            <h1>Stand-Up Reminder</h1>
            <p>{numberOfStanding}</p>
            <button onClick={HandleDeleteClick}>
                Delete Summary from Storage
            </button>
        </div>
    );
};

ReactDOM.render(<Popup/>, document.getElementById('root'));
