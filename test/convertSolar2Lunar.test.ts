import { convertSolar2Lunar } from "../src/lib/conver-solar-lunar";
import { expect } from "chai";
import { LunarDate } from "../src/model";
import "mocha";
const data = [
    {
        lunar: [
            2017, 11, 15, false
        ],
        solar: [2018, 1, 1]
    }, {
        lunar: [
            1984, 3, 20, false
        ],
        solar: [1984, 4, 20]
    }, {
        lunar: [
            2018, 4, 1, false
        ],
        solar: [2018, 5, 15]
    }
]
describe("convertSolar2Lunar test", () => {
    it("convertSolar2Lunar 1", () => {
        const output = convertSolar2Lunar(10, 11, 2018, 7);
        console.log(output);
        expect(output)
            .to
            .deep
            .eq(new LunarDate(2018, 10, 4, false));
    });
    data.forEach((td) => {
        it(`convertSolar2Lunar(${td.solar[0]}, ${td.solar[1]}, ${td.solar[2]}) ==>> ${td.lunar[2]}/${td.lunar[1]}/${td.lunar[0]}`, () => {
            const [year,
                month,
                day] = td.solar;
            const output = convertSolar2Lunar(day, month, year, 7);
            expect(output)
                .to
                .deep
                .eq(new LunarDate(td.lunar[0]as number, td.lunar[1]as number, td.lunar[2]as number, false));
        });
    });
})
