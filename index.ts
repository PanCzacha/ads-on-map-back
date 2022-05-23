import express, {json, NextFunction, Request, Response} from "express";
import cors from "cors";
import {handleError} from "./utils/error";
import "express-async-errors";
import {AdRecord} from "./records/ad.record";
import {MarkupsList} from "./types";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(json());

app.use(handleError);

app.get("/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const markersList = await AdRecord.findAll();
        res.json(
            {
                markersList,
            } as MarkupsList);

    } catch (err) {
        next(err);
    }

})

app.listen(3001, "0.0.0.0", () => {
    console.log("Listening on port http://localhost:3001")
})
