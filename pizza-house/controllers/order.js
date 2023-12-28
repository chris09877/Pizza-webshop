const { Orders } = require("../models/Models.js");


// const createOrder = async (req, res) => {
//     try {
//     const { /* specify the required fields for creating an order / } = req.body;
//     const newOrder = new Orders({ / assign the values from req.body to the corresponding fields in the Orders model  });*/
//     await newOrder.save();
//     res.status(201).json(newOrder);
//     } catch (err) {
//     res.status(409).json({ message: err.message });
//     }
//     };
    
    const getOrders = async (req, res) => {
    try {
    const orders = await Orders.find();
    res.status(200).json(orders);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    };
    
    const getOrderById = async (req, res) => {
    try {
    const order = await Orders.findById(req.params.id);
    if (!order) {
    return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    };
    
    // const updateOrder = async (req, res) => {
    // try {
    // const { /* specify the fields that can be updated / } = req.body;
    // const order = await Orders.findById(req.params.id);
    // if (!order) {
    // return res.status(404).json({ message: "Order not found" });
    // }
    // / update the fields of the order object with the values from req.body */
    // await order.save();
    // res.status(200).json(order);
    // } catch (err) {
    // res.status(500).json({ message: err.message });
    // }
    // };
    
    const deleteOrder = async (req, res) => {
    try {
    const order = await Orders.findByIdAndDelete(req.params.id);
    if (!order) {
    return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    };