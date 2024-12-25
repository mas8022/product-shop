import { MeEmail } from "../../../../utils/me";
import siteImprovementCommentModel from "../../../../models/siteImprovementComments";
import connectToDb from "../../../../configs/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import userModel from "../../../../models/user";
export async function POST(req) {
  try {
    const meEmail = await MeEmail();

    if (!meEmail) {
      return NextResponse.json({
        message: "برای ارسال نظر باید در سایت ثبت نام کرده باشید",
        status: 401,
      });
    }

    const userData = await userModel.findOne({ email: meEmail }, "_id");

    const { comment } = await req.json();
    await connectToDb();
    await siteImprovementCommentModel.create({
      user: userData._id,
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
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}
