"use strict";
const http = require("http");
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

//Endpoint export
const rootRoutes = require("./routes/rootDefault");

const app = express();

const server = http.createServer(app);
server.listen(process.env.SERVER_PORT, () => {
    let dateTime = new Date();
    console.log(`Server running on port ${process.env.SERVER_PORT}, started at: ${dateTime}`);
})

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json());
app.use('/script', express.static(path.join(__dirname,"/script")));

let corsOption = {
    origin: process.env.ESP_ORIGIN,
    methods: 'GET, PUT, PATCH, POST, UPDATE, DELETE',
    exposedHeaders: ['x-auth-token']
}

app.use(cors(corsOption));

const limiter = rateLimit({
    windowMS: 15 * 60 * 1000,
    max: 100
})

app.use(helmet({
    contenSecurityPolicy: false
}))

app.use(limiter);
app.enable('trust proxy');

app.use("/", rootRoutes);