/**************************************
Nombre:      tasks.routes.js
Autor:       Noé Cruz Alvarado
Proyecto:    TODO List
***************************************/
const express = require('express')

const { showTasks, createTask, updateTask, deleteTask  } = require('../controllers/tasks.controller')

const router = express.Router()

router.get('/tasks', showTasks)
router.post('/tasks', createTask)
router.put('/tasks/:id', updateTask)
router.delete('/tasks/:id', deleteTask)

module.exports = router