module.exports = (sequelize, DataTypes) => {
    const Content = sequelize.define(
        "Content",
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nameContent: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            caption: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(5000),
                allowNull: false,
            },
            description2: {
                type: DataTypes.STRING(5000),
                allowNull: false,
            },
            howToDescription: {
                type: DataTypes.STRING(4500),
                allowNull: false,
            },
            howToTitle: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mainPhoto: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            underscored: true,
        }
    );
    Content.associate = (models) => {
        // Content.hasMany(models.Items, {
        //     foreignKey: {
        //         name: "contentId",
        //         // allowNull: false,
        //     },
        //     onUpdate: "RESTRICT",
        //     onDelete: "CASCADE",
        // });
        Content.hasMany(models.Step, {
            foreignKey: {
                name: "contentId",
                allowNull: false,
            },
            onUpdate: "RESTRICT",
            onDelete: "CASCADE",
        });
        // Content.hasMany(models.ImageAlbum, {
        //     foreignKey: {
        //         name: "contentId",
        //         allowNull: false,
        //     },
        //     onUpdate: "RESTRICT",
        //     onDelete: "RESTRICT",
        // });
    };
    return Content;
};
