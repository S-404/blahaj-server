const hrefsService = require('../../services/todos/hrefs-service')

class HrefsController {

    async createHref(req, res, next) {
        try {
            const {teamId, taskId, href, isMain, shortName} = req.body
            const {userId} = req.user

            const response = await hrefsService.createHref({
                newHref: {teamId, taskId, href, isMain, shortName},
                userId
            })
            return res.json(response)

        } catch (e) {
            next(e)
        }
    }

    async updateHref(req, res, next) {
        try {
            const {teamId, id, href, isMain, shortName} = req.body
            const {userId} = req.user
            const response = await hrefsService.updateHref(
                {teamId, id, href, isMain, shortName},
                userId
            )
            return res.json(response)

        } catch (e) {
            next(e)
        }
    }

    async deleteHref(req, res, next) {
        try {
            const {id} = req.params
            const {userId} = req.user
            const response = await hrefsService.deleteHref(id, userId)
            return res.json(response)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new HrefsController()