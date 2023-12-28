const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    id: Object,
    email: String,
    password: String,
    username: String
});

const OrdersModel = mongoose.model("orders", OrdersSchema);
module.exports = OrdersModel;