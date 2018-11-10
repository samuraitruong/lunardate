import { INT } from "../util";
import { getLunarMonth11 } from "./get-lunar-month11";
import { jdFromDate, jdToDate } from "./julian-date";
import { getLeapMonthOffset } from "./leap-year";
import { getNewMoonDay } from "./new-moon";

/* Convert a lunar date to the corresponding solar date */
export function convertLunar2Solar(lunarDay: number, lunarMonth: number, lunarYear: number, lunarLeap, timeZone) {
    let a11;
    let b11;
    let leapOff;
    let leapMonth;
    if (lunarMonth < 11) {
        a11 = getLunarMonth11(lunarYear - 1, timeZone);
        b11 = getLunarMonth11(lunarYear, timeZone);
    } else {
        a11 = getLunarMonth11(lunarYear, timeZone);
        b11 = getLunarMonth11(lunarYear + 1, timeZone);
    }
    const k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
    let off = lunarMonth - 11;
    if (off < 0) {
        off += 12;
    }
    if (b11 - a11 > 365) {
        leapOff = getLeapMonthOffset(a11, timeZone);
        leapMonth = leapOff - 2;
        if (leapMonth < 0) {
            leapMonth += 12;
        }
        if (lunarLeap !== 0 && lunarMonth !== leapMonth) {
            return new Array(0, 0, 0);
        } else if (lunarLeap !== 0 || off >= leapOff) {
            off += 1;
        }
    }
    const monthStart = getNewMoonDay(k + off, timeZone);
    return jdToDate(monthStart + lunarDay - 1);
}

/* Comvert solar date dd/mm/yyyy to the corresponding lunar date */
export function convertSolar2Lunar(dd: number, mm: number, yy: number, timeZone: number) {
    let k;
    let dayNumber;
    let monthStart;
    let a11;
    let b11;
    let lunarDay;
    let lunarMonth;
    let lunarYear;
    let lunarLeap;
    dayNumber = jdFromDate(dd, mm, yy);
    k = INT((dayNumber - 2415021.076998695) / 29.530588853);
    monthStart = getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
        monthStart = getNewMoonDay(k, timeZone);
    }
    // alert(dayNumber+" -> "+monthStart);
    a11 = getLunarMonth11(yy, timeZone);
    b11 = a11;
    if (a11 >= monthStart) {
        lunarYear = yy;
        a11 = getLunarMonth11(yy - 1, timeZone);
    } else {
        lunarYear = yy + 1;
        b11 = getLunarMonth11(yy + 1, timeZone);
    }
    lunarDay = dayNumber - monthStart + 1;
    const diff = INT((monthStart - a11) / 29);
    lunarLeap = 0;
    lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
        const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
        if (diff >= leapMonthDiff) {
            lunarMonth = diff + 10;
            if (diff === leapMonthDiff) {
                lunarLeap = 1;
            }
        }
    }
    if (lunarMonth > 12) {
        lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
        lunarYear -= 1;
    }
    return new Array(lunarDay, lunarMonth, lunarYear, lunarLeap);
}
