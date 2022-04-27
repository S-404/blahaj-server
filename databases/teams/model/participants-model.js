const Sequelize = require('sequelize')

module.exports = function (sequelize) {

    return sequelize.define('participants', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        teamId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,
        }
    },{
        timestamps: false
    })
}
