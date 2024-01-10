import { Router } from "express";
import {
    BlockUser,
    EditProfile,
    GetAllFreelancers,
    GetUserById,
    Login,
    LoginWithToken,
    MakeBidOnProject,
    RemoveAccount,
    Signup,
    UnblockUser,
} from "../controllers/UserController";
import authorizeRoles from "../middlewares/AuthorizeRolesMiddleware";

const UserRoutes = Router();

// USER ACCOUNT ACTIONS --- ALL ROLES
    UserRoutes.post("/login", Login);
    UserRoutes.post("/loginWithToken", LoginWithToken);
    UserRoutes.post("/signup", Signup);
    UserRoutes.put("/editProfile", EditProfile);
    UserRoutes.delete("/removeAccount/", RemoveAccount);

// ADMIN ACTIONS
    UserRoutes.post("/blockUser/:uid", authorizeRoles(["admin"]), BlockUser);
    UserRoutes.post("/unblockUser/:uid", authorizeRoles(["admin"]), UnblockUser);
    UserRoutes.get("/allFreelancers", authorizeRoles(["admin"]), GetAllFreelancers);
    UserRoutes.get("/getUserById/:uid", authorizeRoles(["admin", "client", "freelancer"]), GetUserById);
    // UserRoutes.delete("/removeProject/:pid", authorizeRoles(["admin", "client"]), RemoveProject); -- in project routes

// FREELANCER ACTIONS
    UserRoutes.post("/makeBid", authorizeRoles(["freelancer"]), MakeBidOnProject);
    // UserRoutes.get("/viewAlllProjects", authorizeRoles(["admin", "freelancer", "client"]), ViewAllProjects); -- in projects routes

// CLIENT ACTIONS
    // UserRoutes.post("/addProject", addProject); --- in projects routes
    // UserRoutes.post("/viewProjectBids/:pid", ViewProjectBids);  ---- in bid route
    // UserRoutes.post("/acceptBid/:bid", AcceptBid); --- in bid controller
    // UserRoutes.post("/addReview/:uid", AddFreelancerReview); -- in review controller
    // UserRoutes.post("/makeTransaction/", AddTransaction); -- in transaction controller

// MESSAGING ACTIONS --- CLINET AND FREELANCER
    // UserRoutes.post("/sendMessage/:uid", SendMessage);

export default UserRoutes;
