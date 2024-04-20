const mongoose = require('mongoose');
const OrdersSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    user: {
        type: String,
        required: true,
      },
      total_price: {
        type: Number,
        required: false,
        default:0,
      },
      order_date: {
        type: Date,
        required: false,
        default:null,
      },
      phone: {
        type: String,
        required: false,
        default:null,
      },
      address: {
        type: String,
        required: false,
        default:null,
      },
      status: {
        type: String,
        enum: ['pending', 'confirmed', 'delivered'], // Add more statuses as needed
        default: 'pending',
      },
      pizzas: {
        type: Array, // Array of pizzas following the pizzaSchema
        required: false,
        default:[],
      },
});

const OrdersModel = mongoose.model("orders", OrdersSchema);
module.exports = OrdersModel;