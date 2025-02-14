"use client";
import React from "react";
import PageContainer from "../../_components/PageContainer";
import { Form, Table, Button, Input, Space, Card } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

export default function UsersPage() {
  return (
    <Card
      title="用户信息"
      extra={
        <Button type="primary" icon={<PlusOutlined />}>
          添加用户
        </Button>
      }
    >
      <Form layout="inline" style={{ marginBottom: 16 }}>
        <Form.Item>
          <Input placeholder="用户名" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="邮箱" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
        </Form.Item>
      </Form>
      <Table
        style={{ marginTop: "8px" }}
        columns={[
          {
            title: "序号1",
          },
          {
            title: "名字",
          },
          {
            title: "昵称",
          },
          {
            title: "用户名",
          },
          {
            title: "手机号",
          },
        ]}
      ></Table>
    </Card>
  );
}
