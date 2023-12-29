const express =  require('express');

const {createOrder, getOrders, getOrderById, updateOrder, deleteOrder} = require('../controllers/order.js');

// const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();
console.log("route order ok");

/* READ */
router.get("/", getOrders);
router.get("/:id", getOrderById);

/* UPDATE */

router.patch("/update/:id", updateOrder);

/* DELETE */

router.delete("/delete/:id", deleteOrder);


module.exports = router;