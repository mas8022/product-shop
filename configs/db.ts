import mongoose from "mongoose";

async function connectToDb(): Promise<string> {
  try {
    if (mongoose.connections[0].readyState) {
      return "Already connected to the database.";
    }

    await mongoose.connect("mongodb://localhost:27017/berengsar");
    return "Connected to the database.";
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error occurred.");
  }
}

export default connectToDb;
