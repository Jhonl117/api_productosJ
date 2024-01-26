
// Dependencia Express - Router

const multer = require('multer');
const { Router } = require('express')
const route = Router()

// Configuracion Storage

const saveImagen = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        if( file !== null ){
            const ext = file.originalname.split('.').pop()
            cb(null, Date.now()+'.'+ext)
        }
    }
})

const subirImagen = multer({storage: saveImagen})



// Importacion Metodos Controlador

const { productoGet, productoPost, productoDelete, productoPut} =  require('../controllers/producto.controller');

route.get('/:id', productoGet)
route.get('/', productoGet);
route.post('/', subirImagen.single('fotoProducto'), productoPost);
route.put('/', subirImagen.single('fotoProducto'), productoPut);
route.delete('/', productoDelete);

// Exportacion

module.exports = route;