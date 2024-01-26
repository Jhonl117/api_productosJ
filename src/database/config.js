
// Dependencia Mongoose 

const mongoose = require('mongoose');

// Funcion Conexion

const dbConnection = async () => {

    try{
        await mongoose.connect( process.env.MONGO_URL);
        console.log('Conexion Exitosa - Base de Datos');

    }catch(error){
        console.log('Error Conexion - Base de Datos', error);
    }
}

module.exports = { dbConnection };