import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { MeRole } from "../../../../utils/me";

export async function GET() {
  try {
    const userRoll = await MeRole();

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
