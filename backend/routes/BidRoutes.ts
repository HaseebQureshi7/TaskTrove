import { Router } from "express";
import {
  AcceptBid,
  CreateBid,
  DeleteBid,
  GetAllBidsOfFreelancer,
  GetAllBidsOnProject,
  GetBidById,
  UpdateBid,
} from "../controllers/BidController";
import authorizeRoles from "../middlewares/AuthorizeRolesMiddleware";

const BidRoutes = Router();

BidRoutes.get("/allBidsOnProject/:pid", authorizeRoles(["client", "freelancer", "admin"]), GetAllBidsOnProject);
BidRoutes.get("/allBidsOfFreelancer/:fid", authorizeRoles(["freelancer"]), GetAllBidsOfFreelancer);
BidRoutes.get("/getBid/:bid", authorizeRoles(["client", "freelancer"]), GetBidById);
BidRoutes.post("/addBid", authorizeRoles(["freelancer"]), CreateBid);
BidRoutes.post("/acceptBid/:bidId", authorizeRoles(["client"]), AcceptBid);
BidRoutes.put("/editBid/:bid", authorizeRoles(["freelancer"]), UpdateBid);
BidRoutes.delete("/deleteBid/:bid", authorizeRoles(["freelancer"]), DeleteBid);

export default BidRoutes;
