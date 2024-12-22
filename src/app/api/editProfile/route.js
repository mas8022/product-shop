import { NextResponse } from "next/server";
import connectToDb from "../../../../configs/db.ts";
import userModel from "../../../../models/user";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");

    connectToDb();
    await userModel.findOneAndUpdate({ email }, { fullName, email, phone });

    return NextResponse.json({
      message: "حساب کاربری با موفقیت تغییر کرد",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}
