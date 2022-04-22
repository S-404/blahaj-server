const Sequelize = require('sequelize')

module.exports = function (sequelize) {

    return sequelize.define('tokens', {
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
        refreshToken: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    })
}
