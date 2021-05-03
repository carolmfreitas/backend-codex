const express = require('express');
const authMiddleware = require('../middleware/auth');
const Task = require('../models/task');
const user = require('../models/user');

const router = express.Router(); //função usada para definir rotas

router.use(authMiddleware.authentication); //usuario só consegue acessar o controller por meio do token

exports.allTasks = async (req,res) => { //todas as tarefas
    try {
        const {priority} = req.query;
        let body = { 
            user: req.userId.id,
        }
        console.log(body)
        let tasks;

        if(priority && priority === 'true') {
            tasks = await Task.find(body).sort({ priority: "asc"}).exec();
        } else {
            tasks = await Task.find(body);
        }
        
        res.status(200).json({
            status: 'sucess',
            data: {
                tasks
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.findById = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOne({_id : id})

    return res.send({'task': task})
}

exports.addTask = async (req,res) => { //criar tarefa
    const { title, description, priority } = req.body;
    console.log(req.query)
    const userId = req.params.id;
    try{
        if(!userId){
            res.status(400).send({ error: 'Sem Id do usuário' });
        }

        const newTask = await Task.create({...req.body, user: userId });
        return res.status(200).send({ newTask });

    } catch (err) {
        return res.status(400).send({ err : err.message });
    }
};

exports.updateTask = async (req,res) => { //atualiza tarefa
    try{
        const id = req.params.id
        const userId = req.body.userId;
        console.log('userId', userId)
        const task = await Task.findOne({user: userId, _id: req.params.id});

        console.log('id', id)
        console.log('task', task)
        if(!task) {
            res.status(400).json({err : err.message});
        }

        const updateTask = await Task.findByIdAndUpdate(req.params.id,
        req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                task: updateTask
            }
        });

    } catch (err) {
        return res.status(400).send({ err: err.message });
    }
};

exports.removeTask = async (req,res) => { //apaga tarefa
    const { id } = req.params;
    try{
        await Task.findByIdAndRemove(id);
        return res.send({ message: 'Tarefa deletada!'});
    } catch (err) {
        return res.status(400).send({ err: err.message });
    }
};


//so pra ver se agr sobe p o heroku