const mongoose = require('mongoose');

const PizzasSchema = new mongoose.Schema({
    id: Object,
    name: String,
    description: String,
    imageurl: String,
    price: Number
});

const PizzasModel = mongoose.model("pizzas", PizzasSchema);
module.exports = PizzasModel;