//importa o framework express e o pacote body-parser
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express(); //cria a aplicaçao chamando a função express
const authRoute = require('./routes/auth');
const taskRoute = require('./routes/task');
const authMiddleware = require('./middleware/auth');


mongoose.connect('mongodb+srv://dev:backend876@cluster0.yjokg.mongodb.net/rotinaDiaria?retryWrites=true&w=majority', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

app.use(cors());
app.use(bodyParser.json()); //possibilita uso de arquivos JSON
app.use(bodyParser.urlencoded({extended: false})); 
app.use(morgan('dev'));

app.use('/auth', authRoute);
app.use(authMiddleware.authentication); 
app.use('/tasks',taskRoute);

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`iniciando na porta ${port}`);
});

module.exports = app;