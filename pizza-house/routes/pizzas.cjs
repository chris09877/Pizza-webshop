const express =  require('express');

const {deletePizzas, getPizzas, getPizzasById} = require('../controllers/pizza.js');

// const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();
//oco endpoints rien a voir avec url browser c'est the uri
/* READ */
console.log("route pizza ok");

router.get("/", getPizzas);
console.log("object");
router.get("/pizzas/:id", getPizzasById);


/* DELETE */

router.delete("pizzas/delete/:id", deletePizzas);

module.exports = router;