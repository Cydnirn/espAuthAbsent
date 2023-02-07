"use strict";
let pool = require("./mysqlConnect");

async function verifyEmptyDate(userid, absentDate, tables){
    try {
        const getDate = `SELECT userId, date, status FROM ${tables} WHERE userId = ? and date LIKE ?;`;
        const value = [userid, absentDate + "%"];
        const absentVal = await pool.query(getDate, value);
        if(!absentVal.length){
            return true;
        }
        else{
            return false;
        }
    } catch (err) {
        return err;
    }
}

async function verifyKaichou(absentDate, userclass, tables){
    try {
        const getKaichou = `SELECT userId, date, type, class FROM ${tables} WHERE type = 'kaichou' AND class = ? AND date LIKE ?;`;
        const value = [userclass, absentDate + "%"];
        const kaichouVal = await pool.query(getKaichou, value);
        if(!kaichouVal.length){
            return false;
        }
        else{
            return true;
        }   
    } catch (err) {
        return err;
    }
}

async function insertAbsent(userid, username, usernum, userclass, usertype, absentDate, status, dateVerify, tables){
    try {
        const insertDate = `INSERT INTO ${tables}(userId, name, absentNum, class, type, date, status) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const value = [userid, username, usernum, userclass, usertype, absentDate, status];
        let verifyVal = await verifyEmptyDate(userid, dateVerify, tables);
        let kaichouStats;
        if(usertype == "member"){
            kaichouStats = await verifyKaichou(dateVerify, userclass, tables);
        }
        if (!verifyVal){
            return false;
        }
        else if(!kaichouStats){
            return false;
        }
        else{
            const result = await pool.query(insertDate, value);
            return result;
        }
    } catch (err) {
        return err
    }
}

module.exports = {
    verifyEmptyDate,
    verifyKaichou,
    insertAbsent
}