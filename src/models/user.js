const mongoose = require('mongoose'); //importa o mongoose
const bcrypt = require('bcryptjs'); //importa o bcrypt 

const UserSchema = new mongoose.Schema({ //define campos do usuario
    name: {
        type: String, 
        require: true, //obrigatorio
    },

    email: {
        type: String,
        unique: true, //unica
        required: true, //obrigatoria
        lowercase: true, //deve ser convertida para caixa baixa
    },

    password: {
        type: String,
        required: true, //obrigatoria
        select: false, //para que a irformação da senha não apareça no array de usuarios
    },

    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
});

UserSchema.pre('save', async function(next) { //antes de salvar o usuario a senha vai ser encriptada
    const hash = await bcrypt.hash(this.password, 10); 
    this.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = {User}; //exporta o usuario