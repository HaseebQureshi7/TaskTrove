import { Request, Response } from "express";
import TransactionModel from "../models/TransactionModel";

const GetTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await TransactionModel.find();
    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetTransactionById = async (req: Request, res: Response) => {
  try {
    const { tid } = req.params;
    const transaction = await TransactionModel.findById(tid);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const CreateTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await TransactionModel.create(req.body);
    return res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const UpdateTransaction = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    const transaction = await TransactionModel.findByIdAndUpdate(transactionId, req.body, { new: true });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    return res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteTransaction = async (req: Request, res: Response) => {
  try {
    const { tid } = req.params;
    const transaction = await TransactionModel.findByIdAndDelete(tid);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { GetTransactions, GetTransactionById, CreateTransaction, UpdateTransaction, DeleteTransaction };
