import { PI } from "../model";
import { INT } from "../util";

/* Compute the time of the k-th new moon after the new moon of 1/1/1900 13:52 UCT
 * (measured as the number of days since 1/1/4713 BC noon UCT, e.g., 2451545.125 is 1/1/2000 15:00 UTC).
 * Returns a floating number, e.g., 2415079.9758617813 for k=2 or 2414961.935157746 for k=-2
 * Algorithm from: "Astronomical Algorithms" by Jean Meeus, 1998
 */
function newMoon(k) {
    const t = k / 1236.85; // Time in Julian centuries from 1900 January 0.5
    const t2 = t * t;
    const t3 = t2 * t;
    const dr = PI / 180;
    let jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * t2 - 0.000000155 * t3;
    jd1 = jd1 + 0.00033 * Math.sin((166.56 + 132.87 * t - 0.009173 * t2) * dr); // Mean new moon
    const m = 359.2242 + 29.10535608 * k - 0.0000333 * t2 - 0.00000347 * t3; // Sun's mean anomaly
    const mpr = 306.0253 + 385.81691806 * k + 0.0107306 * t2 + 0.00001236 * t3; // Moon's mean anomaly
    const f = 21.2964 + 390.67050646 * k - 0.0016528 * t2 - 0.00000239 * t3; // Moon's argument of latitude
    let c1 = (0.1734 - 0.000393 * t) * Math.sin(m * dr) + 0.0021 * Math.sin(2 * dr * m);
    c1 = c1 - 0.4068 * Math.sin(mpr * dr) + 0.0161 * Math.sin(dr * 2 * mpr);
    c1 = c1 - 0.0004 * Math.sin(dr * 3 * mpr);
    c1 = c1 + 0.0104 * Math.sin(dr * 2 * f) - 0.0051 * Math.sin(dr * (m + mpr));
    c1 = c1 - 0.0074 * Math.sin(dr * (m - mpr)) + 0.0004 * Math.sin(dr * (2 * f + m));
    c1 = c1 - 0.0004 * Math.sin(dr * (2 * f - m)) - 0.0006 * Math.sin(dr * (2 * f + mpr));
    c1 = c1 + 0.0010 * Math.sin(dr * (2 * f - mpr)) + 0.0005 * Math.sin(dr * (2 * mpr + m));
    let deltat: number;
    if (t < -11) {
        deltat = 0.001 + 0.000839 * t + 0.0002261 * t2 - 0.00000845 * t3 - 0.000000081 * t * t3;
    } else {
        deltat = -0.000278 + 0.000265 * t + 0.000262 * t2;
    }
    const jdNew = jd1 + c1 - deltat;
    return jdNew;
}

/** Compute the day of the k-th new moon in the given time zone.
 * The time zone if the time difference between local time and UTC: 7.0 for UTC+7:00
 */
export function getNewMoonDay(k, timeZone) {
    return INT(newMoon(k) + 0.5 + timeZone / 24);
}
