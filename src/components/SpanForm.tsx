import React, {ChangeEvent} from "react";
import {AimDuration} from "../types/Summary";

interface SpanFormProps {
    spanOfAlarm: number;
    handleSpanOfAlarmChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmitSpanOfAlarm: (event: ChangeEvent<HTMLFormElement>) => void;
}

const SpanForm: React.FC<SpanFormProps> = ({spanOfAlarm, handleSubmitSpanOfAlarm, handleSpanOfAlarmChange}) => {

    const classNameForButton = "relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-gray-100 dark:text-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800";

    const classNameForSpan = "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0";

    return (
        <form onSubmit={handleSubmitSpanOfAlarm}
              className="flex flex-col gap-2 justify-center items-center dark:bg-gray-800 rounded-md p-2 shadow-md shadow-gray-600"
        >

            <div>
                <label htmlFor="span-input"
                       className="block mb-2 text-sm text-gray-900 dark:text-gray-100">
                    Span of Alarm (minutes):
                    <p>Recommended 60 minutes for health</p>
                </label>
                <input type="number"
                       id="span-input"
                       aria-describedby="helper-text-explanation"
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                       placeholder="1"
                       min="1"
                       value={spanOfAlarm}
                       onChange={handleSpanOfAlarmChange}
                />
            </div>

            <button
                type="submit"
                className={classNameForButton}
            >
                <span className={classNameForSpan}>
                    Set Span Of Alarms
                </span>
            </button>
        </form>
    )
}

export default SpanForm;