const mongoose = require('mongoose');
const fetch = require('node-fetch');
const FormData = require('form-data');
const dbConnect = require('./dbConnect.js');
const Category = require('./src/models/category.js');
const Brand = require('./src/models/brand.js');

dbConnect();

async function seedCategory() {
  const body = new FormData();
  body.append('key', process.env.API_KEY);

  const response = await fetch('https://market-scanner.ru/api/allcategories', {
    method: 'POST',
    body,
    redirect: 'follow',
  });

  response.json().then((data) => {
    try {
      data.forEach(async (category) => {
        await Category.create(category);
      });
    } catch (err) {
      console.log(err);
    }
  });
}

async function seedBrands() {
  const body = new FormData();
  body.append('key', process.env.API_KEY);
  body.append('id', '91491');

  const response = await fetch('https://market-scanner.ru/api/categorybrands', {
    method: 'POST',
    body,
    redirect: 'follow',
  });

  response.json().then((data) => {
    try {
      data.forEach(async (category) => {
        await Brand.create(category);
      });
    } catch (err) {
      console.log(err);
    }
  });
}


// seedCategory();
seedBrands();
