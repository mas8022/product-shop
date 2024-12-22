import { revalidatePath } from "next/cache";
import connectToDb from "../../../../../../configs/db";
import userModel from "../../../../../../models/user";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    connectToDb();
    await userModel.findOneAndUpdate({ _id: id }, { roll: "BLOCK" });

    revalidatePath("/", "layout");

    return NextResponse.json({ message: "کاربر بلاک شد", status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}
