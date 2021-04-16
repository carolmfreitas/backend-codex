//importa o framework express e o pacote body-parser
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); //cria a aplicaçao chamando a função express

app.use(bodyParser.json()); //possibilita uso de arquivos JSON
app.use(bodyParser.urlencoded({extended: false})); 

require('../controllers/authController')(app); //referencia o controller de autenticação
require('../controllers/projectController')(app);

app.listen(3000); //indica a porta