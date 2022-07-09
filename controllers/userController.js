const { User, Order, Items } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");

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

            role,
        } = req.body;

        let profilePic;
        if (req.file) {
            const result = await cloudinary.upload(req.file.path);
            profilePic = result.secure_url;
        }

        const result = await User.update(
            {
                firstName,
                lastName,
                gender,
                email,
                phoneNumber,
                addresses,
                dateOfBirth,
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
exports.updateUserPassword = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { oldPassword, password } = req.body;

        const user = await User.findOne({
            where: { id: id },
        });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            createError("password is incorrect", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        console.log(hashedPassword);
        const result = await User.update(
            {
                password: hashedPassword,
            },
            { where: { id } }
        );
        // const token = genToken({ id: user.id });
        res.status(200).json({ message: "Password Changed" });
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
