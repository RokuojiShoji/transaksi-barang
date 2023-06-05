module.exports = (sequelize, DataTypes) => {

    const Transactions = sequelize.define("Transactions", {
        transactionCode: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        buyAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        buyerName: {
            type: DataTypes.STRING(64),
            allowNull: false,
        },
        buyerTypeCode: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        paymentCode: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        statusCode: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
    })

    return Transactions;
}