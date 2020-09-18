const express = require('express');
const path = require('path');
require('dotenv').config();
const dbConnect = require('./dbConnect.js');
const indexRouter = require('./src/routes/index.js');

const app = express();
dbConnect();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', indexRouter);

app.listen(process.env.PORT || 8080, (err) => {
  if (err) throw err;
  console.log(`Server listening on port ${process.env.PORT}`);
});
