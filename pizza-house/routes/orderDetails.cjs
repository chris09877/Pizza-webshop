const express = require('express');

const { deleteOrderDetails, updateOrderDetails, getOrderDetailsById, getOrderDetails } = require('../controllers/orderDetails.js');


const router = express.Router();

/* READ */
console.log("route cart ok");
router.get("/", getOrderDetails);

router.get("/:id", getOrderDetailsById);


/* UPDATE */

router.patch("/update/:id", updateOrderDetails);

/* DELETE */

router.delete("/delete/:id", deleteOrderDetails);


module.exports = router;