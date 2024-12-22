import otpModel from "../../../../../models/otp";
import userModel from "../../../../../models/user.js";
import connectToDb from "../../../../../configs/db.ts";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  generateRefreshToken,
  generateToken,
} from "../../../../../utils/authTools.js";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    const { phone, code } = await req.json();

    await connectToDb();
    const isOtp = await otpModel.findOne({ phone, code }, "_id");
    await otpModel.deleteOne({ phone, code });

    if (!isOtp) {
      return NextResponse.json({
        message: "کد اشتباه است",
        status: 403,
      });
    }

    const date = new Date();
    const now = date.getTime();
    
    if (now > isOtp.expTime) {
      return NextResponse.json({
        message: "کد منقضی شده",
        status: 403,
      });
    }

    const { email } = await userModel.findOne({ phone }, "email");

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

    (await cookies()).set("token", newAccessToken, {
      httpOnly: true,
      path: "/",
    });

    (await cookies()).set("refresh-token", refreshToken, {
      httpOnly: true,
      path: "/",
      expires: new Date().getTime() + 15 * 24 * 60 * 60 * 1000,
    });

    revalidatePath("/", "layout");

    return Response.json({
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
