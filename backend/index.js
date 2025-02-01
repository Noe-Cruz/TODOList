/**************************************
Nombre:      index.js
Autor:       Noé Cruz Alvarado
Proyecto:    TODO List
***************************************/
const app = require('./app')

/**Inicialización del servidor*/
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log('Service on port: ' + port)
})