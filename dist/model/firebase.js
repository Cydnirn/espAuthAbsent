/*
    This file only initialize Firebase FireStore for Server, edit configuration in .env
 */
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

//Put Keys here
const serviceAccount = require(`../keys/${process.env.FIREBASE_KEYS}`);

const firebaseConf = {
    apiKey: process.env.FIREBASE_API,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    credential: cert(serviceAccount)
};

const fireApp = initializeApp(firebaseConf);

const db = getFirestore(fireApp);

module.exports = db;