const mongoose = require('mongoose');

const OrdersDetailsSchema = new mongoose.Schema({
    id: Object,
    email: String,
    password: String,
    username: String
});

const OrdersDetailsModel = mongoose.model("OrdersDetails", OrdersDetailsSchema);
module.exports = OrdersDetailsModel;