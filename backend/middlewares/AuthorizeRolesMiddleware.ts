import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel";
import { authRoles } from "../types/AuthRoleTypes";

const authorizeRoles = (requiredRoles: authRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "Token not provided" });
      }

      const decoded: any = jwt.verify(token, process.env.JWT_SK);
      const userId = decoded.userId;
      const userRole = decoded.role;

      const user = await UserModel.findById(userId);
      if (!user || !requiredRoles.includes(userRole)) {
        return res.status(403).json({ error: "Unauthorized access" });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

export default authorizeRoles;
