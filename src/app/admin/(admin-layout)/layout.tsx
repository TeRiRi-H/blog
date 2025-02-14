import React from "react";
import AntdAdmin from "../_components/AntdAdmin";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="login-layout">
      <AntdAdmin>{children}</AntdAdmin>
    </div>
  );
}
