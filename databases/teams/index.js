const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_TEAMS_DATABASE_NAME,
    process.env.DB_USER,
    process.env.DB_USER_PASSWORD,
    {
        host: process.env.DB_SERVER_NAME,
        dialect: 'mssql'
    },
)

const TeamsModel = require('../teams/model/teams-model')(sequelize)
const ParticipantsModel = require('../teams/model/participants-model')(sequelize)


module.exports = {
    TeamsModel,
    ParticipantsModel
}