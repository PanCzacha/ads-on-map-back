import {AdRecord} from "../records/ad.record";

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
    const ad = await AdRecord.findOne("abc45334bvddf");

    expect(ad).toBeDefined();
    expect(ad.id).toBe("abc45334bvddf");
    expect(ad.name).toBe("test");
});
