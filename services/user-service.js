const ApiError = require('../exceptions/api-error')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user-dto')
const tokenService = require('../services/token-service')
const {UsersModel} = require('../db')
const {Op} = require('sequelize')


class UserService {

    async handleUserData(userData) {
        const userDto = new UserDto(userData)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.userId, tokens.refreshToken)

        return {user: userDto, ...tokens}
    }

    async registration(username, password, email) {

        const candidate = await UsersModel.findOne({where: {[Op.or]: [{username}, {email}],}})

        if (candidate) {
            throw ApiError.BadRequest(`Username ${username} or email ${email} already used`)
        }

        const hashedPassword = await bcrypt.hash(password, +process.env.HASH_SALT)

        const newUser = await UsersModel.create({username, password : hashedPassword, email});
        newUser.save()
        console.log(newUser)
        return await this.handleUserData(newUser)
    }
    }

    module
.
    exports = new UserService()