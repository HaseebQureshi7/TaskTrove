import { configDotenv } from "dotenv";
import express, { Request, Response, json, urlencoded } from "express";
import connectToDb from "./config/connectToDb";
import cors from "cors";
import ProjectRoutes from "./routes/ProjectRoutes";
import ReviewRoutes from "./routes/ReviewRoutes";
import TransactionRoutes from "./routes/TransactionRoutes";
import BidRoutes from "./routes/BidRoutes";
import MessageRoutes from "./routes/MessageRoutes";
import UserRoutes from "./routes/UserRoutes";

configDotenv();
const server = express();
const PORT = process.env.PORT || 3000;

server.use(cors());
server.use(json());
server.use(urlencoded({ extended: false }));

connectToDb();

// ROUTES
server.use("/ping", (req: Request, res: Response) => {
  // SERVER PINGER
  res.send("Server is Active 🏃‍♀️");
});

server.use("/user", UserRoutes);
server.use("/project", ProjectRoutes);
server.use("/review", ReviewRoutes);
server.use("/bid", BidRoutes);
server.use("/message", MessageRoutes);
server.use("/transaction", TransactionRoutes);

server.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
