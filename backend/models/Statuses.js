module.exports = (sequelize, DataTypes) => {

    const Statuses = sequelize.define("Statuses", {
        statusCode: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
        },
        statusType: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
    })

    return Statuses;
}