const teamsService = require('../../services/teams/teams-service')

class TeamsController {

    async create(req, res, next) {
        try {
            const {name} = req.body
            const {userId} = req.user
            const groupData = await teamsService.create(name,userId)
            return res.json(groupData)
        } catch
            (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const groupData = await teamsService.getOne(id)
            return res.json(groupData)
        } catch
            (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const userData = await teamsService.getAll()
            return res.json(userData)
        } catch
            (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {id, name} = req.body
            const {userId} = req.user
            const userData = await teamsService.update(id, name, userId)
            return res.json(userData)
        } catch
            (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const {userId} = req.user
            const userData = await teamsService.delete(id, userId)
            return res.json(userData)
        } catch
            (e) {
            next(e)
        }
    }

}

module.exports = new TeamsController()