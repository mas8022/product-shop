import { cookies, headers } from "next/headers";
import { verifyRefreshToken, generateToken, verifyToken } from "./authTools";
import userModel from "../models/user.js";
import connectToDb from "../configs/db.ts";
import { NextResponse } from "next/server";

export default async function ResetToken() {
  try {
    const refreshToken = (await cookies()).get("refresh-token")?.value;

    if (!refreshToken) {
      return NextResponse.redirect("/login");
    }

    const refreshTokenPayLoad = verifyRefreshToken(
      refreshToken,
      process.env.refreshPrivateKey
    );

    if (!refreshTokenPayLoad) {
      return NextResponse.redirect("/login");
    }

    await connectToDb();
    const user = await userModel.findOne({ refreshToken }, "email roll");

    if (!user) {
      return NextResponse.redirect("/login");
    }

    const email = user.email;
    const userRoll = user.roll;

    const token = (await cookies()).get("token")?.value;

    if (token) {
      const validationToken = verifyToken(token, process.env.privateKey);
      if (validationToken) {
        return userRoll ? userRoll : false;
      }
    }

    const newToken = generateToken({ email }, process.env.privateKey);

    const refererUrl = (await headers()).get("referer") || "/";

    const response = NextResponse.redirect(refererUrl);
    response.cookies.set("token", newToken, {
      httpOnly: true,
      path: "/",
    });
    return response;
  } catch (error) {
    return NextResponse.redirect("/login");
  }
}
