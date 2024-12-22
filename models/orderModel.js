import mongoose, { Schema } from "mongoose";
import userModel from "./user";

const schema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    fullAddress: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    authority: {
      type: String,
      unique: true,
      sparse: true,
    },
    refId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models?.Order || mongoose.model("Order", schema);

export default model;
