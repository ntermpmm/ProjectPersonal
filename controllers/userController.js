const { User, Order, Items } = require("../models");

exports.getAllUser = async (req, res, next) => {
    try {
        const user = await User.findAll();
        console.log(user);
        res.json({ user });
    } catch (err) {
        next(err);
    }
};
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id },
            include: [
                {
                    model: Order,
                    include: [{ model: Items }],
                },
            ],
        });
        console.log(user);
        res.json({ user });
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            gender,
            email,
            addresses,
            phoneNumber,
            dateOfBirth,
            password,
            profilePic,
            role,
        } = req.body;
        const result = await User.update(
            {
                firstName,
                lastName,
                gender,
                email,
                phoneNumber,
                addresses,
                dateOfBirth,
                password,
                profilePic,
                role,
            },
            { where: { id } }
        );
        if (result[0] === 0) {
            createError("user with this id not found", 400);
        }
        res.json({ message: "update User success" });
    } catch (err) {
        next(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const result = await User.destroy({
            where: { id: id },
        });
        if (result === 0) {
            createError("step with this id not found", 400);
        }
        res.status(204).json({ message: "Delete User success" });
    } catch (err) {
        next(err);
    }
};
