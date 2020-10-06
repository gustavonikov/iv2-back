const express = require('express');

const productRoutes = express.Router();

const db = require('../services/db');
const productModel = require('../model/ProductModel');

productRoutes
    .get('/', (req,res) => res.send('Home'))
    .get('/products/all', (req, res) => {
        productModel.find({})
            .then((response) => {
            res.send(response)
            })
            .catch((error) => res.send(error));
    });

productRoutes.post('/products/new-product', (req, res) => {

    if(req.body.name === '' || req.body.buyPrice === '' || req.body.sellPrice === '' || req.body.quantity === '') {
        res.status(400).send('<h2>Insert all product fields correctly</h2>');
        return;
    }

    try {
        const newProduct = new productModel({
            name: req.body.name,
            buyPrice: req.body.buyPrice,
            sellPrice: req.body.sellPrice,
            quantity: req.body.quantity,
        });

        newProduct.save();

        res.status(201).send('<h2>The product has been successfully registered</h2>');
    } 
    catch (error) {
        res.status(400).send(`<h2>An error occurred while registering the product:</h2> ${error}`);
    }
})

productRoutes.put('/products/edit/:id', (req, res) => {
    const idProduct = req.params.id;

    if (idProduct === '' || idProduct === null || idProduct === undefined) {
        res.status(500).send('<h2>The given id does not exist or is incorrect, please try again</h2>');
        return;
    }

    const newProduct = {
        name: req.body.name,
        buyPrice: req.body.buyPrice,
        sellPrice: req.body.sellPrice,
        quantity: req.body.quantity,
    };

    productModel.update({_id: idProduct}, newProduct)
        .then(() => res.send('<h2>Product successfully updated</>'))
        .catch((error) => res.status(400).send(`<h2>An error occurred while updating the product:</h2> ${error}`));
});

productRoutes.delete('/products/delete/:id', (req, res) => {
    const idProduct = req.params.id;

    productModel.deleteOne({_id: idProduct})
        .then(() => res.send('<h2>Product deleted successfully</h2>'))
        .catch((error) => res.send(`<h2>An error occurred while deleting the product:</h2> ${error}`));
});

module.exports = productRoutes;
