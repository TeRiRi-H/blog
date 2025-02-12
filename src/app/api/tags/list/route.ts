import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  //查询标签列表，根据创建时间倒序排列
  //   const prisma = await Prisma.ArticleOrderByRelevanceFieldEnum.findList({
  //     orderBy: {
  //         createdTime: 'desc',
  //   });
  //   return NextResponse.json({
  //     success: true,
  //     msg: "sign in success",
  //   });
}
