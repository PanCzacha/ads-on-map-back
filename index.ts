import express, {json, NextFunction, Request, Response} from "express";
import cors from "cors";
import rateLimit from "express-rate-limit"
import {handleError} from "./utils/error";
import "express-async-errors";
import {AdRecord} from "./records/ad.record";
import {MarkupsList} from "./types";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));
app.use(handleError);

app.get("/list", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const markersList = await AdRecord.findAll("");
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
