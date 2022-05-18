import {AdRecord} from "../records/ad.record";

test("Can build AdRecord", () => {
    const ad = new AdRecord({
        name: "test name",
        description: "blablabla",
        url: "https://megak.pl",
        price: 0,
        lat: 9,
        lon: 9,
    });

    expect(ad.name).toBe("test name");
    expect(ad.description).toBe("blablabla");
    expect(ad.url).toBe("https://megak.pl");
    expect(ad.price).toBe(0);
    expect(ad.lat).toBe(9);
    expect(ad.lon).toBe(9);
})
