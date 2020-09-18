const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const FormData = require('form-data');
const Category = require('../models/category.js');
const Brand = require('../models/brand.js');

const router = express.Router();

router.get('/', async (req, res) => {
  const brands = await Brand.find();
  res.render('index', { brands });
});

router.post('/models', async (req, res) => {
  const body = new FormData();
  body.append('key', process.env.API_KEY);
  body.append('id', '91491');
  body.append('brand', req.body.id);
  const response = await fetch('https://market-scanner.ru/api/category', {
    method: 'POST',
    body,
    redirect: 'follow',
  });
  response.json().then((data) => {
    res.json(data);
  });
});

router.post('/models/:id', async (req, res) => {
  const infoUrl = 'https://market-scanner.ru/api/specs';
  const photoUrl = 'https://market-scanner.ru/api/photos';
  const priceUrl = 'https://market-scanner.ru/api/price';

  async function getData(url) {
    const body = new FormData();
    body.append('key', process.env.API_KEY);
    body.append('id', req.params.id);
    const data = await fetch(url, {
      method: 'POST',
      body,
      redirect: 'follow',
    });
    return data.json();
  }
  res.json({
    items: await getData(infoUrl),
    photos: await getData(photoUrl),
    price: await getData(priceUrl),
  });
  res.end();
});
module.exports = router;
