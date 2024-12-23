import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { newToken } = await req.json();

    (await cookies()).set("token", newToken, {
      httpOnly: true,
      path: "/",
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
