"use client";

import { ConfigProvider, Button, Layout, Menu, theme } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

import React from "react";

export default function AntdContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConfigProvider locale={zhCN}>{children}</ConfigProvider>;
}
