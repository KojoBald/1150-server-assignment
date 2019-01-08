module.exports = (sequelize, DataTypes) => (
    sequelize.define('log', {
        user_id: DataTypes.INTEGER,
        description: DataTypes.STRING,
        definition: DataTypes.STRING,
        results: DataTypes.STRING
    })
)