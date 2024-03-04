
// Dependencia Express - Router

const multer = require('multer');
const { Router } = require('express')
const route = Router()

// Configuracion Storage

const saveImagen = multer.diskStorage({
    destination: (req, file, cb) => {
      const destinationPath = path.join(__dirname, 'public', 'uploads');
      console.log('Destination Path:', destinationPath);
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      const fileName = Date.now() + '.' + ext;
      console.log('Nombre del Archivo:', fileName);
      cb(null, fileName);
    },
  });
  

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