const mongoose = require('mongoose'); //importa mongoose

mongoose.connect('mongodb://localhost/tarefas', { useMongoClient: true }); //conecta ao banco de dados "tarefas"
mongoose.Promise = global.Promise; 

module.exports = mongoose;