import { INT } from "../util";
import { jdFromDate } from "./julian-date";
import { getNewMoonDay } from "./new-moon";
import { getSunLongitude } from "./sun-longitude";

/** Find the day that starts the luner month 11 of the given year for the given time zone */
export function getLunarMonth11(year: number, timeZone: number): number {
    // off = jdFromDate(31, 12, yy) - 2415021.076998695;
    const off = jdFromDate(31, 12, year) - 2415021;
    const k = INT(off / 29.530588853);
    let nm = getNewMoonDay(k, timeZone);
    const sunLong = getSunLongitude(nm, timeZone); // sun longitude at local midnight
    if (sunLong >= 9) {
        nm = getNewMoonDay(k - 1, timeZone);
    }
    return nm;
}
