const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/final-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = db.then(() => {
    console.log('Conectado com sucesso!')
})