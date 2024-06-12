export type Result = {
    number_of_standing: number;
};

export class Summary {
    public aim_hours: number;
    public results: { [key: string]: Result };  // Using an object instead of an array

    constructor(aim_hours: number) {
        this.aim_hours = aim_hours;
        this.results = {};  // Initialize as an empty object
    }

    public static create(aim_hours: number): Summary {
        return new Summary(aim_hours);
    }

    // Method to add or update results
    public AddOrUpdateResult(date: string, number_of_standing: number): void {
        if (this.results[date]) {
            this.results[date].number_of_standing += number_of_standing;  // Update existing entry
        } else {
            this.results[date] = { number_of_standing };  // Create new entry
        }
    }
}
