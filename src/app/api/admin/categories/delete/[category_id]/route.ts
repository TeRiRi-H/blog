import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { category_id: string } }
) {
  try {
    const { category_id } = await params;
    if (!category_id) {
      return NextResponse.json(
        { success: false, errorMessage: "分类ID不能为空" },
        { status: 400 }
      );
    }
    const deleteCategory = await prisma.categories.delete({
      where: { category_id: category_id },
    });
    return NextResponse.json({
      success: true,
      errorMessage: "",
      data: deleteCategory,
    });
  } catch (error) {
    return {
      status: 500,
      body: { error: "删除标分类失败" },
    };
  }
}
