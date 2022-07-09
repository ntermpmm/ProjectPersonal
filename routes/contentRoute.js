const express = require("express");
const contentController = require("../controllers/contentController");
const stepController = require("../controllers/stepController");
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
    "/",
    upload.array("mainPhoto", 6),
    contentController.createContents
);
router.get("/all", contentController.getAllContent);
router.get("/:id", contentController.getContentById);
router.put("/:id", authenticate, contentController.updateContent);
router.delete("/:id", authenticate, contentController.deleteContents);

// ====================== Step  ================================
router.get("/step", stepController.getAllStep);
router.post(
    "/step",
    authenticate,
    upload.array("stepPhoto", 6),
    stepController.createStep
);
router.put("/step/:id", stepController.updateStep);
router.delete("/step/:id", stepController.deleteStep);

module.exports = router;
