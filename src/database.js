const mongoose = require('mongoose');
const app = require('./index')

mongoose.connect('mongodb+srv://dev:backend876@cluster0.yjokg.mongodb.net/rotinaDiaria?retryWrites=true&w=majority', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`iniciando na porta ${port}`);
});
