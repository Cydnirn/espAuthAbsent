import express from "express";
import http from "http";

import AppLoader from "./loader";

import env from "#utils/env";

const StartApp = () => {
    const app = express();
    AppLoader({ app });
    if (env.NODE_ENV === "development") {
        const server = http.createServer(app);
        server.listen(5128, () => {
            console.log(`server Run on port 5128`);
        });
    } else if (env.NODE_ENV === "production") {
        const server = http.createServer(app);
        server.listen(5129, () => {
            console.log("Server run on port 5129");
        });
    }
};

StartApp();
