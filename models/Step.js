module.exports = (sequelize, DataTypes) => {
    const Step = sequelize.define(
        "Step",
        {
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING(9999),
                allowNull: false,
            },
            stepOrder: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        },
        {
            underscored: true,
        }
    );
    Step.associate = (models) => {
        // Step.belongsTo(models.ImageAlbum, {
        //     foreignKey: {
        //         name: "imgAlbumId",
        //         allowNull: false,
        //     },
        //     onUpdate: "RESTRICT",
        //     onDelete: "RESTRICT",
        // });

        Step.belongsTo(models.Content, {
            foreignKey: {
                name: "contentId",
                allowNull: false,
            },
            onUpdate: "RESTRICT",
            onDelete: "RESTRICT",
        });
    };
    return Step;
};
