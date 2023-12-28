const { OrderDetails } = require("../models/Models.js");

// const createOrderDetails = async (req, res) => {
//     try {
//     const { /* specify the required fields for creating an order / } = req.body;
//     const newOrderDetails = new OrderDetails({ / assign the values from req.body to the corresponding fields in the Orders model  });*/
//     await newOrderDetails.save();
//     res.status(201).json(newOrderDetails);
//     } catch (err) {
//     res.status(409).json({ message: err.message });
//     }
//     };
    
    const getOrderDetails = async (req, res) => {
    try {
    const OrderDetails = await OrderDetails.find();
    res.status(200).json(OrderDetails);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    };
    
    const getOrderDetailsById = async (req, res) => {
    try {
    const OrderDetails = await OrderDetails.findById(req.params.id);
    if (!OrderDetails) {
    return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(OrderDetails);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    };
    
    // const updateOrderDetails = async (req, res) => {
    // try {
    // const { /* specify the fields that can be updated / } = req.body;
    // const OrderDetails = await Orders.findById(req.params.id);
    // if (!OrderDetails) {
    // return res.status(404).json({ message: "Order not found" });
    // }
    // / update the fields of the order object with the values from req.body */
    // await OrderDetails.save();
    // res.status(200).json(order);
    // } catch (err) {
    // res.status(500).json({ message: err.message });
    // }
    // };
    
    const deleteOrderDetails = async (req, res) => {
    try {
    const OrderDetails = await OrderDetails.findByIdAndDelete(req.params.id);
    if (!OrderDetails) {
    return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    };
