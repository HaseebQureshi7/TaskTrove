import mongoose, { Schema } from "mongoose";

const Project = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Number,
      default: 99,
    },
    description: {
      type: String,
      required: true,
    },
    projectOwner: {
      type: String, // Adjust the type based on your requirements
      required: true,
    },
    allotedTo: {
      type: String, // Adjust the type based on your requirements
      default: null,
    },
    acceptedBid: {
      type: String, // Adjust the type based on your requirements
      default: null,
    },
    allotmentDate: {
      type: Date,
      default: null,
    },
    completionDate: {
      type: Date,
      default: null,
    },
    paymentReceived: {
      type: Boolean,
      default: false,
    },
    projectStatus: {
      type: String,
      enum: ["Incomplete", "InProgress", "Completed"],
      default: "Incomplete",
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", Project);
export default ProjectModel;
