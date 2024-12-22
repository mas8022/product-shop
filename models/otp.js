import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expTime: {
    type: Number,
    required: true,
  },
});

const model = mongoose.models?.Otp || mongoose.model("Otp", schema);

export default model;
