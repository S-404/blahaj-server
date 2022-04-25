const Router = require('express')
const router = new Router()
const userController = require("../../controllers/auth/user-controller")
const {body} = require('express-validator')

router.post(
    '/registration',
    body('username').isLength({min: 4, max: 16}),
    body('password').isLength({min: 3, max: 32}),
    userController.registration)

router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refreshToken)

module.exports = router