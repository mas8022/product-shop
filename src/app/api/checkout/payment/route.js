import connectToDb from "../../../../../configs/db.ts";
import productModel from "../../../../../models/product.js";
import userModel from "../../../../../models/user.js";
import { Me } from "../../../../../utils/me.js";
import orderModel from "../../../../../models/orderModel.js";
import { createPayment } from "../../../../../utils/zarinpal.js";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(req) {
  try {
    const { province, city, postalCode, fullAddress, name } = await req.json();

    await connectToDb();

    const meData = await Me();

    await userModel.findOneAndUpdate(
      { _id: meData._id },
      {
        $set: {
          location: {
            province,
            city,
            postalCode,
            fullAddress,
          },
        },
      }
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
      user: meData._id,
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
      mobile: meData.phone,
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

    return NextNextResponse.json({ paymentUrl });
  } catch (error) {
    return NextResponse.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
