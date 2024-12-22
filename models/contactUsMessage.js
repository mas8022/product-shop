import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  isAnswer: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const model =
  mongoose.models?.ContactUsMessage ||
  mongoose.model("ContactUsMessage", schema);

export default model;
