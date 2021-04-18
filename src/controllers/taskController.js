const express = require('express');
const authMiddleware = require('../middleware/auth');
const task = require('../models/task');
const user = require('../models/user');

const router = express.Router(); //função usada para definir rotas

router.use(authMiddleware.authentication); //usuario só consegue acessar o controller por meio do token

exports.allTasks = async (req,res) => { //todas as tarefas
    try{
        const tasks = await Task.find({ userId: req.id }).populate('tasks');

        const prioridadeAlta = tasks.Task.filter(elem => {
            return elem.priority.toLowerase() == 'alta';
        });
        const prioridadeBaixa = tasks.Task.filter(elem => {
            return elem.priority.toLowerase() == 'baixa';
        });

        const tasksFiltradas = prioridadeAlta.concat(prioridadeBaixa);
        return res.send({ tasksFiltradas });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao carregar tarefas '});
    }
};

exports.addTask = async (req,res) => { //criar tarefa
    try{
        const { title, description, priority } = req.body;
        const { userId } = req.params;

        if(!userId){
            res.status(400).send({ error: 'Sem Id do usuário' });
        }

        const newTask = await Task.create(req.body);
        newTask.userId = req.id;
        return res.send({ task });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao criar nova tarefa '});
    }
};

exports.updateTask = async (req,res) => { //atualiza tarefa
    try{
        const { title, description, priority } = req.body;
        
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
