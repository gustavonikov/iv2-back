const express = require('express');

const server = express();
const PORT = 8080;

const products = require('./products');

server
    .get('/', (req, res) =>  res.send('Home'))
    .get('/products', (req, res) => res.send(products))
    .get('/products/:id', (req, res) => {
        const requiredId = req.params.id;
        let productFound = '';

        products.map((product) => { if (product.id == requiredId) { productFound = product } });
        
        return productFound === '' ? res.send('Product not found') : res.send(productFound);
    });

server.listen(PORT, () => console.log('Server running on Port', PORT));
