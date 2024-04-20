const { Orders, Users } = require("../models/Models.js");
const Cookies = require('js-cookie');
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');


const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
};

const cookieUserId = () => {
    let userId = Cookies.get('userId');
    if (!userId) {
        userId = generateRandomId();
        Cookies.set('userId', userId, { maxAge: 3600000, httpOnly: true });
        return userId;
    }
    else {
        return userId;
    }
};

const validPhone = (phone) => {
    const pattern = /^\d{10}$/;
    return pattern.test(phone) ? `+32${phone}` : null;
};

const validName = (name, res)=>{
    if (!/^[a-zA-Z\s]*$/.test(name)) {
        return res.status(400).json({ message: "User field must contain only letters" });
    }
};
const validDate = (order_date, res)=>{
    if (!moment(order_date, 'YYYY-MM-DD', true).isValid() || moment(order_date).isBefore(moment().format('YYYY-MM-DD'))) {
        return res.status(400).json({ message: "Invalid or past order date" });
    }

    else {
        return order_date;
    }
}

const formUpdateOrder = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }
    try {
        console.log(req.params.id);
        const userId = req.params.id;

        // Fetch the order to be updated using the userId
        const order = await Orders.findOne({ user: userId });
        console.log(order);
        // console.log(`body of params: ${req.body.user}`);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update the order fields based on the form data
        order.order_date = validDate(req.body.order_date, res) || order.order_date;
        order.phone = validPhone(req.body.phone, res) || order.phone;
        order.address = req.body.address || order.address;
        order.status = req.body.status || "pending";//|| order.status;
        order.user = validName(req.body.name, res )|| order.user;

        // Save the updated order
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};


const updateOrder = async (req, res) => {
    try {
        const priceString = req.body.price;
        console.log("Price received:", priceString, req.body);
        //CONVERTING THE TYPE OF STRING VALU TO FLOAT
        const price = parseFloat(req.body.price);

        if (isNaN(price)) {
            return res.status(400).json({ message: `Invalid price value  ${price}` });
        }
        else {
            console.log(price);
        }

        // DEFINING A PIZZA FOR THE ARRAY IN ORDER
        const pizza = {
            quantity: req.body.quantity,
            pizza_id: req.body.pizza_id,
            subtotal: price * req.body.quantity,
            name: req.body.name
        };


        console.log(`the user: ${req.body.user}`);
        const filter = { user: req.body.user };
        const update = {
            $push: { pizzas: pizza },
            $inc: { total_price: pizza.subtotal },
            $set: {
                order_date: req.body.order_date,
                phone: req.body.phone,
                address: req.body.address,
                status: req.body.status
            }
        };

        const updatedOrder = await Orders.findOneAndUpdate(filter, update, {
            new: true,
            runValidators: true
        });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ message: err.message });
    }

};

const createOrder = async (req, res) => {
    try {
        const { order_date, phone, user } = req.body;
        validDate(order_date,res);

        const formattedPhone = validPhone(phone, res);
        if (!formattedPhone) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }
        validName(user, res);

        const newOrder = new Orders({
            ...req.body,
            phone: formattedPhone,
            user,
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer=')) {
            return res.status(401).json({ message: "No authorization token provided" });
        }
        const token = req.headers.authorization.split("=")[1]; // Assuming Bearer token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded) {
            return res.status(403).json({ message: "Unauthorized: Only admins can delete orders" });
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const orderId = req.params.id;
        const order = await Orders.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await Orders.findByIdAndDelete(orderId);
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
        
            console.error("Delete Order Error:", err);
            res.status(500).json({ message: err.message });
        
    }
};

const getOrders = async (req, res) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer=')) {
            return res.status(401).json({ message: "No authorization token provided" });
        }
        const token = req.headers.authorization.split("=")[1]; // Assuming Bearer token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded) {
            return res.status(403).json({ message: "Unauthorized: Only admins can delete orders" });
        }
        const ordersData = await Orders.find();
        res.status(200).json(ordersData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrderByUserId = async (req, res) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer=')) {
            return res.status(401).json({ message: "No authorization token provided" });
        }
        const token = req.headers.authorization.split("=")[1]; // Assuming Bearer token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded) {
            return res.status(403).json({ message: "Unauthorized: Only admins can delete orders" });
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const userId = req.params.id;
        console.log(`Searching for user with ID: ${userId}`);
        const userExists = await Users.findOne({ _id: userId });
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        } else {
            console.log("User exists:", userExists);
        }
        const ordersData = await Orders.findOne({ user: req.params.id });

        if (!ordersData) {
            console.log(`Order with user ID ${userId} not found in the database.`);
            return res.status(404).json({ message: "Order not found" });
        }

        console.log(`Order with user ID ${userId} found:`);
        console.log(ordersData);

        res.status(200).json(ordersData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: err.message });
    }

};

const getOrderById = async (req, res) => {

    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer=')) {
            return res.status(401).json({ message: "No authorization token provided" });
        }
        const token = req.headers.authorization.split("=")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded) {
            return res.status(403).json({ message: "Unauthorized: Only admins can delete orders" });
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        const orderId = new mongoose.Types.ObjectId(req.params.id); // Extract the order ID from req.params
        console.log(`Searching for order with ID: ${orderId}`);

        const ordersData = await Orders.findById(orderId);

        if (!ordersData) {
            console.log(`Order with ID ${orderId} not found in the database.`);
            return res.status(404).json({ message: "Order not found" });
        }

        console.log(`Order with ID ${orderId} found:`);
        console.log(ordersData);

        res.status(200).json(ordersData);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: err.message });
    }

};

module.exports = {
    updateOrder,
    createOrder,
    deleteOrder,
    getOrderById,
    getOrders,
    formUpdateOrder,
    getOrderByUserId,
};
