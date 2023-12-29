const mongoose = require('mongoose');

const PizzasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
    description:{
        type: String,
        required: true,
      },
    imageurl: {
        type: String,
        required: true,
      },
    price: {
        type: Number,
        required: true,
      },
});
const PizzasModel = mongoose.model("pizzas", PizzasSchema);
module.exports = {PizzasModel};