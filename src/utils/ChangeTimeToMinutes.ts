/**
 * Change data of the string data of time into the number of minutes
 */
export function ChangeTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    console.log('Hours: ', hours, 'Minutes: ', minutes)
    return hours * 60 + minutes;
}
