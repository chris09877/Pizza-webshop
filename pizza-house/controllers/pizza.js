const { Pizzas, Users } = require("../models/Models.js");
const { PizzasModel } = require("../models/Pizzas.js");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const getPizzas = async (req, res) => {

    const sortQuery = req.query.sort;
    let sortOptions = {};

    if (sortQuery) {
        switch (sortQuery) {
            case 'price_asc':
                sortOptions = { price: 1 };
                break;
            case 'price_desc':
                sortOptions = { price: -1 };
                break;
            case '':
                sortOptions = { name: 1 };
                break;
        }
    }

    try {
        const pizzasData = await PizzasModel.find({}).sort(sortOptions);
        res.status(200).json(pizzasData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPizzasById = async (req, res) => {
    console.log("test");
    try {
        const pizzaId = new mongoose.Types.ObjectId(req.params.id); // Convert string ID to ObjectId
        const pizzasData = await PizzasModel.findById(pizzaId);
        console.log(req.params.id);
        if (!pizzasData) {
            return res.status(404).json({ message: "Pizza not found" });
        }
        res.status(200).json(pizzasData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deletePizzas = async (req, res) => {
    if (!Users.findById(req.id)) 
    {
        return res.status(400).json({ message: "USER NOT FOUND" });
    }
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer=')) {
            return res.status(401).json({ message: "No authorization token provided" });
        }
        const token = req.headers.authorization.split("=")[1]; // Assuming Bearer token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded) {
            return res.status(403).json({ message: "Unauthorized: Only admins can delete pizzas" });
        }

        const pizzaId = req.params.id;
        const pizza = await PizzasModel.findById(pizzaId);
        if (!pizza) {
            return res.status(404).json({ message: "Pizza not found" });
        }

        await PizzasModel.findByIdAndDelete(pizzaId);
        res.status(200).json({ message: "Pizza deleted successfully" });
    } catch (err) {
        
            res.status(500).json({ message: err.message });
        
    }


};

const createPizza = async (req, res) => {

    if (!Users.findById(req.id)) {
        return res.status(403).json({ message: "Unauthorized: Only admins can create pizzas" });
    }

    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer=')) {
            return res.status(401).json({ message: "No authorization token provided" });
        }
        const token = req.headers.authorization.split("=")[1]; // Assuming Bearer token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded) {
            return res.status(403).json({ message: "Unauthorized: Only admins can delete pizzas" });
        }

        const newPizza = new PizzasModel(req.body);
        await newPizza.save();
        res.status(201).json(newPizza);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports = {
    getPizzas,
    getPizzasById,
    deletePizzas,
    createPizza,
};
