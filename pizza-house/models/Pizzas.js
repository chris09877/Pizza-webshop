const mongoose = require('mongoose');

const PizzasSchema = new mongoose.Schema({
    _id:Object,
    name: String,
    description: String,
    imageurl: String,
    price: Number
});
const PizzasModel = mongoose.model("pizzas", PizzasSchema);
module.exports = {PizzasModel};