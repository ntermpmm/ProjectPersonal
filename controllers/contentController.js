const { Content, Step } = require("../models");
const createError = require("../utils/createError");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

exports.getAllContent = async (req, res, next) => {
    try {
        const contents = await Content.findAll({
            include: [
                {
                    model: Step,
                },
            ],
        });
        console.log(contents);
        res.json({ contents });
        req.content = contents;
    } catch (err) {
        next(err);
    }
};

exports.getContentById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const content = await Content.findOne({
            where: { id: id },
            include: [
                {
                    model: Step,
                },
            ],
        });
        res.json({ content: content });
    } catch (err) {
        next(err);
    }
};

exports.createContents = async (req, res, next) => {
    try {
        const {
            country,
            nameContent,
            caption,
            title,
            description,
            description2,
            type,
            howToTitle,
            howToDescription,
        } = req.body;
        // console.log("logggg");
        // console.log("req.file");
        // console.log(req.file);
        let mainPhoto;
        if (req.files) {
            const result = await cloudinary.upload(req.files[0].path);
            mainPhoto = result.secure_url;
        }

        const content = await Content.create({
            country: country,
            nameContent: nameContent,
            caption: caption,
            mainPhoto,
            title: title,
            description: description,
            description2: description2,
            type: type,
            howToTitle: howToTitle,
            howToDescription: howToDescription,
        });
        // console.log("content logggggg");
        // console.log(content.id);

        // ============================  STEP   =====================================

        const { stepDescription } = req.body;
        // let image = [];
        let countStep = 1;
        let stepFinal = [];
        if (req.files) {
            for (const file of req.files) {
                if (file === req.files[0]) {
                    const result = await cloudinary.upload(file.path);
                    // image = image = [
                    //     ...image,
                    //     { contentId: content.id, image: result.secure_url },
                    // ];
                    const step = await Step.create({
                        description: stepDescription,
                        image: result.secure_url,
                        stepOrder: countStep,
                        contentId: content.id,
                    });
                    countStep++;
                    stepFinal = [...stepFinal, step];
                }
            }
        }
        step.forEach((element) => console.log(element));
        // const test = JSON.parse(stepFinal);
        // console.log(test);
        res.status(201).json({ content: content });
    } catch (err) {
        next(err);
    }
    // finally
    // {
    //     if (req.file) {
    //         fs.unlinkSync(req.files.path);
    //     }
    // }
};

exports.updateContent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            country,
            nameContent,
            caption,
            mainPhoto,
            title,
            description,
            description2,
            type,
            howToTitle,
            howToDescription,
        } = req.body;
        const result = await Content.update(
            {
                country,
                nameContent,
                caption,
                mainPhoto,
                title,
                description,
                description2,
                type,
                howToTitle,
                howToDescription,
            },
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
