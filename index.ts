import express, {json, Router} from "express";
import cors from "cors";
import rateLimit from "express-rate-limit"
import {handleError} from "./utils/error";
import "express-async-errors";
import {adRouter} from "./routers/ad.router";
import {config} from "./config/config";

const app = express();

app.use(cors({
    origin: config.corsOrgin,
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

const router = Router();

router.use("/ad", adRouter);
app.use("/api", router);

app.use(handleError);
app.listen(3001, "0.0.0.0", () => {
    console.log("Listening on port http://localhost:3001")
})
