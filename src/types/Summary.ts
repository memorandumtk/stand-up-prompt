/**
 * The duration to be subjected to alarm.
 */
export type AimDuration = {
    start_time: string;
    end_time: string;
}
/**
 * The default duration.
 * @param start_time 09:00
 * @param end_time 18:00
 */
export const DefaultDuration = {
    start_time: "09:00",
    end_time: "18:00"
}

/**
 * The result of the standing. This is stored within a key of date in the Summary object.
 */
export type Result = {
    number_of_standing: number;
    how_many_times_to_stand: number;
};

/**
 * The summary object to be stored in the chrome storage.
 */
export class Summary {
    public aim_duration: AimDuration;
    public span_of_alarm: number; // Recommended to be 60 minutes for health, 1 minute for testing.
    public results: Record<string, Result>; // Use a Record to specify the shape of results

    constructor(start_time: string, end_time: string) {
        this.aim_duration = { start_time: start_time, end_time: end_time };
        this.span_of_alarm = 1;
        this.results = {};
    }

    public static create(start_time: string, end_time: string): Summary {
        return new Summary(start_time, end_time);
    }
}
