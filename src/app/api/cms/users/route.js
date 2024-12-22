import { revalidatePath } from "next/cache";
import connectToDb from "../../../../../configs/db.ts";
import userModel from "../../../../../models/user.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectToDb();
    const users = await userModel
      .find({ roll: "USER" }, "fullName email profile")
      .sort({ _id: -1 })
      .lean();

    revalidatePath("/", "layout");

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}
