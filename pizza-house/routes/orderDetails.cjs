const express =  require('express');

const {deleteOrderDetails, updateOrderDetails, getOrderDetailsById, getOrderDetails} = require('../controllers/orderDetails.js');

// const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

/* READ */
console.log("route cart ok");
router.get("/", getOrderDetails);

router.get("/cart/:id", getOrderDetailsById);


/* UPDATE */

router.patch("/cart/update/:id", updateOrderDetails);

/* DELETE */

router.delete("/cart/delete/:id", deleteOrderDetails);


module.exports = router;