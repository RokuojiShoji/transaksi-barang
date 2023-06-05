module.exports = (sequelize, DataTypes) => {

    const Payments = sequelize.define("Payments", {
        paymentCode: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true,
        },
        paymentType: {
            type: DataTypes.STRING(16),
            allowNull: false,
        },
        paymentIndex: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    })

    return Payments;
}