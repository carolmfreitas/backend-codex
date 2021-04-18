const jwt = require('jsonwebtoken');
const Token = require('../models/token');

exports.authentication = (req, res, next) => { //intercepta o usuario
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).send({ error: 'O token não foi informado' });
    }

    const parts = authHeader.split(' ');

    if(!parts.length == 2){ //verifica se o token tem duas partes(padrão)
        return res.status(401).send({ error: 'Token error' });
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){ //verifica se o token inicia com "Bearer"
        return res.status(401).send({ error: 'Token malformatted '});
    }

    jwt.verify(token, Token.secret, (err,decoded) => { //verifica se o token corresponde ao usuario
        if(err){
            return res.status(401).send({ error: 'Token inválido' });
        }
        req.userId = decoded.id;
        return next();
    });
};