"use client";

import { ConfigProvider, Button, Layout, Menu, theme } from "antd";

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

export default function AntdAdmin({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const nav = useRouter();

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => {
              nav.push(key);
            }}
            items={[
              {
                key: "/admin/dashboard",
                icon: <DashboardOutlined />,
                label: "仪表盘",
              },
              {
                key: "/admin/users",
                icon: <VideoCameraOutlined />,
                label: "用户信息",
              },
              {
                key: "/admin/visitors",
                icon: <UploadOutlined />,
                label: "访客记录",
              },
              {
                key: "/admin/articles",
                icon: <UploadOutlined />,
                label: "文章管理",
              },
              {
                key: "/admin/tags",
                icon: <UploadOutlined />,
                label: "标签管理",
              },
              {
                key: "/admin/categories",
                icon: <UploadOutlined />,
                label: "分类管理",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "nav 3",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
