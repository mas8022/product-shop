import { revalidatePath } from "next/cache";
import connectToDb from "../../../../../../../configs/db.ts";
import contactUsMessageModel from "../../../../../../../models/contactUsMessage.js";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const commentId = params.id;

    await connectToDb();
    await contactUsMessageModel.findOneAndUpdate(
      { _id: commentId },
      { isAnswer: true }
    );

    revalidatePath("/", "layout");

    return NextResponse.json({ message: "پیام پاک شد", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
