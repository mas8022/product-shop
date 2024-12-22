import { revalidatePath } from "next/cache";
import connectToDb from '../../../../configs/db.ts'
import contactUsMessageModel from '../../../../models/contactUsMessage.js'
import { NextResponse } from "next/server";

export async function GET() {
  try {
    connectToDb();
    const messages = await contactUsMessageModel
      .find({ isAnswer: false }, "_id")
      .lean();

    revalidatePath("/", "layout");

    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
