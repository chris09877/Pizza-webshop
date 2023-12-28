const { Pizzas } = require("../models/Models.js");


// const createPizzasr = async (req, res) => {
//     try {
//     const { /* specify the required fields for creating an order / } = req.body;
//     const newPizzas = new Pizzas({ / assign the values from req.body to the corresponding fields in the Orders model  });*/
//     await newPizzas.save();
//     res.status(201).json(newPizzas);
//     } catch (err) {
//     res.status(409).json({ message: err.message });
//     }
//     };
    
    const getPizzas = async (req, res) => {
    try {
    const Pizzas = await Pizzas.find();
    res.status(200).json(Pizzas);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    };
    
    const getPizzasById = async (req, res) => {
    try {
    const Pizzas = await Pizzas.findById(req.params.id);
    if (!Pizzas) {
    return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(Pizzas);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    };
    
    // const updatePizzas = async (req, res) => {
    // try {
    // const { /* specify the fields that can be updated / } = req.body;
    // const Pizzas = await Pizzas.findById(req.params.id);
    // if (!Pizzas) {
    // return res.status(404).json({ message: "Order not found" });
    // }
    // / update the fields of the order object with the values from req.body */
    // await Pizzas.save();
    // res.status(200).json(Pizzas);
    // } catch (err) {
    // res.status(500).json({ message: err.message });
    // }
    // };
    
    const deletePizzas = async (req, res) => {
    try {
    const Pizzas = await Pizzas.findByIdAndDelete(req.params.id);
    if (!Pizzas) {
    return res.status(404).json({ message: "Pizzas not found" });
    }
    res.status(200).json({ message: "Pizzas deleted successfully" });
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    };
