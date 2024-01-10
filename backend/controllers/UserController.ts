import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
import BidModel from "../models/BidModel";

// LOGIN
const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user: any = await UserModel.findOne({ email });

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SK, {
            expiresIn: "100h",
        });

        res.status(200).json({ user, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//   LOGIN WITH TOKEN
const LoginWithToken = async (req: Request, res: Response) => {
    try {
        const token = req.body.token;

        jwt.verify(token, process.env.JWT_SK, async (err: any, decoded: any) => {
            if (err) {
                return res.status(401).json({ error: "Invalid token" });
            }

            const user: any = await UserModel.findById(decoded.userId);

            if (!user) {
                return res.status(401).json({ error: "User not found" });
            }

            const newToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SK, {
                expiresIn: "100h",
            });

            res.status(200).json({ user, token: newToken });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// SIGNUP
const Signup = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const newUser = await UserModel.create(data);

        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SK, {
            expiresIn: "100h",
        });

        res.status(201).json({ user: newUser, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// EDIT PROFILE
const EditProfile = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        delete data.role;

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token not provided" });
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SK);
        const userId = decoded.userId;

        const updatedUser = await UserModel.findByIdAndUpdate(userId, data, {
            runValidators: true,
            new: true,
        });

        if (!updatedUser) {
            return res.status(400).send("Error");
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// DELETE ACCOUNT
const RemoveAccount = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Token not provided" });
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SK);
        const userId = decoded.userId;

        await UserModel.findByIdAndDelete(userId);

        return res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const GetAllFreelancers = async (req: Request, res: Response) => {
    try {
        const freelancers = await UserModel.find({ role: "freelancer" });

        res.status(200).json({ freelancers });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const GetUserById = async (req: Request, res: Response) => {
    try {
        const { uid } = req.params
        const user = await UserModel.findById(uid);

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ADMIN ACTIONS
// BLOCK USERS
const BlockUser = async (req: Request, res: Response) => {
    try {
        const { uid } = req.params;

        if (!uid) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const user = await UserModel.findByIdAndUpdate(
            uid,
            { isBlocked: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// UNBLOCK USERS
const UnblockUser = async (req: Request, res: Response) => {
    try {
        const { uid } = req.params;

        if (!uid) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        const user = await UserModel.findByIdAndUpdate(
            uid,
            { isBlocked: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// FREELANCER ACTIONS
// MAKE A BID ON PROJECT
const MakeBidOnProject = async (req: Request, res: Response) => {
    try {
        const { bidOf, bidAmount, ofProject } = req.body;

        const newBid = await BidModel.create({
            bidOf,
            bidAmount,
            ofProject,
        });

        return res.status(201).json(newBid);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { Login, LoginWithToken, Signup, EditProfile, RemoveAccount, GetAllFreelancers, GetUserById, BlockUser, UnblockUser, MakeBidOnProject };
