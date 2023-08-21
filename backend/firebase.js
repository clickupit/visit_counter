const admin = require('firebase-admin');

const serviceAccount = require('./db-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://synnery-test-ad626-default-rtdb.asia-southeast1.firebasedatabase.app/',
});

const db = admin.database();
const visitorLogsRef = db.ref('visitorLogs');

module.exports = { db, visitorLogsRef };
