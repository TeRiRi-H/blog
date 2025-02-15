// import { PrismaClient } from "@prisma/client";
// import { randomUUID } from "crypto";
// import { NextRequest, NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   const data = await prisma.tags.findMany({
//     where: {},
//     orderBy: {
//       created_time: "desc",
//     },
//   });

//   // 检查查询结果是否为 null
//   if (data === null) {
//     console.log("查询结果为 null，返回错误响应");
//     return NextResponse.json({ error: "标签列表为空" }, { status: 501 });
//   }

//   return NextResponse.json({
//     success: true,
//     errrorMessage: "",
//     data: {
//       list: data,
//     },
//   });
// }

// export const POST = async (req: NextRequest) => {
//   try {
//     const requestData = await req.json();
//     // 检查请求数据是否为 null
//     if (requestData === null) {
//       console.log("请求数据为 null，返回错误响应");
//       return NextResponse.json({ error: "请求数据为空" }, { status: 400 });
//     }
//     // 检查请求数据中是否包含必要字段
//     if (!requestData.name) {
//       console.log('请求数据缺少必要字段 "name"，返回错误响应');
//       return NextResponse.json(
//         { error: "创建标签时缺少必要字段 'name'" },
//         { status: 400 }
//       );
//     }
//     const tag_id = randomUUID();
//     const newTagData = {
//       ...requestData,
//       tag_id,
//     };
//     console.log("要插入的新标签数据:", newTagData);

//     await prisma.tags.create({
//       data: newTagData,
//     });
//     return NextResponse.json({
//       success: true,
//       status: 200,
//       errorMessage: "创建标签成功",
//     });
//   } catch (error) {
//     return NextResponse.json({ error: "创建标签失败" }, { status: 500 });
//   }
// };
