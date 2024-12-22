import { NextResponse } from "next/server";
import connectToDb from "../../../../../../configs/db.ts";
import productModel from "../../../../../../models/product.js";
import CloudStoringFile from "../../../../../../utils/cloudStoringFile.js";
import { revalidatePath } from "next/cache";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const formData = await req.formData();
    const name = formData.get("name");
    const file = formData.get("file");
    const price = formData.get("price");
    const count = formData.get("count");

    let fileAddress = null;

    if (file) {
      fileAddress = await CloudStoringFile(file);
    }

    const updateData = { name, price, count };

    if (fileAddress) {
      updateData.file = fileAddress;
    }

    await connectToDb();

    await productModel.findOneAndUpdate({ _id: id }, updateData, { new: true });

    revalidatePath("/", "layout");

    return NextResponse.json({
      message: "با موفقیت اصلاح شد",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}
