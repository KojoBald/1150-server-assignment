module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        username: DataTypes.STRING,
        passwordhash: DataTypes.STRING
    }, { freezeTableName: true })
)
