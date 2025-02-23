const admin = require('firebase-admin');
const {getFirestore} = require('firebase-admin/firestore');
require('dotenv').config();


// Initialize Firebase Admin
const serviceAccount = require('./../../service_account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


const db = getFirestore();

module.exports = {db};