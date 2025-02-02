/**************************************
Nombre:      tasks.model.js
Autor:       Noé Cruz Alvarado
Proyecto:    TODO List
***************************************/
const db = require('../../db/db')

const get_tasks = () => {
    try {
        return db
    } catch (e) {
        console.error('Error get_tasks: ', e)
    }
}

const create_task = ( data ) => {
    try {
        let lastID;
        db.length == 0 ? lastID = 0 : lastID = db[db.length - 1]['id']
        db.push({
            id: lastID + 1,
            title: data.title,
            description: data.description,
            status: 0
        })
        return db
    } catch (e) {
        console.error('Error create_task: ', e)
    }
}

const update_task = ( id, data ) => {
    try {
        db.map(function (item) {
            if ( item['id'] == id ){
                item['title'] = data.title,
                item['description'] = data.description,
                item['status'] = data.status
            }
        })
        return db
    } catch (e) {
        console.error('Error update_task:  ', e)
    }
}

const delete_task = ( id ) => {
    try {
        const index = db.findIndex(item => item.id === id);
        db.splice(index, 1)
        return db
    } catch (e) {
        console.error('Error delete_task: ', e)
    }
}

module.exports = { get_tasks, create_task, update_task, delete_task }