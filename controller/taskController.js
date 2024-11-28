const asyncHandler = require('express-async-handler');
const Task = require('../model/taskModel');

const addNewTask = asyncHandler(async(req, res) => {
    const {title, description} = req.body;
    try {
        if(!title || !description) {
            return res.status(400).json({message: 'All fields are required'})
        }

        const task = await Task.create({
            title,
            description
        });
        res.status(201).json(task);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})   
    }
});

const updateTask = asyncHandler(async(req, res) => {
    const {taskId} = req.params
    try {
        const {title, description} = req.body;
        const task = await Task.findById(taskId);
        if(!task) {
            return res.status(404).json({message: 'Task Not Found'})
        }
        task.title = title || task.title
        task.description = description || task.description

        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})   
    }
});

const getTask = asyncHandler(async(req, res) => {
    try {
        const {taskId} = req.params
     const task = await Task.findById(taskId);
     if(task) {
        return res.status(200).json(task)
     } else {
        return res.status(404).json({message: 'Task not found'})
     }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
});

const getAllTasks = asyncHandler(async(req, res) => {
    try {
        const tasks = await Task.find().sort('-createdAt')
    if(!tasks) {
        return res.status(404).json({message: 'No task found'})
    }
    res.status(200).json(tasks)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
});

const deleteTask = asyncHandler(async(req, res) => {
    try {
        const {taskId} = req.params;
        const task = await Task.findById(taskId);
        if(!task) {
            return res.status(404).json({message: 'task not found'})
        }
        await task.deleteOne()
        res.status(200).json({message: 'Task deleted successfully!'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'})
    }
})




module.exports = {addNewTask, updateTask, getTask, getAllTasks, deleteTask}