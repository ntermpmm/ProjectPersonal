module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            firstName: {
                type: DataTypes.STRING,
            },
            lastName: {
                type: DataTypes.STRING,
            },
            addresses: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            phoneNumber: { type: DataTypes.STRING, unique: true },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dateOfBirth: {
                type: DataTypes.DATEONLY,
            },
            gender: {
                type: DataTypes.ENUM("MALE", "FEMALE", "OTHER"),
            },
            role: {
                type: DataTypes.ENUM("ADMIN", "USER"),
            },
            profilePic: DataTypes.STRING,
        },
        {
            underscored: true,
        }
    );
    User.associate = (models) => {
        User.hasMany(models.Order, {
            foreignKey: {
                name: "userId",
                allowNull: false,
            },
            onUpdate: "RESTRICT",
            onDelete: "CASCADE",
        });
    };
    return User;
};
