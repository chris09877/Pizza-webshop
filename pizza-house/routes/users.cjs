const express =  require('express');

const {getUsers, getUsersById,deleteUsers,login} = require('../controllers/user.js');//

// const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();
//oco endpoints rien a voir avec url browser c'est the uri vu que la base dans server a ete defien as /pizzas => PIzzacontroller 
//il va chercher direct la partie suivante qui est id,delete etc
//le url qui vas chercher c'est celui que tu fetch
/* READ */
console.log("route users ok");

router.get("/", getUsers);
router.get("/:id", getUsersById);


/* DELETE */

router.delete("/delete/:id", deleteUsers);


/**POST */
router.post("/login", login);


module.exports = router;