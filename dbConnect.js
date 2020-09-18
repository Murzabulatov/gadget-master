const mongoose = require('mongoose');
require('dotenv').config();

const dbPath = process.env.DB_PATH;

const dbConnect = () => {
  mongoose.connect(`${dbPath}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log(`Connection success.`);
  });
};

module.exports = dbConnect;
