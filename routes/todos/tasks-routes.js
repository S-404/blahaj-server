const Router = require('express')
const router = new Router()
const tasksController = require("../../controllers/todos/tasks-controller")

router.post('/tasks', tasksController.createTask)
router.get('/tasks/:teamId', tasksController.getTasks)
router.get('/tasks/:teamId/:id', tasksController.getOneTask)
router.put('/tasks/info', tasksController.updateTaskInfo)
router.put('/tasks/:id/status/:mode', tasksController.updateTaskStatus)
router.delete('/tasks/:id', tasksController.deleteTask)

module.exports = router