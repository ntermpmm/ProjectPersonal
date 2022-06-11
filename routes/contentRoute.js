const express = require("express");
const contentController = require("../controllers/contentController");
const stepController = require("../controllers/stepController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
    "/",
    upload.array("mainPhoto", 6),
    contentController.createContents
);
router.get("/all", contentController.getAllContent);
router.get("/:id", contentController.getContentById);
router.put("/:id", contentController.updateContent);
router.delete("/:id", contentController.deleteContents);

// ====================== Step  ================================
router.get("/step", stepController.getAllStep);
router.post("/step", stepController.createStep);
router.put("/step/:id", stepController.updateStep);
router.delete("/step/:id", stepController.deleteStep);

module.exports = router;
