const teamsService = require('../teams/teams-service')
const ApiError = require('../../exceptions/api-error')
const {TaskHrefsModel, TasksModel} = require('../../sequelize/models')

class HrefsService {

    async createHref({newHref, userId}) {

        const isUserAdmin = await teamsService.isAdmin(userId, newHref.teamId)
        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to change tasks for this team`)
        }

        return await TaskHrefsModel.create({...newHref})
    }

    async updateHref(newHrefValues, userId) {

        const isUserAdmin = await teamsService.isAdmin(userId, newHrefValues.teamId)
        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to change tasks for this team`)
        }

        const hrefObj = await TaskHrefsModel.findOne({where: {id: newHrefValues.id}})
        hrefObj.href = newHrefValues.href
        hrefObj.shortName = newHrefValues.shortName

        return await hrefObj.save()

    }

    async deleteHref(id, userId) {
        const href = await TaskHrefsModel.findOne({where: {id}})

        const task = await TasksModel.findOne({where: {id: href.taskId}})
        const isUserAdmin = await teamsService.isAdmin(userId, task.teamId)
        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to change tasks for this team`)
        }

        await href.destroy()
        return href
    }
}

module.exports = new HrefsService()