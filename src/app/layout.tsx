import React from "react";
import "@ant-design/v5-patch-for-react-19";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
