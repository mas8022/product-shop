import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import ResetToken from "../../../../utils/resetToken";

export async function GET() {
  try {
    const userRoll = await ResetToken();

    revalidatePath("/", "layout");

    return NextResponse.json({
      message: "reset token success",
      status: 200,
      roll: userRoll,
    });
  } catch (error) {
    return NextResponse.json({
      message: "اینترنت خود را چک کنید",
      status: 500,
    });
  }
}
