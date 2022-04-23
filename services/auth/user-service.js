const ApiError = require('../../exceptions/api-error')
const bcrypt = require('bcrypt')
const UserDto = require('../../dtos/user-dto')
const tokenService = require('./token-service')
const {UsersModel, TokensModel} = require('../../databases/auth')
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
        const newUser = await UsersModel.create({username, password: hashedPassword, email})

        return await this.handleUserData(newUser)
    }

    async login(username, password) {
        const user = await UsersModel.findOne({where: {username}})
        if (!user) {
            throw ApiError.BadRequest(`Username ${username} is not exists`)
        }
        const isPass = await bcrypt.compare(password, user.password)
        if (!isPass) {
            throw ApiError.BadRequest('Incorrect password')
        }

        return await this.handleUserData(user)
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenData = await TokensModel.findOne({where: {refreshToken}})
        if (!userData || !tokenData) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UsersModel.findOne({where: { id: userData.id}})
        return  await this.handleUserData(user)

    }
}

module.exports = new UserService()