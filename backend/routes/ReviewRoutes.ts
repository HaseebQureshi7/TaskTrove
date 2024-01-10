import { Router } from "express";
import {
  AddReview,
  EditReview,
  GetAllReviews,
  GetReviewByProjectId,
  RemoveReview,
} from "../controllers/ReviewController";
import authorizeRoles from "../middlewares/AuthorizeRolesMiddleware";
const ReviewRoutes = Router();

ReviewRoutes.get("/reviewsByProjectId/:pid", authorizeRoles(["client", "admin", "freelancer"]), GetReviewByProjectId);
ReviewRoutes.get("/allReviews", authorizeRoles(["client"]), GetAllReviews);
ReviewRoutes.post("/addReview", authorizeRoles(["client"]), AddReview);
ReviewRoutes.put("/editReview/:rid", authorizeRoles(["client"]), EditReview);
ReviewRoutes.delete("/removeReview/:rid", authorizeRoles(["client"]), RemoveReview);

export default ReviewRoutes;
