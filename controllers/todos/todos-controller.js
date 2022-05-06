const todosService = require('../../services/todos/todos-service')

class TodosController {

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
            const response = await todosService.createTask(
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
            const response = await todosService.getTasks(teamId, userId)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async getOneTask(req, res, next) {
        try {
            const {id, teamId} = req.params
            const {userId} = req.user
            const response = await todosService.getOneTask(id, teamId, userId)
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

            const response = await todosService.updateTaskInfo(
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
            const {id, startedAt, finishedAt, updatedBy} = req.body
            const {mode} = req.params // start/finish/reset
            const {userId} = req.user
            const response = await todosService.updateTaskStatus(
                {
                    id,
                    startedAt,
                    finishedAt,
                    updatedBy,
                },
                userId,
                mode)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async deleteTask(req, res, next) {
        try {
            const {id} = req.params
            const {userId} = req.user
            const response = await todosService.deleteTask(id, userId)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new TodosController()