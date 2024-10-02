const mongoose = require('mongoose');
//acceder a las variables de entorno
require('dotenv').config({ path: 'variables.env' });

const conectarBD = async () => {
    try {
        //Conexión a MongoDB con Mongoose
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,// el nuevo analizador de URL de MongoDB
            useUnifiedTopology: true,//habilita el nuevo motor de conexión unificada de MongoDB
        })

        console.log('base de datos conectada');

    } catch (error) {
        console.log(error);
        process.exit(1); //detener la app
    }
}

module.exports = conectarBD