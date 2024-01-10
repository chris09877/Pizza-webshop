const express = require('express');
const { deletePizzas, getPizzas, getPizzasById } = require('../controllers/pizza.js');

// const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();
//oco endpoints rien a voir avec url browser c'est the uri vu que la base dans server a ete defien as /pizzas => PIzzacontroller 
//il va chercher direct la partie suivante qui est id,delete etc
//le url qui vas chercher c'est celui que tu fetch
/* READ */
console.log("route pizza ok");

router.get("/", getPizzas);
console.log("object");
router.get("/:id", getPizzasById);

/* DELETE */

router.delete("/delete/:id", deletePizzas);

module.exports = router;