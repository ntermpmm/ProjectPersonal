const { Order, Items, User } = require("../models");
const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: Items,
                },
                {
                    model: User,
                },
            ],
        });
        res.json({ orders: orders });
        req.orders = orders;
    } catch (err) {
        next(err);
    }
};

exports.getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await Order.findOne({
            where: { id: id },
            include: [
                {
                    model: Items,
                },
                {
                    model: User,
                },
            ],
        });
        res.json({ order: order });
    } catch (err) {
        next(err);
    }
};

exports.createOrder = async (req, res, next) => {
    try {
        const { userId, itemsId } = req.body;
        let slip;
        if (req.file) {
            const result = await cloudinary.upload(req.file.path);
            slip = result.secure_url;
        }
        console.log(slip);
        console.log(userId);
        console.log(itemsId);
        const order = await Order.create({
            quantity: "1",
            slip,
            status: "PAID",
            isDarft: "1",
            shippingStatus: "PROCESSING",
            userId,
            itemsId,
        });
        res.status(201).json({ order: order });
    } catch (err) {
        console.log(err);
    }
};

exports.updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, shippingStatus } = req.body;
        const result = await Order.update(
            {
                status,
                shippingStatus,
            },
            { where: { id } }
        );
        if (result[0] === 0) {
            createError("todo with this id not found", 400);
        }
        res.json({ message: "update Items success" });
    } catch (err) {
        next(err);
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Order.destroy({
            where: { id: id },
        });
        if (result === 0) {
            createError("content with this id not found", 400);
        }
        res.status(204).json({ message: "delete Items success" });
    } catch (err) {
        next(err);
    }
};
