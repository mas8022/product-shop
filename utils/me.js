import { cookies } from "next/headers";
import userModel from "../models/user";
import connectToDb from "../configs/db";
import { verifyToken } from "./authTools";
import ResetToken from "./resetToken";

async function Me() {
  connectToDb();
  await ResetToken();
  const token = (await cookies()).get("token")?.value;
  const tokenPayload = verifyToken(token, process.env.privateKey);

  const user = await userModel.findOne(
    {
      $or: [{ email: tokenPayload?.userEmail }, { email: tokenPayload?.email }],
    },
    "-__v"
  );

  if (user) {
    return user;
  } else {
    return null;
  }
}

async function MeId() {
  try {
    connectToDb();
    await ResetToken();
    const token = (await cookies()).get("token")?.value;
    const tokenPayload = verifyToken(token, process.env.privateKey);
    if (!tokenPayload) {
      return false;
    }

    const userIdObject = await userModel.findOne(
      {
        $or: [
          { email: tokenPayload?.userEmail },
          { email: tokenPayload?.email },
        ],
      },
      "_id"
    );
    const userId = userIdObject._id;

    if (userId) {
      return userId;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}


export { Me, MeId };
