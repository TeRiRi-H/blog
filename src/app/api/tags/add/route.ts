import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST: 创建新文章
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await prisma.tags.create({
      data,
    });
    return NextResponse.json({
      success: true,
      status: 200,
      errorMessage: "创建标签成功",
    });
  } catch (error) {
    return NextResponse.json({ error: "创建标签失败" }, { status: 500 });
  }
}
