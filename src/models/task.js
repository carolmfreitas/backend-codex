const mongoose = require('mongoose'); //importa o mongoose

const TaskSchema = new mongoose.Schema({ //define campos da tarefa
    title: {
        type: String, 
        require: true, //obrigatorio
    },

    description: { //descrição da tarefa
        type: String,
        require: true,
    },

    priority: {
        type: String,
        require: true,
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = {Task}; //exporta a tarefa