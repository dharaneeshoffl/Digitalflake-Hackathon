import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    displayId: {
      type: Number,
      unique: true, 
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
