const express =  require('express');

const {getUsers, getUsersById,deleteUsers} = require('../controllers/user.js');

// const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

/* READ */
console.log("route users ok");

router.get("/", getUsers);
router.get("/:id", getUsersById);


/* DELETE */

router.delete("users/delete/:id", deleteUsers);
module.exports = router;