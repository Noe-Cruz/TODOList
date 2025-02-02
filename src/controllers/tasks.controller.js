/**************************************
Nombre:      tasks.controller.js
Autor:       Noé Cruz Alvarado
Proyecto:    TODO List
***************************************/
const { get_tasks, create_task, update_task, delete_task } = require('../models/tasks.model')

const showTasks = (req, res) => {
    try {
        const resp = get_tasks()
        res.status(200).send(resp)
    } catch (e) {
        res.status(500).send(e)
    }
}

const createTask = (req, res) => {
    try {
        const resp = create_task( req.body )
        res.status(200).send(resp)
    } catch (e) {
        res.status(500).send(e)
    }
}

const updateTask = (req, res) => {
    try {
        const resp = update_task( parseInt(req.params.id), req.body )
        res.status(200).send(resp)
    } catch (e) {
        res.status(500).send(e)
    }
}

const deleteTask = (req, res) => {
    try {
        const resp = delete_task( parseInt(req.params.id) )
        res.status(200).send(resp)
    } catch (e) {
        res.status(500).send(e)
    }
}

module.exports = { showTasks, createTask, updateTask, deleteTask }