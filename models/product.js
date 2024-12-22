import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    count: {
      type: Number,
    },
    image: {
      type: String,
    },
  },
  { toJSON: true, toObject: true }
);

const model = mongoose.models?.Product || mongoose.model("Product", schema);

export default model;
