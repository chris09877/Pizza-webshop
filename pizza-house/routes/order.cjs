const express =  require('express');

const {createOrder, getOrders, getOrderById, updateOrder, deleteOrder} = require('../controllers/order.js');

// const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();
console.log("route order ok");

/* READ */
router.get("/", getOrders);
router.get("order/:id", getOrderById);

/* UPDATE */

router.patch("order/update/:id", updateOrder);

/* DELETE */

router.delete("order/delete/:id", deleteOrder);

/* CREATE   */
router.post("order/create", createOrder);



module.exports = router;