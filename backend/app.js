/**************************************
Nombre:      app.js
Autor:       Noé Cruz Alvarado
Proyecto:    TODO List
***************************************/
const express = require('express')
const cors = require('cors')
const taskRoutes = require('./src/routes/tasks.routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', taskRoutes)

app.use((req, res) => {
    res.status(404).json({error: 'Ruta no encontrada'})
})

module.exports = app