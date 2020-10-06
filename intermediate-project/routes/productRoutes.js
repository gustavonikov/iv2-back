const express = require('express');
const fs = require('fs');

const productRoutes = express.Router();

const data = fs.readFileSync('./services/db.json');
const jsonProducts = JSON.parse(data);

productRoutes
    .get('/', (req,res) => res.send('Home'))
    .get('/products', (req, res) => res.send(jsonProducts))
    .get('/products/:id', (req, res) => {
        const productId = req.params.id;
        let requiredProduct = '';

        jsonProducts.products.map((index) => {
            if (index.id == productId) {
                requiredProduct = index;
            }
        })

        return requiredProduct != '' ? res.send(requiredProduct) : res.send('Product not found');
    });

productRoutes.post('/products/new-product', (req, res) => {
    const bodyRequest = req.body;

    jsonProducts.products.push(bodyRequest);

    fs.writeFileSync('./services/db.json', JSON.stringify(jsonProducts));

    return res.send('Product added successfully!');
});

module.exports = productRoutes;
