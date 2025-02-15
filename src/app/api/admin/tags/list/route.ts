import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

//获取全部标签
export async function GET(req: NextRequest) {
  const per = req.nextUrl.searchParams.get("per") || "10";
  const page = req.nextUrl.searchParams.get("page") || "1";
  const name = req.nextUrl.searchParams.get("name") || "";

  const data = await prisma.tags.findMany({
    where: {
      name: {
        //模糊查询
        contains: name,
      },
    },
    orderBy: {
      created_time: "desc",
    },
    take: parseInt(per),
    skip: (parseInt(page) - 1) * parseInt(per),
  });
  const total = await prisma.tags.count({
    where: {
      name: {
        //模糊查询
        contains: name,
      },
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
      pages: Math.ceil(total / parseInt(per)),
      total,
    },
  });
}
