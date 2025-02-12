"use client";
import React from "react";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { useRouter } from "next/navigation";

export default function page() {
  const nav = useRouter();

  return (
    <div className="login-form pt-20">
      <Card title="Next全栈管理后台">
        <Form
          className="w-4/5 mx-auto "
          onFinish={async (v) => {
            // console.log(v);
            const res = fetch("/api/admin/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(v),
            }).then((res) => res.json());
            console.log(res);
            nav.push("/admin/dashboard");
          }}
        >
          <Form.Item name="userName" label="用户名">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="passWord" label="密码">
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
