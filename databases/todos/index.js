const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_TODOS_DATABASE_NAME,
    process.env.DB_USER,
    process.env.DB_USER_PASSWORD,
    {
        host: process.env.DB_SERVER_NAME,
        dialect: 'mssql'
    },
)

const TaskHrefsModel = require('./models/taskHrefs-model')(sequelize)
const TaskLogsModel = require('./models/taskLogs-model')(sequelize)
const TasksModel = require('./models/tasks-model')(sequelize)


module.exports = {
    TaskHrefsModel,
    TaskLogsModel,
    TasksModel,
}