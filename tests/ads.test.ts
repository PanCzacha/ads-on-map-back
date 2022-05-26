import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";

afterAll(async () =>  {
    pool.end();
})

test("AdRecord.findOne returns data from database for one entry", async () => {
    const ad = await AdRecord.findOne("117608e2-65cf-483d-ae0d-a6b731932041");

    expect(ad).toBeDefined();
    expect(ad.id).toBe("117608e2-65cf-483d-ae0d-a6b731932041");
    expect(ad.name).toBe("Mariańskie Porzecze");
});

test("AdRecord.findOne returns null from database for unexisting entry.", async () => {
    const ad = await AdRecord.findOne("gsgdgddgdg");
    expect(ad).toBeNull();
});


test("AdRecord.findAll returns all ads table entries", async () => {
    const ads = await AdRecord.findAll("");
    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
})

test("AdRecord.findAll searches for specified query and return empty array if not found", async () => {
    const ad = await AdRecord.findAll("fffsfsfwweewwe");
    expect(ad).toEqual([]);
});

test("AdRecord.findAll searches for specified query and returns array of results", async () => {
    const ad = await AdRecord.findAll("Mariańskie Porzecze");
    expect(ad).not.toEqual([]);
    expect(ad[0].id).toBeDefined();
});

test("AdRecord.findAll returns only id, lat and lon properties", async () => {
    const ad = await AdRecord.findAll("Mariańskie Porzecze");
    expect(ad[0].id).toBeDefined();
    expect(ad[0].lat).toBeDefined();
    expect(ad[0].lon).toBeDefined();
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
