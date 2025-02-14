"use client";
import { useEffect, useState } from "react";
import PageContainer from "../../_components/PageContainer";
import { Button, Card, Form, Input, Table, Modal, Space, Switch } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default function TagsPage() {
  // 控制modal的显示隐藏
  const [open, setOpen] = useState(false);
  // 获取表单实例
  const [myForm] = Form.useForm();
  const [list, setList] = useState([]);
  const [query, setQuery] = useState({});

  //监听条件的改变
  useEffect(() => {
    fetch("/api/admin/tags")
      .then((res) => res.json())
      .then((res) => {
        setList(res.data.list);
      });
  }, [query]);

  return (
    <Card
      title="标签管理"
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
          <Input placeholder="请输入标签名称" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" icon={<SearchOutlined />}>
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table
        style={{ marginTop: 20 }}
        dataSource={list}
        rowKey="id"
        columns={[
          {
            title: "标签",
            dataIndex: "name",
            render(name) {
              return name;
            },
          },
          {
            title: "文章数量",
            dataIndex: "counts",
          },
          {
            title: "发布状态",
            dataIndex: "status",
            render(status, record) {
              return (
                <Space>
                  <Switch
                    size="small"
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={status == 1}
                    onChange={async (checked) => {
                      const newStatus = checked ? 1 : 0;
                      try {
                        const res = await fetch(
                          `/api/admin/tags/update/${record.tag_id}`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              type: "status",
                              value: newStatus,
                            }),
                          }
                        );
                        if (!res.ok) throw new Error("状态修改失败");
                        // 刷新列表
                        setQuery((prev) => ({
                          ...prev,
                          timestamp: Date.now(),
                        }));
                      } catch (e) {
                        console.error("更新状态时出错:", e);
                      }
                    }}
                  ></Switch>
                </Space>
              );
            },
          },
          {
            title: "操作",
            render() {
              return (
                <Space>
                  <Button size="small" icon={<EditOutlined />} type="primary" />
                  <Button
                    size="small"
                    icon={<DeleteOutlined />}
                    type="primary"
                    danger
                  />
                </Space>
              );
            },
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
          onFinish={async (values) => {
            console.log(values);
            //toDo: 提交表单
            await fetch("/api/admin/tags", {
              method: "POST",
              body: JSON.stringify(values),
            }).then((res) => res.json());
            setOpen(false);
            setQuery({});
          }}
        >
          <Form.Item
            label="标签"
            name="name"
            rules={[{ required: true, message: "标签不能为空" }]}
          >
            <Input placeholder="请输入标签" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
