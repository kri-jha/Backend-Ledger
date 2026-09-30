const express = require("express")
const authMiddlewares = require("../middlewares/auth.middleware")
const router = express.Router()

const accountController=  require("../controllers/account.controller")



/**
 * post /api/accounts
 * create a new account 
 * protected route 
 */
router.post("/", authMiddlewares.authMiddleware ,accountController.createAccountController)



/**
 * get /api/accounts
 * get all accounts for the logged in user 
 * protected route
 */
router.get("/", authMiddlewares.authMiddleware ,accountController.getAllAccountsController)





 /*
 * get /api/accounts/:accountId/balance
 * get balance for a specific account 
 * protected route
 */
router.get("/balance/:accountId", authMiddlewares.authMiddleware, accountController.getAccountBalanceController)


module.exports = router 