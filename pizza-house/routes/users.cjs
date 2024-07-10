const express = require('express');

const { getUsers, getUsersById, deleteUsers, login } = require('../controllers/user.js');//


const router = express.Router();

/* READ */
console.log("route users ok");

router.get("/", getUsers);
router.get("/:id", getUsersById);


/* DELETE */

router.delete("/delete/:id", deleteUsers);


/**POST */
router.post("/login", login);


module.exports = router;