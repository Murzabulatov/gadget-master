const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  brand_id: String,
  name: String,
  logo: String,
  models_quantity: String,
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
