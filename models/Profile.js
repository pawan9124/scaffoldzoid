import mongoose from "mongoose";

const Profile = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  avatar: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("profiles", Profile);
