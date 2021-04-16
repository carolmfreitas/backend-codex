const express = require('express');
const auth = require('../middleware/auth');
const authMiddleware = require('../middleware/auth');

const router = express.Router(); //função usada para definir rotas

router.use(authMiddleware);

router.get('/', (req,res) => {
    res.send({ ok: true });
});

module.exports = app => app.use('/projects', router);