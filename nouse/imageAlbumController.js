const { Content } = require("../models");
const createError = require("../utils/createError");

exports.getAllImageAlbum = async (req, res, next) => {
    try {
        const imagealbums = await ImageAlbum.findAll({
            where: { contentId: req.content.id },
        });
        console.log(imagealbums);
        res.json({ imagealbums: imagealbums });
        req.imagealbum = imagealbums;
    } catch (err) {
        next(err);
    }
};

exports.getContentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const content = await Content.findOne({
            where: { id: id },
        });
        res.json({ content: content });
    } catch (err) {
        next(err);
    }
};

exports.createContents = async (req, res, next) => {
    try {
        const { title, description, mainPhoto } = req.body;
        const content = await Content.create({
            title,
            description,
            mainPhoto,
        });
        res.status(201).json({ content: content });
    } catch (err) {
        console.log(err);
    }
};

exports.updateContent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, mainPhoto } = req.body;
        const result = await Content.update(
            { title, description, mainPhoto },
            { where: { id } }
        );
        if (result[0] === 0) {
            createError("todo with this id not found", 400);
        }
        res.json({ message: "update Content success" });
    } catch (err) {
        next(err);
    }
};

exports.deleteContents = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Content.destroy({
            where: { id: id },
        });
        console.log(req.content);
        if (result === 0) {
            createError("content with this id not found", 400);
        }
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};
