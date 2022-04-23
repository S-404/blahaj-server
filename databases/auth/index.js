const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_AUTH_DATABASE_NAME,
    process.env.DB_USER,
    process.env.DB_USER_PASSWORD,
    {
        host: process.env.DB_SERVER_NAME,
        dialect: 'mssql'
    },
)


const TokensModel = require('./models/tokens-model')(sequelize)
const UsersModel = require('./models/users-model')(sequelize)


module.exports = {
    TokensModel,
    UsersModel,
}