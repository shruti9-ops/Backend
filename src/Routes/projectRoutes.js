const express = require('express');
const router = express.Router();
const projectController = require('../Controller/projectController');
const authMiddleware = require('../Middleware/authMiddleware');

router.post('/create',authMiddleware,projectController.createProject);
router.post('/addmember',authMiddleware,projectController.addMember);
router.post('/removemember',authMiddleware,projectController.removeMember);
router.get('/getProject',authMiddleware,projectController.getProjects);
router.get('/:id',authMiddleware,projectController.getProjectById);

module.exports = router;
