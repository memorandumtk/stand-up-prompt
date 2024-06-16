import React, {useState, useEffect, ChangeEvent} from 'react';
import ReactDOM from 'react-dom';
import {Summary, Result, AimDuration, DefaultDuration} from "../types/Summary";
import GetObjectFromStorage from "../utils/GetObjectFromStorage";
import DeleteObjectFromStorage from "../utils/DeleteObjectFromStorage";
import SetDurationOfAlarmIntoStorage from "../utils/SetDurationOfAlarmIntoStorage";
import DurationForm from "./DurationForm";
import SetSpanOfAlarmIntoStorage from "../utils/SetSpanOfAlarmIntoStorage";
import '../css/Popup.css'

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
                <form onSubmit={handleSubmitSpanOfAlarm}>
                    <input
                        type="number"
                        value={spanOfAlarm}
                        onChange={handleSpanOfAlarmChange}
                    />
                    <button>
                        Set span of alarms
                    </button>
                </form>
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
