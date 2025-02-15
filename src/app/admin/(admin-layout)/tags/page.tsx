"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Table,
  Modal,
  Space,
  Switch,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
interface TagRecord {
  id: number; // 自增主键
  tag_id: string; // UUID
  name: string; // 标签名称
  status: boolean; // 发布状态
  created_time: Date; // 创建时间
  updated_time: Date; // 更新时间
  counts: number; // todo:关联文章数量
}

export default function TagsPage() {
  // 控制modal的显示隐藏
  const [open, setOpen] = useState(false);
  // 获取表单实例
  const [myForm] = Form.useForm();
  const [list, setList] = useState([]);
  const [query, setQuery] = useState({
    per: 10,
    page: 1,
    name: "",
    timestamp: Date.now(),
  });

  // 当前选中的标签id，用于编辑。为空表示新增，存在表示修改
  const [cuurentTagId, setCurrentTagId] = useState("");
  const [total, setTotal] = useState(0);

  //监听条件的改变
  useEffect(() => {
    fetch(
      `/api/admin/tags/list?page=${query.page}&per=${query.per}&name=${query.name}`
    )
      .then((res) => res.json())
      .then((res) => {
        setList(res.data.list);
        setTotal(res.data.total);
      });
  }, [query]);

  useEffect(() => {
    if (!open) {
      setCurrentTagId("");
    }
  });

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
      <Form
        layout="inline"
        onFinish={(v) => {
          setQuery((prev) => ({
            ...prev,
            page: 1,
            per: 10,
            name: v.name,
          }));
        }}
      >
        <Form.Item label="标题" name="name">
          <Input placeholder="请输入标签名称" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table
        style={{ marginTop: 20 }}
        dataSource={list}
        rowKey="id"
        pagination={{
          total,
          onChange: (page, pageSize) => {
            setQuery((prev) => ({
              ...prev,
              page,
              per: pageSize,
              timestamp: Date.now(),
            }));
          },
        }}
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
            render(status, record: TagRecord) {
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
            render(v, r) {
              return (
                <Space>
                  <Button
                    size="small"
                    icon={<EditOutlined />}
                    type="primary"
                    onClick={() => {
                      setOpen(true);
                      setCurrentTagId(r.tag_id);
                      myForm.setFieldsValue(r);
                    }}
                  />
                  <Popconfirm
                    title="确认删除吗？"
                    onConfirm={async () => {
                      //执行
                      try {
                        // console.log("删除标签r", r.tag_id);
                        const res = await fetch(
                          `/api/admin/tags/delete/${r.tag_id}`,
                          {
                            method: "DELETE",
                          }
                        );
                        if (!res.ok) throw new Error("删除失败");
                        setQuery((prev) => ({
                          ...prev,
                          pages: 1,
                          timestamp: Date.now(),
                        }));
                      } catch (e) {
                        console.error("删除失败", e);
                      }
                    }}
                  >
                    <Button
                      size="small"
                      icon={<DeleteOutlined />}
                      type="primary"
                      danger
                    />
                  </Popconfirm>
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
            console.log("提交：", values);
            if (cuurentTagId) {
              const res = await fetch(
                `/api/admin/tags/update/${cuurentTagId}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    type: "name",
                    value: values,
                  }),
                }
              );
              if (!res.ok) throw new Error("更新失败");
              setOpen(false);
              setQuery((prev) => {
                return {
                  ...prev,
                  timestamp: Date.now(),
                };
              });
            } else {
              await fetch("/api/admin/tags/add", {
                method: "POST",
                body: JSON.stringify(values),
              }).then((res) => res.json());
              setOpen(false);
              setQuery({
                ...query,
                timestamp: Date.now(),
              });
            }
            //
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
