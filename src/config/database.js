const mongoose = require('mongoose'); //importa mongoose
mongoose.Promise = global.Promise; 

mongoose.connect('mongodb://localhost/tarefas', { //conecta ao banco de dados "tarefas"
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

module.exports = mongoose;