import connectToDb from "../../../../configs/db.ts";
import contactMessageModel from "../../../../models/contactUsMessage.js";
import { useRateLimiter } from "../../../../utils/useRateLimiter.js";

export async function POST(req) {
  try {
    const { isRateLimited } = await useRateLimiter(req, 3, 60000);

    if (isRateLimited) {
      return Response.json({
        status: 500,
        message:
          "شما بیش از حد مجاز درخواست ارسال کرده‌اید. لطفاً بعداً تلاش کنید.",
      });
    }

    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    connectToDb();
    await contactMessageModel.create({
      fullName,
      email,
      phone,
      message,
      isAnswer: false,
    });

    return new Response(
      JSON.stringify({ message: "پیامتان با موفقیت ارسال شد", status: 200 }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "اینترنت خود را چک کنید", status: 500 }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
