import { convertSolar2Lunar } from "../src";
const today = new Date();
console.log(today.getFullYear(), today.getMonth(), today.getDate())
console.log("Today is lunar: ", convertSolar2Lunar(today.getDate(), today.getMonth() + 1, today.getFullYear(), 0));

console.log(convertSolar2Lunar(20, 5, 1990, 0));
