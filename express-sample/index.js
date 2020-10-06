const express = require('express');

const server = express();
const PORT = 8080;

server
    .get('/', (req,res) => res.send('Hello!'))
    .get('/products', (req,res) => res.send('Esses são todos os produtos!'))
    .get('/products/:id', (req,res) => {
        const requiredId = req.params.id;

        const item = {
            id: 10,
            name: 'Dinosaur',
        }

        const thisIsTheProduct = item.id == requiredId;  
        return thisIsTheProduct ? res.send(`This is your product: ${JSON.stringify(item)}`) : res.send('Product not found');
    });

server.listen(PORT, () => console.log('Server running on port', PORT));