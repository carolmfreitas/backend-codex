const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
//router.use(auth.authentication);

router.get('/allTasks', auth.authentication, taskController.allTasks);
router.get('/:id', auth.authentication, taskController.allTasks);
router.post('/addTask/:id', auth.authentication, taskController.addTask);
router.patch('/update/:id', auth.authentication, taskController.updateTask);
router.delete('/remove/:id', auth.authentication, taskController.removeTask);

module.exports = router;