import { cookies } from "next/headers";
import userModel from "../../../../models/user.js";
import connectToDb from "../../../../configs/db.ts";
import {
  generateRefreshToken,
  generateAccessSimpleToken,
  generateToken,
  verifyPassword,
} from "../../../../utils/authTools.js";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectToDb();
    const user = await userModel.findOne({ email });
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword || !user) {
      return NextResponse.json({
        message: "رمز عبور یا ایمیل شما نا معتبر است",
        status: 401,
      });
    }

    const refreshToken = generateRefreshToken(
      { email },
      process.env.refreshPrivateKey
    );

    await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          refreshToken,
        },
      }
    );

    const newAccessToken = generateToken({ email }, process.env.privateKey);
    const accessSimpleKey = generateAccessSimpleToken(email);

    (await cookies()).set("token", newAccessToken, {
      httpOnly: true,
      path: "/",
    });

    (await cookies()).set("refresh-token", refreshToken, {
      httpOnly: true,
      path: "/",
      expires: new Date().getTime() + 15 * 24 * 60 * 60 * 1000,
    });
    (await cookies()).set("accessSimpleToken", accessSimpleKey, {
      httpOnly: true,
      path: "/",
    });

    revalidatePath("/", "layout");

    return NextResponse.json({
      message: "با موفقیت وارد حساب قبل خود شدید",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}
