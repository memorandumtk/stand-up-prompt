import React, {ChangeEvent} from "react";
import {AimDuration} from "../types/Summary";

interface SpanFormProps {
    spanOfAlarm: number;
    handleSpanOfAlarmChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmitSpanOfAlarm: (event: ChangeEvent<HTMLFormElement>) => void;
}

const SpanForm: React.FC<SpanFormProps> = ({spanOfAlarm, handleSubmitSpanOfAlarm, handleSpanOfAlarmChange}) => {

    return (
        <form onSubmit={handleSubmitSpanOfAlarm}>
            <input
                type="number"
                value={spanOfAlarm}
                onChange={handleSpanOfAlarmChange}
                min="1"
            />
            <button>
                Set span of alarms
            </button>
        </form>
    )
}

export default SpanForm;