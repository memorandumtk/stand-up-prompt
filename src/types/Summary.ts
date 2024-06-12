export type Result = {
    number_of_standing: number;
};

export type AimValue = {
    value: number;
    unit: string;
}

export class Summary {
    public aim_minutes: number;
    public results: { [key: string]: Result };  // Using an object instead of an array

    constructor(aim_minutes: number) {
        this.aim_minutes = aim_minutes;
        this.results = {};  // Initialize as an empty object
    }

    public static create(aim_minutes: number): Summary {
        return new Summary(aim_minutes);
    }
}
