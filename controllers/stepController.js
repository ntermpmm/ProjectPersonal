const { Step, Content } = require("../models");
const createError = require("../utils/createError");

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
        const { image, description, contentId, stepOrder } = req.body;
        const step = await Step.create({
            image,
            description,
            stepOrder,
            contentId,
        });
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
