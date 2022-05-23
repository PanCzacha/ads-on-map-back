import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";

test("AdRecord returns data from database for one entry", async () => {
    const ad = await AdRecord.findOne("abc45334bvddf");

    expect(ad).toBeDefined();
    expect(ad.id).toBe("abc45334bvddf");
    expect(ad.name).toBe("test");
});

test("AdRecord returns null from database for unexisting entry.", async () => {
    const ad = await AdRecord.findOne("gsgdgddgdg");
    expect(ad).toBeNull();
});

test("AdRecord returns data from database for one entry", async () => {
    const ad = await AdRecord.findAll();

    expect(ad).toBeDefined();
});

test("AdRecord returns all ads table entries", async () => {
    const ad = await AdRecord.findAll();
    expect(ad).toBeDefined();
})

test("AdRecord searches for specified query and returns array of results", async () => {
    const ad = await AdRecord.search("Mariańskie Porzecze");
    console.log(ad);
    expect(ad).toBeDefined();
});

test("AdRecord searches for specified query and return null if not found", async () => {
    const ad = await AdRecord.search("fffsfsfwweewwe");
    expect(ad).toBeNull();
});

test("New record is inserted to ads table and uuid is returned", async () => {
    const obj = {
        name: "Drewno z Radości",
        description: "Dupa",
        price: 43,
        url: "http://olx.pl/dfdgddre54bch5",
        lon: 52.1801894,
        lat: 21.1914945,

    }

    const record = await new AdRecord(obj).insertAd();
    console.log(record);
    expect(record).toBeDefined();

});
