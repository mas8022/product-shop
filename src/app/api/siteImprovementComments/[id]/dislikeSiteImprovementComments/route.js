import { revalidatePath } from "next/cache";
import disLikeModel from "../../../../../../models/disLike";
import { NextResponse } from "next/server";
import userModel from "../../../../../../models/user";
import { MeEmail } from "../../../../../../utils/me";
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

    const likeBefore = await disLikeModel.findOne(
      {
        userDisLiked: userData._id,
        siteImprovementComment: id,
      },
      "_id"
    );

    if (!!likeBefore) {
      return NextResponse.json({ message: "دیس لایک کرده بودید" });
    }

    await disLikeModel.create({
      userDisLiked: userData._id,
      siteImprovementComment: id,
    });

    revalidatePath("/", "page");

    return NextResponse.json({ message: "با موفقیت دیس لایک شد", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
