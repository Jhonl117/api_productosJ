
// Dependencia de Dotenv

require('dotenv').config();
const Server = require('./server');

// Intancia de la Clase Server

const servidor = new Server();

// Servidor activado

servidor.listen();