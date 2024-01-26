
// Dependencia Mongoose

const { Scheme, model, default: mongoose } = require('mongoose');

const productoSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: [true, 'El Campo Codigo es Obligatorio']
        },
        nombreProducto: {
            type: String,
            required: [true, 'El Campo Nombre Producto es Obligatorio']
        },
        fotoProducto: {
            type: String,
            required: [true, 'El Campo Foto Producto es Obligatorio']
        },
        stock: {
            type: Number,
            required: [true, 'El Campo Stock es Obligatorio']
        },
        precioCOP: {
            type: Number,
            required: [true, 'El Campo Precio Colombiano es Obligatorio']
        },
        precioUSD: {
            type: Number,
            required: [true, 'El Campo Precio Dolares es Obligatorio']
        },
        descripcion: {
            type: String,
            required: [true, 'El Campo Descripcion es Obligatorio']
        },
        
    },
    {
        versionKey: false
    } 

)

// Exportacion

module.exports = model('producto', productoSchema)