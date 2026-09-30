const express = require('express')

const router = express.Router() 
const authController = require("../controllers/auth.controllers")

/**
 * - POST /api/accounts/
 * - Create a new account
 * - Protected Route
 */
router.post("/register" , authController.userRegisterController)

router.post("/login" , authController.userLoginController)
/**
 * - POST /api/auth/logout
 */
router.post("/logout", authController.userLogoutController)

module.exports = router




