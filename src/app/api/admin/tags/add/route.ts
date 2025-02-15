import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

// POST: 创建新标签
export const POST = async (req: NextRequest) => {
  try {
    const requestData = await req.json();
    console.log("请求数据:", requestData);
    // 检查请求数据是否为 null
    if (requestData === null) {
      console.log("请求数据为 null，返回错误响应");
      return NextResponse.json({ error: "请求数据为空" }, { status: 400 });
    }
    // 检查请求数据中是否包含必要字段
    if (!requestData.name) {
      console.log('请求数据缺少必要字段 "name"，返回错误响应');
      return NextResponse.json(
        { error: "创建标签时缺少必要字段 'name'" },
        { status: 400 }
      );
    }
    const tag_id = randomUUID();
    const newTagData = {
      ...requestData,
      tag_id,
    };
    console.log("要插入的新标签数据:", newTagData);

    await prisma.tags.create({
      data: newTagData,
    });
    return NextResponse.json({
      success: true,
      status: 200,
      errorMessage: "创建标签成功",
    });
  } catch (error) {
    return NextResponse.json({ error: "创建标签失败" }, { status: 500 });
  }
};
