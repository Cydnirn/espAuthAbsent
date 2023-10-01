import { Application, NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import fs from "fs";

import env from "#utils/env";
import apiRoutes from "#routes/api";

const corsOption: CorsOptions = {
    methods: ["GET", "POST", "PUT", "PATCH"],
    origin: env.ESP_ORIGIN,
    credentials: true,
    maxAge: 300,
};

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50 });

export default function expressLoader({ app }: { app: Application }) {
    return (async (app: Application) => {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(cors(corsOption));
        app.use(
            helmet({
                contentSecurityPolicy: false,
            })
        );
        app.use(limiter);
        app.enable("trust proxy");
        app.use("/api", apiRoutes);

        app.use(() => {});
        
        app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            if (!fs.existsSync("/log")) {
                fs.mkdirSync("/log", { recursive: true });
            }
            if (res.headersSent) {
                return next(err);
            }
            res.status(500).json("Hello");
        });
        return app;
    })(app);
}
