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

    const classNameForButton = "relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800";

    const classNameForSpan = "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0";

    return (
        <form
            onSubmit={handleSetDurationOfAlarm}
            className="flex flex-col gap-2 justify-center items-center dark:bg-gray-800 rounded-md p-2 shadow-md shadow-gray-600"
        >
            <div className="flex gap-2 justify-center items-center">
                <label htmlFor="start_time"
                       className="text-sm font-medium"
                >
                    Start Time:
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd"
                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <input type="time"
                           id="start_time"
                           name="start_time"
                           className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           value={aimDuration.start_time}
                           onChange={handleTimeChange}
                    />
                </div>
            </div>

            <div className="flex gap-2 justify-center items-center">
                <label htmlFor="end_time"
                       className="text-sm font-medium"
                >
                    End Time:
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd"
                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </div>
                    <input type="time"
                           id="end_time"
                           name="end_time"
                           className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           value={aimDuration.end_time}
                           onChange={handleTimeChange}
                    />
                </div>
            </div>

            <button
                type="submit"
                className={classNameForButton}
            >
                <span className={classNameForSpan}>
                    Set Duration of Notifications
                </span>
            </button>
        </form>
    )
}

export default DurationForm;