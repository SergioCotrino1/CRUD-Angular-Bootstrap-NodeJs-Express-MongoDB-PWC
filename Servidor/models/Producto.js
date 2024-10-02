const mongoose = require('mongoose');

//esquema de la BD
const ProductoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    ubicacion: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()//valor por defecto no por parametro
    }

});

module.exports = mongoose.model('Producto', ProductoSchema);//se pueda utilizarl el esquema con el nombre de producto en cualquier otro lado