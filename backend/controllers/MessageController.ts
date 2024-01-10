import { Request, Response } from "express";
import MessageModel from "../models/MessageModel";

const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await MessageModel.find();
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMessageById = async (req: Request, res: Response) => {
  try {
    const { mid } = req.params;
    const message = await MessageModel.findById(mid);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    return res.status(200).json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createMessage = async (req: Request, res: Response) => {
  try {
    const message = await MessageModel.create(req.body);
    return res.status(201).json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMessage = async (req: Request, res: Response) => {
  try {
    const { mid } = req.params;
    const updatedMessage = await MessageModel.findByIdAndUpdate(mid, req.body, { new: true });
    if (!updatedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }
    return res.status(200).json(updatedMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { mid } = req.params;
    const deletedMessage = await MessageModel.findByIdAndDelete(mid);
    if (!deletedMessage) {
      return res.status(404).json({ error: "Message not found" });
    }
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getMessages, getMessageById, createMessage, updateMessage, deleteMessage };
