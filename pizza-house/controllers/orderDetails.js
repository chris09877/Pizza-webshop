const { OrderDetails } = require("../models/Models.js");

const getOrderDetails = async (req, res) => {
    try {
        const orderDetailsData = await OrderDetails.find();
        res.status(200).json(orderDetailsData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getOrderDetailsById = async (req, res) => {
    try {
        const orderDetailsData = await OrderDetails.findById(req.params.id);
        if (!orderDetailsData) {
            return res.status(404).json({ message: "Order details not found" });
        }
        res.status(200).json(orderDetailsData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteOrderDetails = async (req, res) => {
    try {
        const deletedOrderDetails = await OrderDetails.findByIdAndDelete(req.params.id);
        if (!deletedOrderDetails) {
            return res.status(404).json({ message: "Order details not found" });
        }
        res.status(200).json({ message: "Order details deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateOrderDetails = async (req, res) => {
    try {
        const updatedOrderDetails = await OrderDetails.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the modified document rather than the original
            runValidators: true, // Run validation on update
        });

        if (!updatedOrderDetails) {
            return res.status(404).json({ message: "Order details not found" });
        }

        res.status(200).json(updatedOrderDetails);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getOrderDetails,
    getOrderDetailsById,
    deleteOrderDetails,
    updateOrderDetails,
};
