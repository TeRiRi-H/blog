import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

//获取全部标签
export async function GET(req: NextRequest) {
  const data = await prisma.tags.findMany({
    where: {},
    orderBy: {
      created_time: "desc",
    },
  });

  // 检查查询结果是否为 null
  if (data === null) {
    console.log("查询结果为 null，返回错误响应");
    return NextResponse.json({ error: "标签列表为空" }, { status: 501 });
  }

  return NextResponse.json({
    success: true,
    errrorMessage: "",
    data: {
      list: data,
    },
  });
}
