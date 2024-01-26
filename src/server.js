
// Dependencias del Servidor

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');


// Conexion Base de Datos

const { dbConnection } = require('./database/config');


// Clase Servidor

class Server {

    constructor(){
        
        this.app = express(),
        this.port = process.env.PORT,
        this.authPath = '/ruta/auth',
        this.productosPath = '/ruta/productos',
        this.conectarDB(),
        this.middlewares(),
        this.routes()
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor en el puerto: ', this.port)
        })
    }

    routes(){
        this.app.use(this.productosPath, require('./routes/producto.route'))
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.static('public'))
        this.app.use(bodyParser.urlencoded({ extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }

    async conectarDB(){
        await dbConnection()
    }

}

module.exports = Server