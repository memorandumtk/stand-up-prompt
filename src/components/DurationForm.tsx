import React, {useState, useEffect, ChangeEvent} from 'react';
import ReactDOM from 'react-dom';
import {Summary, Result, AimDuration, DefaultDuration} from "../types/Summary";

interface DurationFormProps {
    aimDuration: AimDuration;
    handleTimeChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSetDurationOfAlarm: (event: ChangeEvent<HTMLFormElement>) => void;
}

/**
 * Form for setting the duration of alarm.
 * @constructor
 */
const DurationForm: React.FC<DurationFormProps> = ({aimDuration, handleTimeChange, handleSetDurationOfAlarm}) => {

    return (
        <form
            onSubmit={handleSetDurationOfAlarm}
        >
            <div>
                <label>
                    Start Time:
                    <input
                        type="time"
                        name="start_time"
                        value={aimDuration.start_time}
                        onChange={handleTimeChange}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    End Time:
                    <input
                        type="time"
                        name="end_time"
                        value={aimDuration.end_time}
                        onChange={handleTimeChange}
                        required
                    />
                </label>
            </div>
            <button>
                Set Duration of Notifications
            </button>
        </form>
    )
}

export default DurationForm;