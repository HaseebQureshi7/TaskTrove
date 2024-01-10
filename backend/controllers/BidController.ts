import { Request, Response } from "express";
import BidModel from "../models/BidModel";
import ProjectModel from "../models/ProjectModel";

const GetAllBidsOnProject = async (req: Request, res: Response) => {
  try {
    const { pid } = req.params;
    const bids = await BidModel.find({ ofProject: pid });
    return res.status(200).json(bids);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetAllBidsOfFreelancer = async (req: Request, res: Response) => {
  try {
    const { fid } = req.params;
    const bids = await BidModel.find({ bidOf: fid });
    return res.status(200).json(bids);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const AcceptBid = async (req: Request, res: Response) => {
  try {
    const { bidId } = req.params;

    const bid = await BidModel.findById(bidId);
    if (!bid) {
      return res.status(404).json({ error: "Bid not found" });
    }

    const { ofProject } = bid;
    const today = Date.now();
    await ProjectModel.findByIdAndUpdate(ofProject, { acceptedBid: bidId, allotedTo: bid.bidOf, projectStatus: "InProgress", budget: bid.bidAmount, allotmentDate: today }, { new: true });

    return res.status(200).json({ message: "Bid accepted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetBidById = async (req: Request, res: Response) => {
  try {
    const { bid } = req.params;
    const foundBid = await BidModel.findById(bid);
    if (!foundBid) {
      return res.status(404).json({ error: "Bid not found" });
    }
    return res.status(200).json(foundBid);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const CreateBid = async (req: Request, res: Response) => {
  try {
    const bid = await BidModel.create(req.body);
    return res.status(201).json(bid);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const UpdateBid = async (req: Request, res: Response) => {
  try {
    const { bid } = req.params;
    const updatedBid = await BidModel.findByIdAndUpdate(bid, req.body, { new: true });
    if (!updatedBid) {
      return res.status(404).json({ error: "Bid not found" });
    }
    return res.status(200).json(updatedBid);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeleteBid = async (req: Request, res: Response) => {
  try {
    const { bid } = req.params;
    const deletedBid = await BidModel.findByIdAndDelete(bid);
    if (!deletedBid) {
      return res.status(404).json({ error: "Bid not found" });
    }
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { GetAllBidsOnProject, GetAllBidsOfFreelancer, AcceptBid, GetBidById, CreateBid, UpdateBid, DeleteBid };
