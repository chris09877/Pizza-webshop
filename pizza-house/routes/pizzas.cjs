const express = require('express');
const { deletePizzas, getPizzas, getPizzasById } = require('../controllers/pizza.js');
const router = express.Router();

/* READ */
console.log("route pizza ok");

router.get("/", getPizzas);
console.log("object");
router.get("/:id", getPizzasById);

/* DELETE */

router.delete("/delete/:id", deletePizzas);

module.exports = router;