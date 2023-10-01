"use strict";
const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { AuthDataFirebase } = require("../modules/authMod");

router.route("/").get(async (req, res) => {
    res.send(200).json({ "message": "Content Loaded!" });
}).post(async (req, res) => {
    let hexId = req.body.hexID;
    fs.readFile(path.join(__dirname, '/auth/identity.json'), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ "error": "Internal Server Error" });
        }
        try {
            let identityJson = JSON.parse(data);
            let i = 0;
            AuthDataFirebase(res, identityJson, i, hexId);
        } catch (err) {
            console.log(err);
            res.status(500).json({ "error": "Internal Server Error" });
        }
    });
});

module.exports = router;