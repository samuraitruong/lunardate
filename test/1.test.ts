import { expect } from "chai";
import "mocha";
import { convertSolar2Lunar } from "../src/lib/conver-solar-lunar";

describe("convertSolar2Lunar test", () => {
    it("convertSolar2Lunar 1", () => {
        const output = convertSolar2Lunar(10, 11, 2018, 7);
        console.log(output);
        expect(output).to.deep.eq([4, 10, 2018, 0]);
    });
});
