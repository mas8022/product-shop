import mongoose, { Schema } from "mongoose";
import userModel from "../models/user";
import siteImprovementComments from "../models/siteImprovementComments";

const schema = new Schema({
  userDisLiked: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  siteImprovementComment: {
    type: mongoose.Types.ObjectId,
    ref: "SiteImprovementComment",
  },
});

const model = mongoose.models?.disLike || mongoose.model("disLike", schema);

export default model;
