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

    createdAt: { //indica data que o registro foi criado
        type: Date,
        default: Date.now,
    },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = {Task}; //exporta a tarefa