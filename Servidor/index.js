const express = require('express')
const conectarBD = require('./config/db')
const cors = require('cors')

//creamos el servidor
const app = express()

//conectamos con la BD
conectarBD();
app.use(cors()); //permitir que tu servidor acepte solicitudes desde otros dominios 
app.use(express.json()); //procesesamos los datos en formato JSON
app.use('/api/productos', require('./routes/producto'))// cuando el usuario entre a productos lo redireccione
//para saber que esta corriendo el server
app.listen(4000, () => { console.log('el servidor esta corriendo bien') })
