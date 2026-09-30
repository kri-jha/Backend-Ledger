const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware')
const {
  createTransaction,
  createInitialFundsTransaction
} = require("../controllers/transaction.controller");

/**
 * - POST /api/transactions/
 * - Create a new transaction
 */



/**
 * - POST /api/transactions/system/initial-funds
 * - Create initial funds transaction from system user
 */

router.post("/system/initial-funds", authMiddleware.authSystemUserMiddleware, createInitialFundsTransaction)

router.post("/", authMiddleware.authMiddleware, createTransaction);

module.exports = router;
