const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/', require('./routes/index.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('/login', require('./routes/auth.routes'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});