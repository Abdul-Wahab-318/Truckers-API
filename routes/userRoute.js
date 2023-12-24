const express = require("express")
let router = express.Router()
const { createUser, getUser, loginUser, logoutUser} = require("../controllers/userController")
const { isAuthenticated } = require("../middleware/auth")


//GET SPECIFIC USER
router.route("/userID/:id").get(getUser)

//CREATE USER
router.route("/register").post(createUser)

//LOGIN USER
router.route("/login").post(loginUser)

//LOGOUT USER
router.route("/logout").post(logoutUser)
module.exports = router