import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { category_id: string } }
) {
  const categoryId = params.category_id;
  try {
    const { type, value } = await req.json();
    let updatedCategory;
    if (type === "status") {
      updatedCategory = await prisma.categories.update({
        where: { category_id: categoryId },
        data: { status: Boolean(value) },
      });
    } else if (type === "name") {
      // console.log("更新标签名称:tagid:", tagId, ",value:", value);
      updatedCategory = await prisma.categories.update({
        where: { category_id: categoryId },
        data: { name: value.name },
      });
    } else {
      return NextResponse.json({ error: "不支持的更新类型" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      errorMessage: "",
      data: updatedCategory,
    });
  } catch (error) {
    return NextResponse.json({ error: "更新标签信息失败" }, { status: 500 });
  }
}
