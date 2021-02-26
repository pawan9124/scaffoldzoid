import mongoose from "mongoose";

const Rate = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("rates", Rate);
