const mongoose = require('mongoose'); //importa o mongoose

const TaskSchema = new mongoose.Schema({ //define campos da tarefa
    title: {
        type: String, 
        required: true, //obrigatorio
    },

    description: { //descrição da tarefa
        type: String,
        required: true,
    },

    priority: {
        type: String,
        required: true,
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },

});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task; //exporta a tarefa