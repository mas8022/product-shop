import { NextResponse } from "next/server";
import connectToDb from "../../../../../configs/db.ts";
import productModel from "../../../../../models/product.js";

export async function GET() {
  try {
    await connectToDb();
    const products = await productModel.find({}, "name");

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}
