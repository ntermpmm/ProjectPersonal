module.exports = (sequelize, DataTypes) => {
    const Items = sequelize.define(
        "Items",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            shippingPrice: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            oldPrice: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            packageInclude: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            packageDescription: {
                type: DataTypes.STRING(9999),
                allowNull: false,
            },
            packageSpecification: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ImgHero: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ImgDescrip1: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ImgDescrip2: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ImgDescrip3: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            typeOfItems: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            underscored: true,
        }
    );
    Items.associate = (models) => {
        Items.belongsTo(models.Content, {
            foreignKey: {
                name: "contentId",
                allowNull: false,
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
        });

        Items.hasMany(models.Order, {
            foreignKey: {
                name: "itemsId",
                allowNull: false,
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
        });
    };
    return Items;
};
