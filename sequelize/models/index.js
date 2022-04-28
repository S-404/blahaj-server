const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_DATABASE_NAME,
    process.env.DB_USER,
    process.env.DB_USER_PASSWORD,
    {
        host: process.env.DB_SERVER_NAME,
        dialect: process.env.DB_SERVER_DIALECT
    },
)


const TokensModel = require('./auth/tokens-model')(sequelize)
const UsersModel = require('./auth/users-model')(sequelize)

const TeamsModel = require('./teams/teams-model')(sequelize)
const ParticipantsModel = require('./teams/participants-model')(sequelize)

const TaskHrefsModel = require('./tasks/taskHrefs-model')(sequelize)
const TaskLogsModel = require('./tasks/taskLogs-model')(sequelize)
const TasksModel = require('./tasks/tasks-model')(sequelize)

TeamsModel.hasMany(ParticipantsModel,{foreignKey:'TeamId'})
ParticipantsModel.belongsTo(TeamsModel)

UsersModel.hasOne(ParticipantsModel,{foreignKey:'UserId'})
ParticipantsModel.belongsTo(UsersModel)

module.exports = {
    TokensModel,
    UsersModel,
    TeamsModel,
    ParticipantsModel,
    TaskHrefsModel,
    TaskLogsModel,
    TasksModel,
}