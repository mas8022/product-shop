import { NextResponse } from "next/server";
import connectToDb from "../../../../../../configs/db.ts";
import orderModel from "../../../../../../models/orderModel.js";
import { revalidatePath } from "next/cache";
export async function PUT(req, { params }) {
  try {
    const { id } = await params;

    connectToDb();

    await orderModel.findOneAndUpdate({ _id: id }, { status: "send" });
    
    revalidatePath("/", "layout");

    return NextResponse.json({
      message: "عملیات موفق بود",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}
