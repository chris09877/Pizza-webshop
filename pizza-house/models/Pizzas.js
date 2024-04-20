const mongoose = require('mongoose');

const PizzasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
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
PizzasSchema.index({name: "text"})
const PizzasModel = mongoose.model("pizzas", PizzasSchema);
module.exports = {PizzasModel};