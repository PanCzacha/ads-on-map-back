import {AdRecord} from "../records/ad.record";

const testString = (num: number) => {
    const text = "x"
    return text.repeat(num);
}

const defaultObj = new AdRecord({
    name: "test name",
    description: "blablabla",
    url: "https://megak.pl",
    price: 0,
    lat: 9,
    lon: 9
});


test("Validates invalid name", () => {
    expect(() => {
        new AdRecord({
            ...defaultObj,
            name: testString(101),
        })
    }).toThrow();
});
test("Validates invalid description", () => {
    expect(() => {
        new AdRecord({
            ...defaultObj,
            description: testString(1001),
        })
    }).toThrow();
});
test("Validates invalid url", () => {
    expect(() => {
        new AdRecord({
            ...defaultObj,
            url: testString(101),
        })
    }).toThrow();
});
test("Validates invalid price", () => {
    expect(() => {
        new AdRecord({
            ...defaultObj,
            price: 10000000000,
        })
    }).toThrow();
});


