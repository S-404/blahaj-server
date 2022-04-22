const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')
const userService = require('../services/user-service')



class UserController {

    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {username, password, email} = req.body
            const userData = await userService.registration(username, password, email)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch
            (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            console.log(req.body)
            next()

        } catch
            (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            next()
        } catch (e) {
            next(e)
        }
    }

    async refreshToken(req, res, next) {
        try {
            next()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()