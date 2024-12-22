import { NextResponse } from "next/server";
import { Me } from "../../../../utils/me";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const me = await Me();
    revalidatePath("/", "layout");

    if (me) {
      return Response.json(me);
    }

    return NextResponse.json(null);
  } catch (error) {
    return NextResponse.json(
      { message: "اینترنت خود را چک کنید" },
      { status: 500 }
    );
  }
}
