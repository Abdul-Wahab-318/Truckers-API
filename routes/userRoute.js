const express = require("express")
let router = express.Router()
const { createUser, getUser, loginUser, logoutUser} = require("../controllers/userController")
const { isAuthenticated } = require("../middleware/auth")


//GET SPECIFIC USER
router.route("/users/userID/:id").get(getUser)

//CREATE USER
router.route("/users/create").post(createUser)

//LOGIN USER
router.route("/users/login").post(loginUser)

//LOGOUT USER
router.route("/users/logout").post(logoutUser)
module.exports = router