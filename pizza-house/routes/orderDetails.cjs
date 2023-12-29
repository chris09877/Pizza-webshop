const express =  require('express');

const {deleteOrderDetails, updateOrderDetails, getOrderDetailsById, getOrderDetails} = require('../controllers/orderDetails.js');

// const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();
//oco endpoints rien a voir avec url browser c'est the uri vu que la base dans server a ete defien as /pizzas => PIzzacontroller 
//il va chercher direct la partie suivante qui est id,delete etc
//le url qui vas chercher c'est celui que tu fetch
/* READ */
console.log("route cart ok");
router.get("/", getOrderDetails);

router.get("/:id", getOrderDetailsById);


/* UPDATE */

router.patch("/update/:id", updateOrderDetails);

/* DELETE */

router.delete("/delete/:id", deleteOrderDetails);


module.exports = router;