import mongoose, { Schema } from "mongoose";

const Bid = new Schema(
  {
    bidOf: {
      type: String,
      required: true,
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    ofProject: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BidModel = mongoose.model("Bid", Bid);
export default BidModel;
