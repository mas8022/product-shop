import connectToDb from "../../../../../configs/db.ts";
import productModel from "../../../../../models/product.js";
import userModel from "../../../../../models/user.js";
import { Me, MeEmail } from "../../../../../utils/me.js";
import orderModel from "../../../../../models/orderModel.js";
import { createPayment } from "../../../../../utils/zarinpal.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    
    const { province, city, postalCode, fullAddress, name } = await req.json();

    await connectToDb();

    const userEmail = await MeEmail();

    const user = await userModel.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          location: {
            province,
            city,
            postalCode,
            fullAddress,
          },
        },
      },
      { new: true }
    );



    const updatedProduct = await productModel.findOneAndUpdate(
      {
        name: name.trim(),
        count: { $gt: 0 },
      },
      { $inc: { count: -1 } },
      { new: true }
    );



    if (!updatedProduct) {
      return NextResponse.json({
        message: "موجودی کالا در انبار کافی نیست",
        status: 404,
      });
    }



    const product = await productModel.findOne({ name: name.trim() }, "price");
    const price = product.price;



    const order = new orderModel({
      user: user._id,
      province,
      city,
      postalCode,
      fullAddress,
      name: name.trim(),
      price,
      status: "paying",
    });



    const { success, authority, paymentUrl } = await createPayment({
      amount: price,
      description: `پرداخت برای سفارش شماره ${order._id}`,
      mobile: user.phone,
    });



    if (!success) {
      await productModel.findOneAndUpdate({ name }, { $inc: { count: 1 } });

      order.status = "fail";

      return NextResponse.json({
        message: "عملیات با شکست روبرو شد",
        status: 401,
      });
    }



    order.authority = authority;

    await order.save();

    console.log("mas", user);


    return NextResponse.json({ paymentUrl });
  } catch (error) {
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}
