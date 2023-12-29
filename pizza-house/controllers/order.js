const { Orders } = require("../models/Models.js");
const Cookies = require('js-cookie');
const config = require('../config.js');
// Cookies.set('userId');


// Set a cookie for the user with the random value
// let userId = `${res.cookie('userId', randomValue, { maxAge:  3600000 , httpOnly: true })}`; // Adjust maxAge and other options as needed
const cookieUserId = () => {
   let userId = Cookies.get('userId');
   if (!userId) {
     userId = config.generateRandomId();
     Cookies.set('userId', userId,{ maxAge:  3600000 , httpOnly: true });
     return userId;
   }
   else{
    return userId;
   }
};





const createOrder = async (req, res) => {
    try {
      let userId = cookieUserId();
      
      // Extract values from the request body
      const { name, price, quantity } = req.body;
      const subtotal = price * quantity; // Calculate subtotal based on price and quantity
  
      // Construct the Order object
      const newOrder = new Orders({
        user: req.body.user, // Assuming 'user' is present in the request body
        total_price: subtotal, // Assign the total price (based on subtotal)
        // Assign other properties as needed
        order_date: new Date(),
        phone: null,
        address: null,
        status: null,
        pizzas: [{
          pizza_id: req.body.pizza_id, // Assuming 'pizza_id' is present in the request body
          quantity: req.body.quantity, // Assuming 'quantity' is present in the request body
          subtotal: subtotal, // Assign the subtotal calculated earlier
        }]
      });
  
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  };
  

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
