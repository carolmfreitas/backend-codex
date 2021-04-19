const chai = require("chai");
const server = require("../src/database");
const chaiHttp = require("chai-http");
const User = require('../src/models/user');
const MongoInMemory = require('mongodb-memory-server');
const databaseConfig = require('../src/database.js');
const response = require("express");
const {describe, before, it} = require("mocha");



function Database(databaseConfig) {
    return databaseConfig
}
//Assertion Style
const should = chai.should();
const assert = chai.assert;

chai.use(chaiHttp);


const user_nao_existente = {
    name: "maria",
    email: "maria@teste.com",
    password: "maria123"
}

const novo_user = {
    name: "carol",
    email: "carol@teste.com",
    senha: "carol123"
}

function post(url, data, callback) {
    chai.request(server)
        .post(url)
        .send(data)
        .end(callback);
}

let token = null;


describe('Testes de Autenticacao', async function () {
    before(async function () {
        mongoServer = new MongoInMemory.MongoMemoryServer();
        Database(await mongoServer.getUri())
    });



    describe('Login com usuario nao existente', () => {
        it('Deve apresentar erro', (done) => {
            chai.request(server)
                .post("/index/auth/login")
                .send(user_nao_existente)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.should.be.a('object');
                done();
                });
            });

        })

        describe('Cadastrar novo usuario', async () => {
            it('Deve cadastrar um novo usuario no sistema', (done) => {
                function callback(error, response) {
                    response.body.should.be.a('object');
                    response.should.have.status(201);
                    response.body.should.have.property('name');
                    response.body.should.have.property('email');
                    response.body.should.not.have.property('password');
                    done();
                }
        
                post("/index/auth/register", novo_user, callback);
            });
    
    /**
    describe('Cadastrar novo usuario', () => {
        it('Deve cadastrar um novo usuario', (done) => {
            chai.request(server)
                .post("index/auth/register")
                .send(novo_user)
                .end((err, response) => {
                    response.body.should.have.not.property('password');
                done();
                })
        })
    })
    */
        })

    });