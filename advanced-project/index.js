const express = require('express');

const server = express();
const PORT = 8080;

const bodyParser = require('body-parser');
server
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))

const productRoutes = require('./routes/productRoutes');

server.use(productRoutes);

server.listen(PORT, () => console.log('Server running on PORT', PORT));
