import { NextResponse } from "next/server";
import request from "request";
import connectToDb from "../../../../../configs/db.ts";
import userModel from "../../../../../models/user";
import otpModel from "../../../../../models/otp";
const iranianPhoneRegex = /^(\+98|0)?9\d{9}$/;

export async function POST(req) {
  try {
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    const date = new Date();
    const expTime = date.getTime() + 120000;

    const { phone } = await req.json();
    if (!iranianPhoneRegex.test(phone)) {
      return NextResponse.redirect("http://localhost:3000/rule");
    }

    request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: "u09113185137",
          pass: "Faraz@1918452051102600",
          fromNum: "3000505",
          toNum: phone,
          patternCode: "exnvmczxjc6khm2",
          inputData: [{ "verification-code": code }],
        },
        json: true,
      },
      async function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const isPhoneExist = await userModel.findOne({ phone }, "_id");

          if (!isPhoneExist) {
            return NextResponse.json({
              message: "شما در سایت ما ثبت نام نکرده بودید",
              status: 403,
            });
          }

          await connectToDb();
          await otpModel.create({ phone, code, expTime });
        } else {
          return NextResponse.json({
            message: "سرویس پیامکی دچار اختلال شده",
            status: 403,
          });
        }
      }
    );

    return NextResponse.json({ message: "پیامک ارسال شد", status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "اینترنت خود را چک کنید" },
      { status: 500 }
    );
  }
}
