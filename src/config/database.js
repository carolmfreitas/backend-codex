const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dev:backend876@cluster0.yjokg.mongodb.net/rotinaDiaria?retryWrites=true&w=majority', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});