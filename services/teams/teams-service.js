const ApiError = require('../../exceptions/api-error')
const {UsersModel, TeamsModel, ParticipantsModel} = require('../../sequelize/models')

class TeamsService {

    async isAdmin(userId, teamId) {
        const team = await ParticipantsModel.findOne({where: {teamId, userId}})
        return !!team.isAdmin
    }

    async createTeam(name, description, userId) {

        const team = await TeamsModel.findOne({where: {name}})

        if (team) {
            throw ApiError.BadRequest(`Team '${name}' already exists`)
        }

        const newTeam = await TeamsModel.create({name, description})
        const admin = {userId, teamId: newTeam.id, isAdmin: true}
        await ParticipantsModel.create(admin)
        return newTeam
    }


    async getOne(id) {

        return await TeamsModel.findOne({where: {id}})

    }


    async getAll() {
        return await TeamsModel.findAll({
            include: {
                model: ParticipantsModel,
                required: false,
                attributes: ['id', 'isAdmin'],
                include: {
                    model: UsersModel,
                    required: false,
                    attributes: ['username'],
                }
            },
        })
    }

    async update(id, name, description, userId) {

        const isUserAdmin = await this.isAdmin(userId, id)

        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to change this team`)
        }

        const team = await TeamsModel.findOne({where: {id}})
        team.name = name
        team.description = description
        return await team.save()

    }

    async removeTeam(id) {
        return await TeamsModel.destroy({where: {id}})
    }

    async leaveTeam(teamId, userId) {

        const isUserAdmin = await this.isAdmin(userId, teamId)

        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to delete this team`)
        }

        const removed = await ParticipantsModel.destroy({where: {userId, teamId}})
        const remainingMembersQty = await ParticipantsModel.count({where: {teamId}})
        console.log(remainingMembersQty)

        if (remainingMembersQty === 0) await this.removeTeam(teamId)

        return removed
    }

    async getUserParticipation(userId) {
        return await ParticipantsModel.findAll({
            attributes: ['id', 'isAdmin', 'teamId'],
            where: {userId},
            include: {
                model: TeamsModel,
                required: false,
                attributes: ['id', 'name', 'description'],
                include: {
                    model: ParticipantsModel,
                    required: false,
                    attributes: ['id', 'isAdmin'],
                    include: {
                        model: UsersModel,
                        required: false,
                        attributes: ['username'],
                    }
                },
            },
        })
    }

    async addParticipant(id, teamId, userId) {

        const isUserAdmin = await this.isAdmin(userId, teamId)
        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to invite participants`)
        }

        const candidate = await ParticipantsModel.findOne({where: {id, teamId}})
        if (candidate) {
            throw ApiError.BadRequest(`Participant already exists`)
        }

        return await ParticipantsModel.create({userId, teamId})
    }

    async removeParticipant(id, teamId, userId) {

        const isUserAdmin = await this.isAdmin(userId, teamId)
        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to remove participants`)
        }

        const participant = await ParticipantsModel.findOne({where: {id, teamId}})
        return await participant.destroy()
    }

    async updateParticipant(id, teamId, isAdmin, userId) {

        const isUserAdmin = await this.isAdmin(userId, teamId)
        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to update participants`)
        }

        const candidate = await ParticipantsModel.findOne({where: {id, teamId}})
        candidate.isAdmin = isAdmin
        return await candidate.save()
    }

}

module.exports = new TeamsService()