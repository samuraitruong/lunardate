import {jdFromDate} from "./lib/julian-date";
export class LunarDate {
    constructor(public year: number, public month: number, public day: number, public isLeafYear: boolean) {}
    get toDate(): Date {
        return new Date(this.year, this.month, this.day);
    }
    get toJd(): number {
    	return jdFromDate(this.day, this.month, this.year);
    }
}
export const PI = Math.PI;
