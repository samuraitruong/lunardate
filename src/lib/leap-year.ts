import { INT } from "../util";

import { getSunLongitude } from "./sun-longitude";

import { getNewMoonDay } from "./new-moon";

/** Find the index of the leap month after the month starting on the day a11. */
function getLeapMonthOffset(a11: number, timeZone: number) {
    const k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1; // We start with the month following lunar month 11
    let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    do {
        last = arc;
        i++;
        arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
}