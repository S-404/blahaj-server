const teamsService = require('../../services/todos/teams-service')

class TeamsController {

    async create(req, res, next) {
        try {
            const {name} = req.body
            const groupData = await teamsService.create(name)
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
            const userData = await teamsService.update(id, name)
            return res.json(userData)
        } catch
            (e) {
            next(e)
        }
    }
    async delete(req, res, next) {
        try {
            const {id} = req.params
            const userData = await teamsService.delete(id)
            return res.json(userData)
        } catch
            (e) {
            next(e)
        }
    }

}

module.exports = new TeamsController()