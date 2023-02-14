"use strict";
const express = require("express");
const router = express.Router();
const { ReadIdentityMySql } = require("../modules/authMod");
const mqtt = require('mqtt');

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
    console.log("MQTT client connected to broker");

    client.subscribe("esp/attendance", (error) =>{
        try {
            console.log("Subscribed to the attendance topic");
        } catch (error) {
            console.log(error);
        }
    });
});

client.on("message", async (topic, message) =>{
    if (topic === "esp/attendance"){
        let data = JSON.parse(message.toString());
        let espId = data.espId;
        let hexID = data.hexID;

        console.log("Received data from ESP with ID ", espId, " and data ", hexID);
        let statusCode = await ReadIdentityMySql(hexID);
        console.log(`StatusCode: ${statusCode}`);
        client.publish(`esp/${espId}/response`, JSON.stringify({statusCode}));
    }
});

router.route("/").get(async (req, res) => {
    res.send(200).json({ "message": "Content Loaded!" });
});

module.exports = router;