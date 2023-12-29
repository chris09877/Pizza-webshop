const { Orders } = require("../models/Models.js");

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Orders.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the modified document rather than the original
            runValidators: true, // Run validation on update
        });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const createOrder = async (req, res) => {
    try {
        const newOrder = new Orders(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Orders.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrders = async (req, res) => {
    try {
        const ordersData = await Orders.find();
        res.status(200).json(ordersData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const ordersData = await Orders.findById(req.params.id);
        if (!ordersData) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(ordersData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    updateOrder,
    createOrder,
    deleteOrder,
    getOrderById,
    getOrders,
};
