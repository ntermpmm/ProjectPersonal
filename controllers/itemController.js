const { Items, Content } = require("../models");
const createError = require("../utils/createError");

exports.getAllItems = async (req, res, next) => {
    try {
        const items = await Items.findAll({
            include: [
                {
                    model: Content,
                },
            ],
        });
        res.json({ items: items });
        req.item = items;
    } catch (err) {
        next(err);
    }
};

exports.getItemById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await Items.findOne({
            where: { id: id },
        });
        res.json({ item: item });
    } catch (err) {
        next(err);
    }
};

exports.createItem = async (req, res, next) => {
    try {
        const {
            name,
            price,
            oldPrice,
            ImgHero,
            ImgDescrip1,
            ImgDescrip2,
            ImgDescrip3,
            typeOfItems,
            shippingPrice,
            contentId,
            packageInclude,
            packageDescription,
            packageSpecification,
        } = req.body;
        const item = await Items.create({
            name,
            price,
            oldPrice,
            ImgHero,
            ImgDescrip1,
            ImgDescrip2,
            ImgDescrip3,
            typeOfItems,
            shippingPrice,
            contentId,
            packageInclude,
            packageDescription,
            packageSpecification,
        });
        res.status(201).json({ item: item });
    } catch (err) {
        console.log(err);
    }
};

exports.updateItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            name,
            price,
            oldPrice,
            ImgHero,
            ImgDescrip1,
            ImgDescrip2,
            ImgDescrip3,
            typeOfItems,
            shippingPrice,
            packageInclude,
            packageDescription,
            packageSpecification,
        } = req.body;
        const result = await Items.update(
            {
                name,
                price,
                oldPrice,
                ImgHero,
                ImgDescrip1,
                ImgDescrip2,
                ImgDescrip3,
                typeOfItems,
                shippingPrice,
                packageInclude,
                packageDescription,
                packageSpecification,
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

exports.deleteItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Items.destroy({
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
