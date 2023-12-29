const { Pizzas } = require("../models/Models.js");
const { PizzasModel } = require("../models/Pizzas.js");

const getPizzas = async (req, res) => {
    console.log("trygetpizzas");

    try {
        console.log(PizzasModel);
        const pizzasData = await PizzasModel.find({});
        res.status(200).json(pizzasData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPizzasById = async (req, res) => {
    console.log("test");
    try {
        const pizzasData = await PizzasModel.findById(req.params.id);
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
    try {
        const pizzasData = await PizzasModel.findByIdAndDelete(req.params.id);
        console.log(req.params.id);
        if (!pizzasData) {
            return res.status(404).json({ message: "Pizza not found" });
        }
        res.status(200).json({ message: "Pizza deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getPizzas,
    getPizzasById,
    deletePizzas,
};
