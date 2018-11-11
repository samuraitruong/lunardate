export class LunarDate {
    constructor(public year: number, public month: number, public day: number, public isLeafYear: boolean) {}
    get toDate(): Date {
        return new Date(this.year, this.month, this.day);
    }
}
export const PI = Math.PI;
