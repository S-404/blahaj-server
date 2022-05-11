const Sequelize = require('sequelize')

module.exports = function (sequelize) {

    return sequelize.define('tasks', {
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
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'new task'
        },
        periodicity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        deadline: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        taskGroup: {
            type: Sequelize.STRING(50),
            allowNull: false,
            defaultValue: 'new tasks'
        },
        description: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        note: {
            type: Sequelize.STRING,
            defaultValue: ''
        },
        updatedBy:{
            type: Sequelize.STRING(16),
        },
        startedAt: {
            type: 'TIMESTAMP',
        },
        finishedAt: {
            type: 'TIMESTAMP',
        },
        createdAt: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
    })
}
