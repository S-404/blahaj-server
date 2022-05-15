const Sequelize = require('sequelize')

module.exports = function (sequelize) {

    return sequelize.define('taskHrefs', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        taskId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        href: {
            type: Sequelize.STRING,
            allowNull: false
        },
        shortName:{
            type: Sequelize.STRING(50),
            allowNull: false,
            defaultValue: 'link'
        }
    }, {
        timestamps: false
    })
}
