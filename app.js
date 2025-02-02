/**************************************
Nombre:      app.js
Autor:       Noé Cruz Alvarado
Proyecto:    TODO List
***************************************/
const express = require('express')
const cors = require('cors')
const path = require('path')
const taskRoutes = require('./src/routes/tasks.routes')

const app = express()

app.use(cors())
app.use(express.json())

//Rutas para la API (Backend)
app.use('/api', taskRoutes)

//Archivos estaticos y ruta principal (Frontend)
app.use(express.static(path.join(__dirname, 'public')))
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//Error para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({error: 'Ruta no encontrada'})
})

module.exports = app