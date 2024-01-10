import { Router } from "express";
import { CreateTransaction, DeleteTransaction, GetTransactionById, GetTransactions, UpdateTransaction } from "../controllers/TransactionController";
import authorizeRoles from "../middlewares/AuthorizeRolesMiddleware";

const TransactionRoutes = Router();

// Get all transactions
TransactionRoutes.get("/allTransaction", authorizeRoles(["client", "freelancer", "admin"]), GetTransactions);

// Get a specific transaction by ID 
TransactionRoutes.get("/transaction/:tid", authorizeRoles(["client", "freelancer", "admin"]), GetTransactionById);

// Create a new transaction
TransactionRoutes.post("/addTransaction", authorizeRoles(["client"]), CreateTransaction);

// Update a transaction by ID
TransactionRoutes.put("/transaction/:tid", authorizeRoles([]), UpdateTransaction); // EMPTY ARRAY MEANS NO ONE CAN MODIFY THE TRANSACTION.

// Delete a transaction by ID
TransactionRoutes.delete("/transaction/:tid", authorizeRoles([]), DeleteTransaction);

export default TransactionRoutes;
