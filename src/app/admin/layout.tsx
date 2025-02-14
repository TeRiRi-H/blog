"use client";
import React from "react";
import "@ant-design/v5-patch-for-react-19";
import AntdContainer from "./_components/AntdContainer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-amin">
      <AntdContainer>{children}</AntdContainer>
    </div>
  );
}
