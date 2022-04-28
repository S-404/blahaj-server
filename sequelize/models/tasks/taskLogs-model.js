const Sequelize = require('sequelize')

module.exports = function (sequelize) {

    return sequelize.define('taskLogs', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        teamId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        taskId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        updatedBy:{
            type: Sequelize.STRING(16),
            allowNull: false,
        },
        startedAt: {
            type: 'TIMESTAMP',
            allowNull: false,
        },
        finishedAt: {
            type: 'TIMESTAMP',
        },
        createdAt:{
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    },{
        timestamps: false
    })
}
