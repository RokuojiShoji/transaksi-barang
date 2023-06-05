module.exports = (sequelize, DataTypes) => {

    const Stocks = sequelize.define("Stocks", {
        itemCode: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
        },
        itemName: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        itemAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })

    return Stocks;
}