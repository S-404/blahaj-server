const tasksService = require('../../services/todos/tasks-service')

class TasksController {

    async createTask(req, res, next) {
        try {
            const {
                teamId,
                name,
                periodicity,
                deadline,
                taskGroup,
                description,
            } = req.body
            const {userId} = req.user
            const response = await tasksService.createTask(
                {
                    newTask:
                        {
                            teamId,
                            name,
                            periodicity,
                            deadline,
                            taskGroup,
                            description,
                        },
                    userId
                }
            )
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async getTasks(req, res, next) {
        try {
            const {teamId} = req.params
            const {userId} = req.user
            const response = await tasksService.getTasks(teamId, userId)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async getOneTask(req, res, next) {
        try {
            const {id, teamId} = req.params
            const {userId} = req.user
            const response = await tasksService.getOneTask(id, teamId, userId)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async updateTaskInfo(req, res, next) {
        try {
            const {
                id,
                teamId,
                name,
                periodicity,
                deadline,
                taskGroup,
                description,
                note
            } = req.body
            const {userId} = req.user

            const response = await tasksService.updateTaskInfo(
                {
                    id,
                    teamId,
                    name,
                    periodicity,
                    deadline,
                    taskGroup,
                    description,
                    note
                },
                userId)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }


    async updateTaskStatus(req, res, next) {
        try {
            const {mode,id} = req.params // mode: start/finish/reset
            const {userId} = req.user
            const response = await tasksService.updateTaskStatus(id,userId,mode)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async deleteTask(req, res, next) {
        try {
            const {id} = req.params
            const {userId} = req.user
            const response = await tasksService.deleteTask(id, userId)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new TasksController()