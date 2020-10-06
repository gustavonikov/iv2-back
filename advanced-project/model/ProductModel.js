const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name: String,
    buyPrice: String,
    sellPrice: String,
    quantity: Number,
});

const modelProduct = mongoose.model('Product', product);

module.exports = modelProduct;
