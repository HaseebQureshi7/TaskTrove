import { Request, Response } from "express";
import ProjectModel from "../models/ProjectModel";

const CreateProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectModel.create(req.body);
    return res.status(201).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// VIEW ALL PROJECTS 
const ViewAllProjects = async (req: Request, res: Response) => {
  try {
      const projects = await ProjectModel.find();

      return res.status(200).json(projects);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

const ViewAllClientsProjects = async (req: Request, res: Response) => {
  try {
    const { cid } = req.params;

    if (!cid) {
      return res.status(400).json({ error: "Client ID is required" });
    }

    const projects = await ProjectModel.find({ projectOwner: cid });

    return res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// VIEW ALL FREELANCER'S PROJECTS 
const ViewAllFreelancersProjects = async (req: Request, res: Response) => {
  try {
    const { fid } = req.params;

    if (!fid) {
      return res.status(400).json({ error: "Client ID is required" });
    }

    const projects = await ProjectModel.find({ allotedTo: fid });

    return res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const GetProjectById = async (req: Request, res: Response) => {
  const { pid } = req.params;
  try {
    const project = await ProjectModel.findById(pid);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const UpdateProject = async (req: Request, res: Response) => {
  const { pid } = req.params;
  try {
    const project = await ProjectModel.findByIdAndUpdate(pid, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    return res.status(200).json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// REMOVE PROJECT
const RemoveProject = async (req: Request, res: Response) => {
  try {
      const { pid } = req.params;

      const project = await ProjectModel.findById(pid);
      if (!project) {
          return res.status(404).json({ error: "Project not found" });
      }

      await ProjectModel.findByIdAndDelete(pid);

      return res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

export { CreateProject, ViewAllProjects, ViewAllClientsProjects,ViewAllFreelancersProjects, GetProjectById, UpdateProject, RemoveProject };
