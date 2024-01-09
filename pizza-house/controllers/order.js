const { Orders } = require("../models/Models.js");
const Cookies = require('js-cookie');
const mongoose = require('mongoose');



const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9); // Generate a random alphanumeric string
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

//

const formUpdateOrder = async (req, res) => {
    console.log("form");
    try {
        console.log(req.params.id);
      const userId = req.params.id; // Assuming userId is passed as a parameter
  
      // Fetch the order to be updated using the userId
      const order = await Orders.findOne({ user: userId });
        console.log(order);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      // Update the order fields based on the form data
      order.order_date = req.body.order_date || order.order_date;
      order.phone = req.body.phone || order.phone;
      order.address = req.body.address || order.address;
      order.status = req.body.status || order.status;
      order.name = req.body.name || order.name;

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

}

const createOrder = async (req, res) => {
    try {
        let userId = cookieUserId();


        // Construct the Order object
        const newOrder = new Orders({
            order_date: null,
            phone: null,
            address: null,
            status: null,
            pizzas: [],
            total_price: 0,
            user: userId,
        });

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

const getOrderByUserId = async (req, res) => {
    try {
        const userId = req.params.id; // Extract the user ID from req.params
        console.log(`Searching for user with ID: ${userId}`);
      
        const ordersData = await Orders.findOne({ user: req.params.id });
      
        if (!ordersData) {
          console.log(`User with ID ${userId} not found in the database.`);
          return res.status(404).json({ message: "User not found" });
        }
      
        console.log(`User with ID ${userId} found:`);
        console.log(ordersData);
      
        res.status(200).json(ordersData);
      } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: err.message });
      }
 
};

const getOrderById = async (req, res) => {

    // let orderId = req.params.id;
    // const ordersData = await Orders.findOne({ order_id: orderId });

   
        try {
          const orderId = new mongoose.Types.ObjectId(req.params.id); // Extract the order ID from req.params
          console.log(`Searching for order with ID: ${orderId}`);
      
          const ordersData = await Orders.findById(orderId );
      
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
