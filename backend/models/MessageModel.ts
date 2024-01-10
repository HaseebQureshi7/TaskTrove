import mongoose, { Schema } from "mongoose";

const Message = new Schema(
  {
    messageOf: {
      type: String,
      required: true,
    },
    messageTo: {
      type: String,
      required: true,
    },
    messageText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", Message);
export default MessageModel;
