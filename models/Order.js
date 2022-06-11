module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
            quantity: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            slip: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            status: {
                type: DataTypes.ENUM("PAID", "UNPAID", "CANCELLED"),
            },
            isDarft: { type: DataTypes.BOOLEAN },
            shippingStatus: {
                type: DataTypes.ENUM(
                    "PROCESSING",
                    "SHIPPED",
                    "ARRIVED",
                    "CANCELLED"
                ),
                allowNull: false,
            },
        },
        {
            underscored: true,
        }
    );
    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
        });

        Order.belongsTo(models.Items, {
            foreignKey: {
                name: "itemsId",
                allowNull: false,
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
        });
    };
    return Order;
};
