declare namespace lunardate {
    export class LunarDate {
        public day : number;
        public month : number;
        public year : number;
        public isLeafYear : boolean;
        public toDate : () => Date;
    }
    export function convertLunar2Solar(lunarDay : number, lunarMonth : number, lunarYear : number, lunarLeap, timeZone) : Date;
    /** Comvert solar date dd/mm/yyyy to the corresponding lunar date
     * @param {number} day
     * @param {number} month
     * @param {number} year
     * @returns the date in lunar calendar system
     */
    export function convertSolar2Lunar(day : number, month : number, year : number, timeZone : number) : LunarDate;
}