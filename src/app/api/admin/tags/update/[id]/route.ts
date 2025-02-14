import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const tagId = params.id;
  console.log("更新标签信息:", tagId);
  try {
    const { type, value } = await req.json();
    console.log("更新标签信息:", type, value);

    let updatedTag;
    if (type === "status") {
      updatedTag = await prisma.tags.update({
        where: { tag_id: tagId },
        data: { status: Boolean(value) },
      });
    } else if (type === "name") {
      updatedTag = await prisma.tags.update({
        where: { tag_id: tagId },
        data: { name: value },
      });
    } else {
      return NextResponse.json({ error: "不支持的更新类型" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      errorMessage: "",
      data: updatedTag,
    });
  } catch (error) {
    return NextResponse.json({ error: "更新标签信息失败" }, { status: 500 });
  }
}
