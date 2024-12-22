import { MeId } from "../../../../utils/me";
import siteImprovementCommentModel from "../../../../models/siteImprovementComments";
import connectToDb from "../../../../configs/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const meId = await MeId();

    if (!meId) {
      return NextResponse.json({
        message: "برای ارسال نظر باید در سایت ثبت نام کرده باشید",
        status: 401,
      });
    }

    const { comment } = await req.json();
    connectToDb();
    await siteImprovementCommentModel.create({
      user: meId,
      comment,
      like: 0,
      disLike: 0,
      publish: false,
    });

    revalidatePath("/", "layout");

    return NextResponse.json({
      message:
        "ممنون از نظر شما! هدف ما همیشه بهبود خدمات و رضایت شماست. اگر نکته‌ای برای بهبود دارید، لطفاً با ما در میان بگذارید",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
