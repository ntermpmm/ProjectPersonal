const express = require("express");
const multer = require("multer");
const itemController = require("../controllers/itemController");
const authenticate = require("../middleware/authenticate");
const upload = multer({ dest: "uploads/" });

const router = express.Router();
const cpUpload = upload.fields([
    { name: "ImgHero", maxCount: 1 },
    { name: "ImgDescrip1", maxCount: 1 },
    { name: "ImgDescrip2", maxCount: 1 },
    { name: "ImgDescrip3", maxCount: 1 },
]);

router.post("/", authenticate, cpUpload, itemController.createItem);
router.get("/all", itemController.getAllItems);
router.get("/:id", itemController.getItemById);
router.put("/:id", authenticate, itemController.updateItem);
router.delete("/:id", authenticate, itemController.deleteItem);

module.exports = router;
