const jwt = require('jsonwebtoken')
const {TokensModel} = require('../db')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'}, null)
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '1d'}, null)
        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await TokensModel.findOne({where: {userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return await TokensModel.save()
        }
        return await TokensModel.create({userId, refreshToken})
    }

    async removeToken(refreshToken) {
        const tokenData = await TokensModel.findOne({where: {refreshToken}})
        if (tokenData) {
            return await TokensModel.destroy({where: {id: tokenData.id}})
        }
        return []
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET, null, null)
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET, null, null)
        } catch (e) {
            return null
        }
    }

}

module.exports = new TokenService()