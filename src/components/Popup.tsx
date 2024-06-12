import React, {useState, useEffect, ChangeEvent} from 'react';
import ReactDOM from 'react-dom';
import {Summary, Result, AimValue} from "../types/Summary";
import GetObjectFromStorage from "../utils/GetObjectFromStorage";
import DeleteObjectFromStorage from "../utils/DeleteObjectFromStorage";
import SetSpanOfNotifications from "../utils/SetSpanOfNotifications";

const Popup: React.FC = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const [summary, setSummary] = useState<Summary | null>(null);
    const [aimValue, setAimValue] = useState<AimValue>({value: 0, unit: 'minutes'});

    useEffect(() => {
        const fetchSummary = async () => {
            const fetchedSummary = await GetObjectFromStorage('summary');
            setSummary(fetchedSummary);
            setAimValue({...aimValue, value: fetchedSummary.aim_minutes});
        };

        fetchSummary();
    }, []);

    const numberOfStanding = summary ? summary.results[currentDate]?.number_of_standing ?? 0 : 0;

    const HandleDeleteClick = async () => {
        await DeleteObjectFromStorage('summary');
    };

    const HandleSubmitOfSpanOfNotifications = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (summary) {
            await SetSpanOfNotifications(aimValue.value);
        }
        console.log('Summary from Popup in function HandleSubmit: ', summary);
    }

    const HandleChangeOfSpanUnit = async (event: ChangeEvent<HTMLSelectElement>) => {
        event.isPropagationStopped();
        const newUnit = event.target.value;
        setAimValue({...aimValue, unit: newUnit});
    }

    const HandleChangeOfSpanValue = async (event: ChangeEvent<HTMLInputElement>) => {
        let newAimValue = Number(event.target.value);
        if (aimValue.unit === 'hours') {
            newAimValue *= 60;
        }
        setAimValue({...aimValue, value: newAimValue});
    };

    return (
        <div>
            <h1>Stand-Up Reminder</h1>
            <div>
                <p>{numberOfStanding}</p>
            </div>
            <div>
                <form
                    onSubmit={HandleSubmitOfSpanOfNotifications}
                >
                    <label>
                        <input
                            type="number"
                            value={!aimValue.value
                                ? ''
                                : aimValue.unit === 'hours'
                                    ? aimValue.value / 60
                                    : aimValue.value
                            }
                            onChange={HandleChangeOfSpanValue}
                        />
                    </label>

                    <label>
                        <select
                            value={aimValue.unit}
                            onChange={HandleChangeOfSpanUnit}
                        >
                            <option value="minutes">Minutes</option>
                            <option value="hours">Hours</option>
                        </select>
                    </label>

                    <button>
                    Set Span of Notifications
                    </button>
                </form>
            </div>
            <div>
                <button
                    type="submit"
                    onClick={HandleDeleteClick}
                >
                    Delete Summary from Storage
                </button>
            </div>
        </div>
    );
};

ReactDOM.render(<Popup/>, document.getElementById('root'));
