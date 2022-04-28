const teamsService = require('../../services/teams/teams-service')

class TeamsController {

    async create(req, res, next) {
        try {
            const {name} = req.body
            const {userId} = req.user
            const response = await teamsService.create(name,userId)
            return res.json(response)
        } catch
            (e) {
            next(e)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const response = await teamsService.getOne(id)
            return res.json(response)
        } catch
            (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            const response = await teamsService.getAll()
            return res.json(response)
        } catch
            (e) {
            next(e)
        }
    }

    async getUserParticipation(req, res, next) {
        try {
            const {userId} = req.user
            const response = await teamsService.getUserParticipation(userId)
            return res.json(response)
        } catch
            (e) {
            next(e)
        }
    }


    async update(req, res, next) {
        try {
            const {id, name} = req.body
            const {userId} = req.user
            const response = await teamsService.update(id, name, userId)
            return res.json(response)
        } catch
            (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const {userId} = req.user
            const response = await teamsService.delete(id, userId)
            return res.json(response)
        } catch
            (e) {
            next(e)
        }
    }

}

module.exports = new TeamsController()