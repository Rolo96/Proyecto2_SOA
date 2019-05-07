/**
 * model for orders in database
 */
module.exports = function(sequelize, Sequelize) {
    const Orders = sequelize.define(
        "orders",
        {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            userid: {
                type: Sequelize.INTEGER
            },
            products: {
                type: Sequelize.ARRAY(Sequelize.JSON),
                notEmpty: true,
                allowNull: false
            },
            total: {
                type: Sequelize.INTEGER,
                notEmpty: true,
                allowNull: false
            }
        },
        {
            timestamps: false
        }
    )

    return Orders
}
