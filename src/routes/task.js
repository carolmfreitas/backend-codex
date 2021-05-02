const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
router.use(auth.authentication);

router.get('/allTasks', taskController.allTasks);
router.post('/addTask/:id', taskController.addTask);
router.patch('/update/:id', taskController.updateTask);
router.delete('/remove/:id', taskController.removeTask);

module.exports = router;