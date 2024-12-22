import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
const { cookies } = require("next/headers");

export async function POST() {
  try {
    (await cookies()).delete("token");
    (await cookies()).delete("refresh-token");

    revalidatePath('/', "layout")

    return NextResponse.json({
      message: "با موفقیت از حساب تان خارج شدید",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ message: "اینترنت خود را چک کنید", status: 500 });
  }
}
