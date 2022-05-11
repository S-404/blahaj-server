const Router = require('express')
const router = new Router()
const todosController = require("../../controllers/todos/todos-controller")

router.post('/tasks', todosController.createTask)
router.get('/tasks/:teamId', todosController.getTasks)
router.get('/tasks/:teamId/:id', todosController.getOneTask)
router.put('/tasks/info', todosController.updateTaskInfo)
router.put('/tasks/:id/status/:mode', todosController.updateTaskStatus)
router.delete('/tasks/:id', todosController.deleteTask)

module.exports = router