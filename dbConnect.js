const mongoose = require('mongoose');
require('dotenv').config();

const dbName = process.env.DB_NAME;
const dbPath = process.env.DB_PATH;

const dbConnect = () => {
  mongoose.connect(`${dbPath}${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log(`Connection success.`);
  });
};

module.exports = dbConnect;
