const mongoose = require('mongoose');

const PizzasSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageurl: String,
    price: Number
});
const PizzasModel = mongoose.model("pizzas", PizzasSchema);
module.exports = {PizzasModel};