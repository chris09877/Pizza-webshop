const { Users } = require("../models/Models.js");

// const createUsers = async (req, res) => {
//     try {
//     const { /* specify the required fields for creating an order / } = req.body;
//     const newUsers = new Users({ / assign the values from req.body to the corresponding fields in the Orders model  });*/
//     await newUsers.save();
//     res.status(201).json(newUsers);
//     } catch (err) {
//     res.status(409).json({ message: err.message });
//     }
//     };
    
    const getUsers = async (req, res) => {
    try {
    const Users = await Users.find();
    res.status(200).json(Users);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    };
    
    const getUsersById = async (req, res) => {
    try {
    const Users = await Users.findById(req.params.id);
    if (!Users) {
    return res.status(404).json({ message: "Users not found" });
    }
    res.status(200).json(Users);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    };
    
    // const updateUsers = async (req, res) => {
    // try {
    // const { /* specify the fields that can be updated / } = req.body;
    // const Users = await Users.findById(req.params.id);
    // if (!Users) {
    // return res.status(404).json({ message: "Order not found" });
    // }
    // / update the fields of the order object with the values from req.body */
    // await Users.save();
    // res.status(200).json(Users);
    // } catch (err) {
    // res.status(500).json({ message: err.message });
    // }
    // };
    
    const deleteUsers = async (req, res) => {
    try {
    const users = await Users.findByIdAndDelete(req.params.id);
    if (!users) {
    return res.status(404).json({ message: "Users not found" });
    }
    res.status(200).json({ message: "Users deleted successfully" });
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    };
