import mongoose, { Schema } from "mongoose";

enum PaymentStatus {
  Failed = "failed",
  Pending = "pending",
  Successful = "successful",
}

const Transaction = new Schema(
  {
    paymentId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: "pending"
    },
    paymentTo: {
      type: String,
      required: true,
    },
    paymentFrom: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TransactionModel = mongoose.model("Transaction", Transaction);
export default TransactionModel;
