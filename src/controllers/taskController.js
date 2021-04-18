const express = require('express');
const authMiddleware = require('../middleware/auth');
const Task = require('../models/task');
const user = require('../models/user');

const router = express.Router(); //função usada para definir rotas

router.use(authMiddleware.authentication); //usuario só consegue acessar o controller por meio do token

exports.allTasks = async (req,res) => { //todas as tarefas
    const { priority, userId } = req.query;
    let body = { user: userId }
    let tasks;
    try{
        if(priority && priority === 'true') {
            tasks = await Task.find(body).sort({ priority: "asc" }).exec();
        }
        else{
            tasks = await Task.find(body);
        }
        return res.status(200).send({ tasks });

    } catch (err) {
        return res.status(400).send({ err : err.message });
    }
};

exports.addTask = async (req,res) => { //criar tarefa
    const { title, description, priority } = req.body;
    const { userId } = req.query;
    try{
        if(!userId){
            res.status(400).send({ error: 'Sem Id do usuário' });
        }

        const newTask = await Task.create(req.body);
        return res.status(200).send({ newTask });

    } catch (err) {
        return res.status(400).send({ err : err.message });
    }
};

exports.updateTask = async (req,res) => { //atualiza tarefa
    const { title, description, priority } = req.body;
    try{
        const taskAtualizada = await Task.findByIdAndUpdate( req.params.taskId, req.body, { new: true });
        return res.send({ taskAtualizada });

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao atualizar tarefa '});
    }
};

exports.removeTask = async (req,res) => { //apaga tarefa
    try{
        await Task.findByIdAndRemove(req.params.taskId);
        return res.send({ message: 'Tarefa deletada!'});
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao deletar tarefa '});
    }
};
