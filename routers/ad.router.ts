import {NextFunction, Request, Response, Router} from "express";
import {AdRecord} from "../records/ad.record";


export const adRouter = Router()
    .get("/search/:name?", async (req: Request, res: Response, next: NextFunction) => {
        try {
            const markersList = await AdRecord.findAll(req.params.name ?? "");
            res.json(markersList);

        } catch (err) {
            next(err);
        }

    })
    .get("/:id", async (req, res, next) => {
        try {
            const ad = await AdRecord.findOne(req.params.id);
            res.json(ad);
        } catch (err) {
            next(err);
        }
    })
    .post("/", async (req, res, next) => {
        try {
            const ad = new AdRecord(req.body);
            await ad.insertAd();
            res.json(ad);
        } catch (err) {
            next(err);
        }
    })
