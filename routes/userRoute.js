const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/me", userController.getUser);
router.get("/alluser", userController.getAllUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
