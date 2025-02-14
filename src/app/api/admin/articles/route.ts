// // import { prisma } from "@/db";
// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export const GET = async () => {
//   const data = await prisma.articles.findMany({
//     where: {},
//     orderBy: {
//       createdTime: "desc",
//     },
//   });

//   return NextResponse.json({
//     success: true,
//     errorMessage: "",
//     data: {
//       list: data,
//     },
//   });

//   //查询文章列表，根据创建时间倒序排列
//   //   const prisma = await Prisma.ArticleOrderByRelevanceFieldEnum.findList({
//   //     orderBy: {
//   //         createdTime: 'desc',
//   //   });
//   //   return NextResponse.json({
//   //     success: true,
//   //     msg: "sign in success",
//   //   });
// };
