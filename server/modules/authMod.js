const { getSQLDate, getDateOnly, eligibleTime } = require("../modules/sqlDate");
const SQLQuery = require("../model/mysqlQuery");
const fs = require('fs');
const path = require('path');

async function espInsertMysql(userid, username, usernum, userclass, usertype, absentDate, dateVerify) {
    let eligible = eligibleTime();
    if (!eligible) {
        console.log("Excedded time limit");
        return "405"
    }
    else {
        let value = await SQLQuery.insertAbsent(userid, username, usernum, userclass, usertype, absentDate, 'Hadir', dateVerify, process.env.MYSQL_ABSENT_TABLE);
        if (!value) {
            console.log("Not Allowed");
            return "405";
        }
        else {
            console.log("Success");
            return "200";
        }
    }
}

async function espInsertFirebase(res, userid, username, usernum, userclass, usertype, absentDate, dateVerify) {

}

async function AuthDataMysql(data, iteration, hexid) {
    console.log("Inserting data...");
    try {
        let promises = [];
        data.forEach(async (entry) => {
            if (entry.hexID == hexid) {
                let time = getSQLDate();
                let date = getDateOnly();
                console.log(getDateOnly());
                console.log(`Name: ${entry.name}`);
                console.log(`Present at: ${time}`);
                iteration++;
                promises.push(espInsertMysql(hexid, entry.name, entry.number, entry.division, entry.type, time, date));
            }
        });
        if (!iteration) {
            console.log("Data not found");
            console.log(hexid);
            return Promise.resolve("400");
        } else {
            let results = await Promise.all(promises);
            return Promise.resolve(results);
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}


async function AuthDataFirebase(res, data, iteration, hexid) {
    try {
        data.forEach(async (entry) => {
            if (entry.hexID == hexid) {
                let time = getSQLDate();
                let date = getDateOnly();
                console.log(`Name: ${entry.name}`);
                console.log(`Present at: ${time}`);
                iteration++;
                await espInsertFirebase(res, hexid, entry.name, entry.number, entry.division, entry.type, time, date);
            }
        });
        if (!iteration) {
            res.status(404).json({ "error": "Identity not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ "error": "Internal Server Error" });
    }
}

async function ReadIdentityMySql(hexID) {
    return new Promise(async (resolve, reject) => {
        fs.readFile(path.join(__dirname, "../auth/identity.json"), "utf-8", async (err, data) => {
            try {
                let identityJson = JSON.parse(data);
                let i = 0;
                let res = await AuthDataMysql(identityJson, i, hexID);
                resolve(res);   
            } catch (error) {
                reject(error)
            }
        });
    });
}

module.exports = {
    ReadIdentityMySql,
    AuthDataFirebase
}