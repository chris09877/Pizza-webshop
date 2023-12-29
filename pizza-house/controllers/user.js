const { Users } = require("../models/Models.js");

const getUsers = async (req, res) => {
    try {
        const usersData = await Users.find();
        res.status(200).json(usersData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUsersById = async (req, res) => {
    try {
        const userData = await Users.findById(req.params.id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUsers = async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getUsers,
    getUsersById,
    deleteUsers,
};
