const { getSQLDate, getDateOnly } = require("../modules/sqlDate");
const SQLQuery = require("../model/mysqlQuery");
const FirebaseQuery = require("../model/firebaseQuery");

async function espInsertMysql(res, userid, username, usernum, userclass, usertype, absentDate, dateVerify) {
    let value = await SQLQuery.insertAbsent(userid, username, usernum, userclass, usertype, absentDate, 'Hadir', dateVerify, process.env.MYSQL_ABSENT_TABLE);
    if (!value) {
        console.log("Not Allowed");
        res.status(405);
    }
    else {
        console.log("Success");
        res.status(200);
    }
}

async function espInsertFirebase(res, userid, username, usernum, userclass, usertype, absentDate, dateVerify) {
    
}

async function AuthDataMysql(res, data, iteration, hexid) {
    console.log("Inserting data...");
    try {
        data.forEach(async (entry) => {
            if (entry.hexID == hexid) {
                let time = getSQLDate();
                let date = getDateOnly();
                console.log(`Name: ${entry.name}`);
                console.log(`Present at: ${time}`);
                iteration++;
                await espInsertMysql(res, hexid, entry.name, entry.number, entry.division, entry.type, time, date);
            }
        });
        if (!iteration) {
            console.log("Data not found");
            console.log(hexid);
            res.status(404).json({ "error": "Identity not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ "error": "Internal Server Error" });
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

module.exports = {
    AuthDataMysql,
    AuthDataFirebase
}