import { Router } from "express";
import {
  getMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/MessageController";

const MessageRoutes = Router();

MessageRoutes.get("/messageById/:mid", getMessageById);
MessageRoutes.get("/allMessages", getMessages);
MessageRoutes.post("/addMessage", createMessage);
MessageRoutes.put("/editMessage/:mid", updateMessage);
MessageRoutes.delete("/removeMessage/:mid", deleteMessage);

export default MessageRoutes;
