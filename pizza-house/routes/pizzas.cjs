const express = require('express');
const { deletePizzas, getPizzas, getPizzasById, createPizza, searchPizza } = require('../controllers/pizza.js');
const router = express.Router();

/* READ */
console.log("route pizza ok");
router.get("/", getPizzas);
console.log("object");
router.get("/search", searchPizza);
router.get("/:id", getPizzasById);

/* DELETE */
router.delete("/delete/:id", deletePizzas);

/*CREATE*/
router.post("/create", createPizza)
module.exports = router;