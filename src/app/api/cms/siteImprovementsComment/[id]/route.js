import { revalidatePath } from "next/cache";
import connectToDb from "../../../../../../configs/db";
import siteImprovementCommentModel from "../../../../../../models/siteImprovementComments";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const commentId = params.id;
    connectToDb();
    const comments = await siteImprovementCommentModel.findOneAndUpdate(
      { _id: commentId },
      { publish: true }
    );

    revalidatePath("/", "layout");

    return NextResponse.json({ message: "کامنت تایید شد", status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const commentId = params.id;
    connectToDb();
    await siteImprovementCommentModel.findOneAndDelete({
      _id: commentId,
    });

    revalidatePath("/", "layout");
    
    return NextResponse.json({ message: "کامنت حذف شد", status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}
