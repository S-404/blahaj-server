const Router = require('express')
const router = new Router()
const teamsController = require("../../controllers/todos/teams-controller")

router.post('/teams', teamsController.create)
router.get('/teams', teamsController.getAll)
router.get('/teams/:id', teamsController.getOne)
router.put('/teams', teamsController.update)
router.delete('/teams/:id', teamsController.delete)

module.exports = router