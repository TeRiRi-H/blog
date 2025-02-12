"use client";

import { Card } from "antd";

export default function PageContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return <Card title={title}>{children}</Card>;
}
