import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Popup: React.FC = () => {
    const [summary, setSummary] = useState<string>("");

    useEffect(() => {
        chrome.storage.sync.get(["summary"], (result) => {
            setSummary(result.summary || "No summary available.");
        });
    }, []);

    return (
        <div>
            <h1>Stand-Up Reminder</h1>
            <p>{summary}</p>
        </div>
    );
};

ReactDOM.render(<Popup />, document.getElementById('root'));
