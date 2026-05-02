const express = require('express');
const router = express.Router();
const taskController = require('../Controller/taskController');
const authMiddleware = require('../Middleware/authMiddleware');
const { model } = require('mongoose');

router.post('/create',authMiddleware,taskController.createTask);
router.post('/update',authMiddleware,taskController.updateTask);
router.get('/getTasks',authMiddleware,taskController.getTasks);
router.get('/myTasks',authMiddleware,taskController.getMyTasks);

module.exports = router;