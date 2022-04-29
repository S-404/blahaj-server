const Router = require('express')
const router = new Router()
const teamsController = require("../../controllers/teams/teams-controller")

router.post('/teams', teamsController.createTeam)
router.get('/teams', teamsController.getAll)
router.get('/teams/:id', teamsController.getOne)
router.put('/teams', teamsController.update)
router.delete('/teams/:teamId', teamsController.leaveTeam)

router.post('/participant', teamsController.addParticipant)
router.get('/participant', teamsController.getUserParticipation)
router.put('/participant', teamsController.updateParticipant)
router.delete('/participant', teamsController.removeParticipant)

module.exports = router