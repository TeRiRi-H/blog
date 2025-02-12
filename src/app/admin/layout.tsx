"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-main">
      <AntdRegistry>{children}</AntdRegistry>
    </div>
  );
}
