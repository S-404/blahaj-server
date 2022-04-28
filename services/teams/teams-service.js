const ApiError = require('../../exceptions/api-error')
const {UsersModel,TeamsModel, ParticipantsModel} = require('../../sequelize/models')

class TeamsService {

    async isAdmin(userId, teamId) {
        const team = await ParticipantsModel.findOne({where: {teamId, userId}})
        console.log(team?.isAdmin)
        return !!team.isAdmin
    }

    async create(name, description, userId) {

        const team = await TeamsModel.findOne({where: {name}})

        if (team) {
            throw ApiError.BadRequest(`Group ${name} already exists`)
        }

        const newTeam = await TeamsModel.create({name, description})
        await ParticipantsModel.create({userId, teamId: newTeam.id, isAdmin: true})

        return newTeam
    }


    async getOne(id) {

        return await TeamsModel.findOne({where: {id}})

    }


    async getAll() {

        return await TeamsModel.findAll()

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

    async delete(id, userId) {

        const isUserAdmin = await this.isAdmin(userId, id)

        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to delete this team`)
        }

        const team = await TeamsModel.findOne({where: {id}})
        const participants = await ParticipantsModel.findAll({
            where: {
                teamId: id
            }
        })
        await participants.destroy()
        return await team.destroy()

    }


}

module.exports = new TeamsService()