const express = require('express');

const User = require('../models/user');

const router = express.Router(); //função usada para definir rotas

router.post('/register', async(req,res) => { //rota de cadastro

    const { email } = req.body;

    try {
        if (await User.findOne({ email })) { //caso o email ja esteja sendo usando
            return res.status(400).send({ error: "Usuário já existente" })
        }

        const user = await User.create(req.body); //cria um novo usuario quando a rota for chamada
        user.password = undefined;

        return res.send({ user });

    } catch(err) { //caso ocorra algum erro
        return res.status(400).send({ error: 'Falha no cadastro' });
    }
});

module.exports = app => app.use('/auth', router); //repassa a rota /auth para o app