import React, { useEffect, useState } from "react";
import { notification, Layout, Space, Table, Tag, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import PageHeader from "components/PageHeader";
import { deleteUser, getUsers } from "services/user";
import { ITEMS_PER_PAGE } from "constants/index";
import { AUTH_METHOD, PERMISSION } from "enums/index";

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  mobile: string | null;
  info: string | null;
  avatar: string | null;
  permission: PERMISSION;
  method: AUTH_METHOD;
}

const TagColors: any = {
  [PERMISSION.USER]: "green",
  [PERMISSION.ADMIN]: "volcano",
};

const columns: (param: {
  handleSelectDeleteUser: (id: string) => void;
}) => ColumnsType<UserInfo> = ({ handleSelectDeleteUser }) => [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text) => <p>{text}</p>,
    width: "5%",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
  },
  {
    title: "Permission",
    key: "permission",
    dataIndex: "permission",
    render: (v) => {
      const color = TagColors[v] || TagColors[PERMISSION.USER];
      return (
        <>
          <Tag color={color}>{v}</Tag>
        </>
      );
    },
  },
  {
    title: "Is verified",
    key: "is_verified",
    dataIndex: "is_verified",
    render: (v) => {
      return (
        <>
          <Tag color={v ? "green" : "volcano"}>
            {v.toString().toUpperCase()}
          </Tag>
        </>
      );
    },
  },
  {
    title: "delete",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="primary"
          danger
          onClick={() => {
            handleSelectDeleteUser(record.id.toString());
          }}
        >
          Delete
        </Button>
      </Space>
    ),
  },
];

const UserManagement = () => {
  const [metadata, setMetadata] = useState<any>(null);
  const [data, setData] = useState<UserInfo[]>([]);
  const [selectedDeleteUser, setSelectedDeleteUser] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const handleGetUser = async (offset: number) => {
    const [rs, err] = await getUsers({
      limit: ITEMS_PER_PAGE,
      offset,
    });
    if (rs) {
      setData((rs as any).data);
      setMetadata((rs as any).metadata);
    }
  };
  useEffect(() => {
    handleGetUser(0);
  }, []);
  const handleOk = async () => {
    if (selectedDeleteUser) {
      setIsLoading(true);
      const [rs, err] = await deleteUser(selectedDeleteUser);
      if (err) {
        api.error({
          message: "Delete failed",
        });
      } else {
        api.success({
          message: "Delete succeed",
        });
        setSelectedDeleteUser(null);
        handleGetUser((metadata.page - 1) * ITEMS_PER_PAGE);
      }
      setIsLoading(false);
    }
  };
  const handleSelectDeleteUser = (id: string) => {
    setSelectedDeleteUser(id);
  };

  return (
    <>
      <Modal
        title="Are you sure ?"
        open={!!selectedDeleteUser}
        onOk={handleOk}
        confirmLoading={isLoading}
        onCancel={() => {
          setSelectedDeleteUser(null);
        }}
      ></Modal>
      <Layout>
        <PageHeader>User management</PageHeader>
        <Table
          columns={columns({
            handleSelectDeleteUser,
          })}
          dataSource={data}
          rowKey={(record) => record.id}
          footer={() => ""}
          pagination={
            metadata
              ? {
                  pageSize: ITEMS_PER_PAGE,
                  total: metadata.total,
                  onChange(page, pageSize) {
                    handleGetUser((page - 1) * ITEMS_PER_PAGE);
                  },
                }
              : false
          }
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.info}</p>
            ),
            rowExpandable: (record) => !!record.info,
          }}
        />
      </Layout>
      {contextHolder}
    </>
  );
};
export default UserManagement;
