import mongoose, { Schema } from "mongoose";

const Review = new Schema(
  {
    reviewOfProject: {
      type: String,
      required: true,
    },
    reviewBy: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("Review", Review);
export default ReviewModel;
