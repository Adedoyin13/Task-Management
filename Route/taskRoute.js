const express = require('express');
const { addNewTask, updateTask, getTask, getAllTasks, deleteTask } = require('../controller/taskController');
const router = express.Router();

router.post('/add-task', addNewTask)
router.put('/:taskId', updateTask)
router.get('/:taskId', getTask)
router.get('/', getAllTasks)
router.delete('/:taskId', deleteTask)

module.exports = router