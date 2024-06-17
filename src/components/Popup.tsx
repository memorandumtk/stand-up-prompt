import React, {useState, useEffect, ChangeEvent} from 'react';
import ReactDOM from 'react-dom';
import {Summary, Result, AimDuration, DefaultDuration} from "../types/Summary";
import GetObjectFromStorage from "../utils/GetObjectFromStorage";
import DeleteObjectFromStorage from "../utils/DeleteObjectFromStorage";
import SetDurationOfAlarmIntoStorage from "../utils/SetDurationOfAlarmIntoStorage";
import DurationForm from "./DurationForm";
import SetSpanOfAlarmIntoStorage from "../utils/SetSpanOfAlarmIntoStorage";
import '../css/Popup.css'
import SpanForm from "./SpanForm";

const Popup: React.FC = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const [summary, setSummary] = useState<Summary | null>(null);
    const [aimDuration, setAimDuration] = useState<AimDuration>(DefaultDuration);
    const [spanOfAlarm, setSpanOfAlarm] = useState<number>(1);

    useEffect(() => {
        const fetchSummary = async () => {
            const fetchedSummary = await GetObjectFromStorage('summary');
            console.log('Summary from Popup: ', fetchedSummary);
            if (fetchedSummary) {
                setSummary(fetchedSummary);
                setAimDuration(fetchedSummary.aim_duration ? fetchedSummary.aim_duration : DefaultDuration);
                setSpanOfAlarm(fetchedSummary.span_of_alarm ? fetchedSummary.span_of_alarm : 1)
            }
        };

        fetchSummary();

        // Listen for the storage to change and log the new value
        const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
            if (areaName === "sync" && changes.summary) {
                const newSummary = changes.summary.newValue as Summary;
                setSummary(newSummary);
                if (newSummary.aim_duration) {
                    setAimDuration(newSummary.aim_duration);
                }
                if (newSummary.span_of_alarm) {
                    setSpanOfAlarm(newSummary.span_of_alarm);
                }
            }
        };

        chrome.storage.onChanged.addListener(handleStorageChange);

        // Clean up the listener when the component is unmounted
        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange);
        };
    }, []);

    const handleDeleteClick = async () => {
        await DeleteObjectFromStorage('summary');
    };

    const handleSetDurationOfAlarm = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (summary) {
            await SetDurationOfAlarmIntoStorage(aimDuration);
        }
        console.log('Summary from Popup in function HandleSubmit: ', summary);
    }

    const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAimDuration(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmitSpanOfAlarm = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (summary) {
            await SetSpanOfAlarmIntoStorage(spanOfAlarm);
        }
        console.log('Summary from Popup in function HandleSubmit: ', summary);
    }

    const handleSpanOfAlarmChange = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const value = event.target.value;
        const parsedValue = parseInt(value);
        if (!isNaN(parsedValue) && parsedValue > 0) {
            setSpanOfAlarm(parsedValue);
        } else {
            console.log('Invalid value for span of alarm')
        }
    };

    return (
        <div className="w-96 h-full">
            <h1>Stand-Up Reminder</h1>

            <div>
                <p>{summary && summary.results && summary.results[currentDate]
                    ? summary.results[currentDate].number_of_standing
                    : 0}</p>
            </div>

            <div>
               <DurationForm
                    aimDuration={aimDuration}
                    handleTimeChange={handleTimeChange}
                    handleSetDurationOfAlarm={handleSetDurationOfAlarm}
               />
            </div>

            <div>
                <p>Current Span of Alarm(min): {spanOfAlarm}</p>
                <p>Recommended 60 minutes for </p>
                <SpanForm
                    spanOfAlarm={spanOfAlarm}
                    handleSubmitSpanOfAlarm={handleSubmitSpanOfAlarm}
                    handleSpanOfAlarmChange={handleSpanOfAlarmChange}
                />
            </div>

            <div>
                <button
                    type="submit"
                    onClick={handleDeleteClick}
                >
                    Delete Summary from Storage
                </button>
            </div>
        </div>
    );
};

ReactDOM.render(<Popup/>, document.getElementById('root'));
