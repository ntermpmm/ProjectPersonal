const express = require("express");
const orderController = require("../controllers/orderController");
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
    "/",
    authenticate,
    upload.single("slip"),

    orderController.createOrder
);
router.get("/all", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.put("/:id", authenticate, orderController.updateOrder);
router.delete("/:id", authenticate, orderController.deleteOrder);

module.exports = router;
