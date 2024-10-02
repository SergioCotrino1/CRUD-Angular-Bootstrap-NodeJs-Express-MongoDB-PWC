const Producto = require("../models/Producto");


//crear el producto
exports.crearProducto = async (req, res) => {

    try {

        let producto;
        //creamos nuestro producto
        producto = new Producto(req.body);

        await producto.save();
        res.send(producto);

    } catch (error) {
        console.log(error);
        res.status(500).send('No se pudo crear el producto');
    }
}

//obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {

        const productos = await Producto.find();
        res.json(productos);

    } catch (error) {
        console.log(error);
        res.status(500).send('No se pudieron obtener los productos');
    }
}

// actualizar productos
exports.actualizarProductos = async (req, res) => {
    try {

        const { nombre, categoria, cantidad, ubicacion, precio } = req.body;//extraemos los datos
        let producto = await Producto.findById(req.params.id);
        if (!producto) {
            res.status(404).json({ msg: 'no existe ese producto' })
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.cantidad = cantidad;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id }, producto, { new: true })
        res.json(producto)

    } catch (error) {
        console.log(error);
        res.status(500).send('No se pudo crear el producto');
    }
}

//bucar un producto en especifico por id
exports.obtenerUnProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if (!producto) {
            res.status(404).json({ msg: 'no existe ese producto' })
        }
        res.json(producto)

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error Sergio');
    }
}

//eliminar un producto en especifico por id
exports.eliminarProducto = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id);
        if (!producto) {
            res.status(404).json({ msg: 'no existe ese producto' })
        }
        await Producto.findByIdAndDelete(req.params.id);
        res.json({ msg: 'producto eliminado correctamente' })

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error Sergio');
    }
}



