import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema({
  province: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  fullAddress: { type: String, required: true },
});

const schema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  check: {
    type: Boolean,
    required: true,
    default: false,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  roll: {
    type: String,
    required: true,
  },
  location: {
    type: locationSchema,
  },
});

const model = mongoose.models?.User || mongoose.model("User", schema);

export default model;
