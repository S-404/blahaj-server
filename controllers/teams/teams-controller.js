const teamsService = require('../../services/teams/teams-service')

class TeamsController {

    async createTeam(req, res, next) {
        try {
            const {name, description} = req.body
            const {userId} = req.user
            const response = await teamsService.createTeam(name, description, userId)
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

    async update(req, res, next) {
        try {
            const {id, name, description} = req.body
            const {userId} = req.user
            const response = await teamsService.update(id, name, description, userId)
            return res.json(response)
        } catch
            (e) {
            next(e)
        }
    }

    async leaveTeam(req, res, next) {
        try {
            const {teamId} = req.params
            const {userId} = req.user
            const response = await teamsService.leaveTeam(teamId, userId)
            return res.json(response)
        } catch
            (e) {
            next(e)
        }
    }

    async addParticipant(req, res, next) {
        try {
            const {id, teamId} = req.body
            const {userId} = req.user
            const response = await teamsService.addParticipant(id, teamId, userId)
            return res.json(response)
        } catch
            (e) {
            next(e)
        }
    }

    async removeParticipant(req, res, next) {
        try {
            const {id, teamId} = req.body
            const {userId} = req.user
            const response = await teamsService.removeParticipant(id, teamId, userId)
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

    async updateParticipant(req, res, next) {
        try {
            const {id, teamId, isAdmin} = req.body
            const {userId} = req.user
            const response = await teamsService.updateParticipant(id, teamId, isAdmin, userId)
            return res.json(response)
        } catch
            (e) {
            next(e)
        }
    }

}

module.exports = new TeamsController()