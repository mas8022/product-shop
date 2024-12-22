import { revalidatePath } from "next/cache";
import disLikeModel from "../../../../../../models/disLike";
import { MeId } from "../../../../../../utils/me";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { id } = await params;

    const meId = await MeId();

    if (!meId) {
      return NextResponse.json({
        message: "ابتدا در سایت ثبت نام کنید",
        status: 400,
      });
    }

    const likeBefore = await disLikeModel.findOne(
      {
        userDisLiked: meId,
        siteImprovementComment: id,
      },
      "_id"
    );

    if (!!likeBefore) {
      return NextResponse.json({ message: "دیس لایک کرده بودید" });
    }

    await disLikeModel.create({
      userDisLiked: meId,
      siteImprovementComment: id,
    });

    revalidatePath("/", "page");

    return NextResponse.json({ message: "با موفقیت دیس لایک شد", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
