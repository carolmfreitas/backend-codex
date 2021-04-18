const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = require('../models/user');
const Token = require('../models/token');

const router = express.Router(); //função usada para definir rotas

function generateToken(params = {}) {
    return jwt.sign( params, authConfig.secret, { //gera o token
        expiresIn: 86400, //expira em um dia
    }); 
}

exports.register = async(req,res) => { //rota de cadastro
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) { //caso o email ja esteja sendo usando
            return res.status(400).send({ error: "Usuário já existente" })
        }

        const user = await User.create(req.body); //cria um novo usuario quando a rota for chamada
        user.password = undefined;

        return res.send({ 
            user,
            token: generateToken({ id: user.id }), //repassa o token para que seja possivel logar automaticamente
        });

    } catch(err) { //caso ocorra algum erro
        return res.status(400).send({ error: 'Falha no cadastro' });
    }
};

exports.login = async (req,res) => { //rota de autenticação
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email }).select('+password'); //busca usuário pelo email e adiciona o campo senha para que possa ser comparada

        if(!user){ //caso o usuário não tenha sido encontrado
            return res.status(400).send({ error: 'usuário não encontrado' });
        }

        if(!await bcrypt.compare(password, user.password)){ //compara a senha digitada com a senha do usuario
            return res.status(400).send({ error: 'senha inválida' }); //caso as senhas sejam diferentes
        }

        user.password = undefined; //remove o password

        res.send({ 
            user,
            token: generateToken({ id: user.id }),
        });

    } catch(err) { //caso ocorra algum erro
        return res.status(400);
    }

};

exports.logout = async (req,res) => {
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(400).send({ error: 'não há token' });
        }
        const parts = token.split(' ');
        if(!parts.length == 2){ //verifica se o token tem duas partes(padrão)
            return res.status(401).send({ error: 'Token error' });
        }
        await Token.create({ token });
        return res.status(200).send({ message: 'logout realizado' });
    }
    catch(err){
        return res.status(400);
    }
};