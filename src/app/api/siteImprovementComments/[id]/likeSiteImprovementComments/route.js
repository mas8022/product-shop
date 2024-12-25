import { revalidatePath } from "next/cache";
import likeModel from "../../../../../../models/like";
import { MeEmail } from "../../../../../../utils/me";
import { NextResponse } from "next/server";
import userModel from "../../../../../../models/user";
export async function POST(req, { params }) {
  try {
    const { id } = await params;

    const meEmail = await MeEmail();

    if (!meEmail) {
      return NextResponse.json({
        message: "ابتدا در سایت ثبت نام کنید",
        status: 400,
      });
    }

    const userData = await userModel.findOne({ email: meEmail }, "_id");

    const likeBefore = await likeModel.findOne(
      {
        userLiked: userData._id,
        siteImprovementComment: id,
      },
      "_id"
    );

    if (!!likeBefore) {
      return NextResponse.json({ message: "لایک کرده بودید", status: 400 });
    }

    await likeModel.create({
      userLiked: userData._id,
      siteImprovementComment: id,
    });

    revalidatePath("/", "page");

    return NextResponse.json({ message: "با موفقیت لایک شد", status: 200 });
  } catch (error) {
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}
