const ApiError = require('../../exceptions/api-error')
const teamsService = require('../../services/teams/teams-service')
const Sequelize = require('sequelize')
const {TasksModel, TaskHrefsModel, TaskLogsModel} = require('../../sequelize/models')


class TodosService {

    async createTask({newTask, userId}) {

        const isUserAdmin = await teamsService.isAdmin(userId, newTask.teamId)
        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to change tasks for this team`)
        }

        return await TasksModel.create({...newTask})

    }

    async getTasks(teamId, userId) {

        const isUserParticipant = await teamsService.isParticipant(userId, teamId)
        if (!isUserParticipant) {
            throw ApiError.BadRequest(`You don't have access to task list of this team`)
        }

        return await TasksModel.findAll({
            where: {teamId},
            include: {
                model: TaskHrefsModel,
                required: false,
            }
        })

    }

    async getOneTask(id, teamId, userId) {

        const isUserParticipant = await teamsService.isParticipant(userId, teamId)
        if (!isUserParticipant) {
            throw ApiError.BadRequest(`You don't have access to task list of this team`)
        }

        return await TasksModel.findOne({
            where: {id},
            include: {
                model: TaskHrefsModel,
                required: false,
            }
        })

    }

    async updateTaskInfo(taskInfo, userId) {

        const isUserAdmin = await teamsService.isAdmin(userId, taskInfo.teamId)
        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to change tasks for this team`)
        }

        const task = await TasksModel.findOne({where: {id: taskInfo.id}})

        task.name = taskInfo.name
        task.periodicity = taskInfo.periodicity
        task.deadline = taskInfo.deadline
        task.taskGroup = taskInfo.taskGroup
        task.description = taskInfo.description
        task.note = taskInfo.note

        return await task.save()

    }


    async updateTaskStatus(id, userId, mode) {

        const task = await TasksModel.findOne({where: {id}})

        const isUserAdmin = await teamsService.isAdmin(userId, task.teamId)
        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to change tasks for this team`)
        }

        switch (mode) {
            case 'start':
                task.startedAt = Sequelize.literal('CURRENT_TIMESTAMP')
                break
            case 'finish':
                task.finishedAt = Sequelize.literal('CURRENT_TIMESTAMP')
                break
            case 'reset':
                task.startedAt = null
                task.finishedAt = null
                break
            default:
                break
        }

        task.updatedBy = userId

        await task.save()
        return await this.getOneTask(id, task.teamId, userId)

    }

    async deleteTask(id, userId) {

        const task = await TasksModel.findOne({where: {id}})

        const isUserAdmin = await teamsService.isAdmin(userId, task.teamId)
        if (!isUserAdmin) {
            throw ApiError.BadRequest(`You don't have permission to change tasks for this team`)
        }

        await TaskLogsModel.destroy({where: {taskId: id}})
        await TaskHrefsModel.destroy({where: {taskId: id}})
        return await task.destroy()

    }


}

module.exports = new TodosService()