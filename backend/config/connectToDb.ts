import mongoose from "mongoose";

const connectToDb = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log("connected to mongoose on client: ", res.connection.host);
    })
    .catch((err) => console.log(err));

export default connectToDb;
