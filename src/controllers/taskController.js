const express = require('express');
const authMiddleware = require('../middleware/auth');
const task = require('../models/task');

const router = express.Router(); //função usada para definir rotas

router.use(authMiddleware); //usuario só consegue acessar o controller por meio do token

router.get('/', async (req,res) => { //todas as tarefas
    try{
        const tasks = await Task.find().populate('tasks');

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
});

router.get('/:taskId', async (req,res) => { //requisição de uma tarefa
    try{
        const task = await Task.findById(req.params.projectId).populate('tasks');;
        res.send({ task });
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao carregar tarefa '});
    }
});

router.post('/', async (req,res) => { //criar tarefa
    try{
        const task = await Task.create( { ...req.body, user: req.userId });
        return res.send({ task });

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao criar nova tarefa '});
    }
});

router.put('/:taskId', async (req,res) => { //atualiza tarefa
    try{
        const task = await Task.findByIdAndUpdate( req.params.taskId, {
            title,
            description,
        }, { new: true });
        return res.send({ task });

    } catch (err) {
        return res.status(400).send({ error: 'Erro ao atualizar tarefa '});
    }
});

router.delete('/:taskId', async (req,res) => { //apaga tarefa
    try{
        await Task.findByIdAndRemove(req.params.projectId);
        res.send();
    } catch (err) {
        return res.status(400).send({ error: 'Erro ao apagar tarefa '});
    }
});



module.exports = router;