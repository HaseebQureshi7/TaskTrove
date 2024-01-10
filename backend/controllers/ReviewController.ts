import { Request, Response } from "express";
import ReviewModel from "../models/ReviewModel";

const GetReviewByProjectId = async (req: Request, res: Response) => {
  try {
    const { pid } = req.params;
    const reviews = await ReviewModel.find({ reviewOfProject: pid });
    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await ReviewModel.find();
    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const AddReview = async (req: Request, res: Response) => {
  try {
    const review = await ReviewModel.create(req.body);
    return res.status(201).json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const EditReview = async (req: Request, res: Response) => {
  try {
    const { rid } = req.params;
    const review = await ReviewModel.findByIdAndUpdate(rid, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const RemoveReview = async (req: Request, res: Response) => {
  try {
    const { rid } = req.params;
    const review = await ReviewModel.findByIdAndDelete(rid);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  GetReviewByProjectId,
  GetAllReviews,
  AddReview,
  EditReview,
  RemoveReview,
};
