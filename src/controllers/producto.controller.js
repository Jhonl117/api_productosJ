
// Importacion de Modelos

const productoModelo = require('../models/producto.models');
const fs = require('fs');

// Funcion API GET

const productoGet = async (req, res) => {
    try {
      const { id } = req.params;
  
      const producto = (id === undefined)
        ? await productoModelo.find()
        : await productoModelo.findById(id);
  
      if (producto) {
        res.json({ producto });
      } else {
        res.status(404).json({ msg: 'Producto no encontrado' });
      }
  
    } catch (error) {
      res.status(500).json({ msg: 'Error interno del servidor' });
    }
  }

// Funcion API POST

const productoPost = async ( req, res ) => {

    const { codigo, nombreProducto, stock, precioCOP, precioUSD, descripcion} = req.body;
    
    try{
        const producto = new productoModelo( {
            codigo: codigo,
            nombreProducto: nombreProducto,
            fotoProducto: '/uploads/'+req.file.filename,
            stock: stock,
            precioCOP: precioCOP,
            precioUSD: precioUSD,
            descripcion: descripcion
        });

        await producto.save();
        res.json({ msg: 'Registro Realizado con Exito!' });

    }catch(error){
        
        res.json({ msg: 'Error: '+ error });
    }

}

// Funcion API PUT

const productoPut = async (req, res) => {
    let messagge = 'Modificacion Realizada con Exito!';
    const { _id, codigo, nombreProducto, stock, precioCOP, precioUSD, descripcion } = req.body;
  
    try {
      let updateFields = {
        codigo: codigo,
        nombreProducto: nombreProducto,
        stock: stock,
        precioCOP: precioCOP,
        precioUSD: precioUSD,
        descripcion: descripcion,
      };
  
      // Verifica si se proporcionó una nueva imagen antes de agregarla a los campos de actualización
      if (req.file) {
        updateFields.fotoProducto = '/uploads/' + req.file.filename;
      }
  
      // Actualiza el producto
      await productoModelo.updateMany({ _id: _id }, { $set: updateFields });
  
      // No es necesario eliminar la imagen aquí
  
    } catch (error) {
      messagge = 'error';
    }
  
    res.json({ msg: messagge });
  }
  
// Funcion API DELETE

const eliminarImagen = async(id) => {
    const producto = await productoModelo.findById(id);
    const img = producto.fotoProducto;
    fs.unlinkSync('./public/'+img);
}

const productoDelete = async ( req, res ) => {

    let messagge = 'Eliminacion Realizada con Exito'
    const {_id} = req.body;

    try{
        await eliminarImagen(_id)
        await productoModelo.deleteOne({ _id: _id});
        
    }catch( error ){
        messagge = error;
    }

    res.json({ msg: messagge });
}

module.exports = {
    productoGet,
    productoPost,
    productoPut,
    productoDelete
}