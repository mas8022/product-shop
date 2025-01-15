import mongoose from "mongoose";

async function connectToDb(): Promise<string> {
  try {
    if (mongoose.connections[0].readyState) {
      return "Already connected to the database.";
    }

    await mongoose.connect(
      "mongodb://root:rjuiH99HMTZvmA167aDyZ3rg@hotaka.liara.cloud:31145/my-app?authSource=admin&replicaSet=rs0&directConnection=true"
    );
    return "Connected to the database.";
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Unknown error occurred."
    );
  }
}

export default connectToDb;
