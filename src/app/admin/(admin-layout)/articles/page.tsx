"use client";
import { useState } from "react";
import PageContainer from "../../_components/PageContainer";
import { Button, Card, Form, Input, Table, Modal } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

export default function ArticlesPage() {
  // 控制modal的显示隐藏
  const [open, setOpen] = useState(false);
  // 获取表单实例
  const [myForm] = Form.useForm();

  return (
    <Card
      title="文章管理"
      extra={
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpen(true)}
          >
            新增
          </Button>
        </>
      }
    >
      <Form layout="inline">
        <Form.Item label="标题">
          <Input placeholder="请输入文章标题" />
        </Form.Item>
        <Form.Item label="分类">
          <Input placeholder="请选择分类" />
        </Form.Item>
        <Form.Item label="标签">
          <Input placeholder="请选择分类" />
        </Form.Item>
        <Form.Item label="状态">
          <Input placeholder="请选择状态" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" icon={<SearchOutlined />}>
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table
        style={{ marginTop: 20 }}
        columns={[
          {
            title: "标题",
            dataIndex: "title",
          },
          {
            title: "分类",
            dataIndex: "category",
            width: 80,
          },
          {
            title: "标签",
            dataIndex: "tags",
          },
          {
            title: "发布状态",
            dataIndex: "status",
          },
          {
            title: "是否推荐",
            dataIndex: "isRecommend",
          },
          {
            title: "是否置顶",
            dataIndex: "isTop",
          },
          {
            title: "阅读量",
            dataIndex: "readCount",
          },
          {
            title: "创建时间",
            dataIndex: "createdTime",
          },
        ]}
      ></Table>
      <Modal
        title="编辑"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => myForm.submit()}
      >
        <Form
          layout="vertical"
          form={myForm}
          onFinish={(values) => {
            console.log(values);
            //toDo: 提交表单

            setOpen(false);
          }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "标题不能为空" }]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
