const express =  require('express');

const {createOrder, getOrders, getOrderById, updateOrder, deleteOrder} = require('../controllers/order.js');

// const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();
console.log("route order ok");
//oco endpoints rien a voir avec url browser c'est the uri vu que la base dans server a ete defien as /pizzas => PIzzacontroller 
//il va chercher direct la partie suivante qui est id,delete etc
//le url qui vas chercher c'est celui que tu fetch
/* READ */
router.get("/", getOrders);
router.get("/:id", getOrderById);

/* UPDATE */

router.patch("/update/:id", updateOrder);

/* DELETE */

router.delete("/delete/:id", deleteOrder);


module.exports = router;