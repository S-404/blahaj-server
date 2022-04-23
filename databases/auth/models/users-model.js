const Sequelize = require('sequelize')

module.exports = function (sequelize) {

    return sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(16),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isActivated: {
            type: Sequelize.BOOLEAN
        },
    }, {
        timestamps: false
    })
}
