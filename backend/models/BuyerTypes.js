module.exports = (sequelize, DataTypes) => {

    const BuyerTypes = sequelize.define("BuyerTypes", {
        buyerTypeCode: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
        },
        buyerType: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
    })

    return BuyerTypes;
}