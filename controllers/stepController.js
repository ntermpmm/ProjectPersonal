const { Step, Content } = require("../models");
const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");

exports.getAllStep = async (req, res, next) => {
    try {
        const steps = await Step.findAll({
            where: { contentId: req.content.id },
        });
        res.json({ steps: steps });
        req.step = steps;
    } catch (err) {
        next(err);
    }
};

exports.createStep = async (req, res, next) => {
    try {
        const { description, contentId, stepOrder } = req.body;
        console.log("termmmmm");
        console.log(req.body);
        let stepPhoto;
        if (req.files) {
            const result = await cloudinary.upload(req.files[0].path);
            stepPhoto = result.secure_url;
        }

        const step = await Step.create({
            image: stepPhoto,
            description,
            stepOrder,
            contentId,
        });
        console.log(step);
        res.status(201).json({ step: step });
    } catch (err) {
        next(err);
    }
};

exports.updateStep = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { image, description } = req.body;
        const result = await Step.update(
            { image, description },
            { where: { id } }
        );

        if (result[0] === 0) {
            createError("step with this id not found", 400);
        }
        res.json({ message: "update Step success" });
    } catch (err) {
        next(err);
    }
};

exports.deleteStep = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const result = await Step.destroy({
            where: { id: id },
        });
        if (result === 0) {
            createError("step with this id not found", 400);
        }
        res.status(204).json();
    } catch (err) {
        next(err);
    }
};
