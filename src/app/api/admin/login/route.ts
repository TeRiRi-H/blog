import { NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest) {
  return NextResponse.json(
    {
      sucesss: true,
      message: "登录成功",
    },
    {
      headers: {
        "Set-Cookie": "admin-token=123; Path=/",
      },
    }
  );
}
