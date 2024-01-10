import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

enum UserRole {
  Admin = "admin",
  Client = "client",
  Freelancer = "freelancer",
}

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.Client,
    },
  },
  { timestamps: true }
);

User.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

User.methods.correctPassword = async function (
  existingPass: string,
  incomingPass: string
) {
  return await bcrypt.compare(existingPass, incomingPass);
};

const UserModel = mongoose.model("User", User);
export default UserModel;
