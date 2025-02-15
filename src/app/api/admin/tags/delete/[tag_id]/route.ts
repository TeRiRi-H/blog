import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { tag_id: string } }
) {
  // console.log("删除标签,params:", params);
  try {
    const { tag_id } = await params;
    if (!tag_id) {
      return NextResponse.json(
        { success: false, errorMessage: "标签ID不能为空" },
        { status: 400 }
      );
    }
    const deleteTag = await prisma.tags.delete({
      where: { tag_id: tag_id },
    });
    return NextResponse.json({
      success: true,
      errorMessage: "",
      data: deleteTag,
    });
  } catch (error) {
    return {
      status: 500,
      body: { error: "删除标签失败" },
    };
  }
}
