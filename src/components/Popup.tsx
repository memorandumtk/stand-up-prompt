import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Summary from "../types/Summary";
import GetSummaryFromStorage from "../utils/GetSummaryFromStorage";

const Popup: React.FC = () => {
    const [summary, setSummary] = useState<Summary>({number_of_standing: 0});

    useEffect(() => {
        const fetchSummary = async () => {
            const summary = await GetSummaryFromStorage();
            setSummary(summary);
        };

        fetchSummary();
    }, []);

    return (
        <div>
            <h1>Stand-Up Reminder</h1>
            <p>{summary.number_of_standing}</p>
        </div>
    );
};

ReactDOM.render(<Popup/>, document.getElementById('root'));
