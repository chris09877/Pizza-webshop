const express = require('express');

const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder, formUpdateOrder, getOrderByUserId } = require('../controllers/order.js');

// const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();
console.log("route order ok");

/* READ */
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/user/:id", getOrderByUserId);

/* UPDATE */

router.patch("/update/:id", updateOrder);
router.patch("/checkout/:id", formUpdateOrder);

/* DELETE */

router.delete("/delete/:id", deleteOrder);

/* CREATE */

router.post("/create", createOrder);


module.exports = router;