const Sequelize = require('sequelize')

module.exports = function (sequelize) {

    return sequelize.define('teams', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
        },
    },{
        timestamps: false
    })
}
