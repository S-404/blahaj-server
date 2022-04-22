const Router = require('express')
const authRouter = new Router()
const userController = require("../controllers/user-controller")
const {body} = require('express-validator')

authRouter.post(
    '/registration',
    body('username').isLength({min: 4, max: 16}),
    body('password').isLength({min: 3, max: 32}),
    userController.registration)

authRouter.post('/login', userController.login)
authRouter.post('/logout', userController.logout)
authRouter.get('/refresh', userController.refreshToken)

module.exports = authRouter