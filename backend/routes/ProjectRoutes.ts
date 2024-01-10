import { Router } from "express";
import {
  CreateProject,
  ViewAllProjects,
  GetProjectById,
  UpdateProject,
  RemoveProject,
  ViewAllClientsProjects,
  ViewAllFreelancersProjects,
} from "../controllers/ProjectController";
import authorizeRoles from "../middlewares/AuthorizeRolesMiddleware";

const ProjectRoutes = Router();

ProjectRoutes.get("/projectById/:pid", authorizeRoles(["admin", "freelancer", "client"]), GetProjectById);
ProjectRoutes.get("/viewAllProjects", authorizeRoles(["admin", "freelancer", "client"]), ViewAllProjects);
ProjectRoutes.get("/viewAllClientsProjects/:cid", authorizeRoles(["client"]), ViewAllClientsProjects);
ProjectRoutes.get("/viewAllFreelancersProjects/:fid", authorizeRoles(["freelancer"]), ViewAllFreelancersProjects);
ProjectRoutes.post("/addProject", authorizeRoles(["client"]), CreateProject);
ProjectRoutes.put("/editProject/:pid", authorizeRoles(["client", "freelancer"]), UpdateProject);
ProjectRoutes.delete("/removeProject/:pid", authorizeRoles(["admin", "client"]), RemoveProject);

export default ProjectRoutes;