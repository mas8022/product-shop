import { cookies } from "next/headers";
import userModel from "../models/user";
import connectToDb from "../configs/db";
import { verifyAccessSimpleToken } from "./authTools";

async function Me() {
  await connectToDb();
  const simpleToken = (await cookies()).get("accessSimpleToken")?.value;

  const userEmail = verifyAccessSimpleToken(simpleToken);

  const user = await userModel.findOne(
    { email: userEmail },
    "fullName email phone location roll"
  );

  if (user) {
    return user;
  } else {
    return null;
  }
}

async function MeEmail() {
  try {
    connectToDb();
    const simpleToken = (await cookies()).get("accessSimpleToken")?.value;
    const userEmail = verifyAccessSimpleToken(simpleToken);

    if (!userEmail) {
      return false;
    }

    if (userEmail) {
      return userEmail;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export { Me, MeEmail };
