const { Users } = require("../models/Models.js");
const jwt = require("jsonwebtoken");


const getUsers = async (req, res) => {
    if (!Users.findById(req.id)) {
        return res.status(400).json({ message: "USER NOT FOUND" });
    }
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer=')) {
            return res.status(401).json({ message: "No authorization token provided" });
        }
        const token = req.headers.authorization.split("=")[1]; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded) {
            return res.status(403).json({ message: "Unauthorized: Only admins can delete pizzas" });
        }
        const usersData = await Users.find();
        res.status(200).json(usersData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUsersById = async (req, res) => {
    if (!Users.findById(req.id)) {
        return res.status(400).json({ message: "USER NOT FOUND" });
    }
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer=')) {
            return res.status(401).json({ message: "No authorization token provided" });
        }
        const token = req.headers.authorization.split("=")[1]; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded) {
            return res.status(403).json({ message: "Unauthorized: Only admins can delete pizzas" });
        }

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
    if (!Users.findById(req.id)) {
        return res.status(400).json({ message: "USER NOT FOUND" });
    }
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer=')) {
            return res.status(401).json({ message: "No authorization token provided" });
        }
        const token = req.headers.authorization.split("=")[1]; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || !decoded) {
            return res.status(403).json({ message: "Unauthorized: Only admins can delete pizzas" });
        }

        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const login = async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body.headers.credentials;
    console.log(username, password);
    try {
        const user = await Users.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        // Validate the password
        if (password !== user.password) { 
            return res.status(401).json({ message: 'Invalid password' });
        }

    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;

        console.log(token);

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    getUsers,
    getUsersById,
    deleteUsers,
    login,
};
