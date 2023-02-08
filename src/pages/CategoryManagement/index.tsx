import {
  Button,
  Layout,
  Modal,
  notification,
  Row,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import PageHeader from "components/PageHeader";
import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../constants/index";
import { getTags, deleteTag } from "../../services/tag";
import { PlusOutlined } from "@ant-design/icons";
import CreateTagModal from "./CreateTagModal";
export interface Tag {
  id_tag: number;
  tag_name: string;
  tag_description: string;
}

const columns: (param: {
  handleSelectDeleteTag: (id: string) => void;
}) => TableColumnsType<Tag> = ({ handleSelectDeleteTag }) => [
  {
    title: "Id",
    dataIndex: "id_tag",
    key: "id_tag",
    render: (text) => <p>{text}</p>,
    width: "5%",
  },
  {
    title: "Name",
    dataIndex: "tag_name",
    key: "tag_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "tag_description",
    key: "tag_description",
  },
  {
    title: "Delete tag",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button
          type="primary"
          danger
          onClick={() => {
            handleSelectDeleteTag(record.id_tag.toString());
          }}
        >
          Delete
        </Button>
      </Space>
    ),
  },
];

const CategoryManagement = () => {
  const [metadata, setMetadata] = useState<any>(null);
  const [data, setData] = useState<Tag[]>([]);
  const [isOpenCreateTagModal, setIsOpenCreateTagModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const handleSelectDeleteTag = (id: string) => {
    setSelectedCategory(id);
  };
  const handleGetTags = async (offset: number) => {
    const [rs, err] = await getTags({
      limit: ITEMS_PER_PAGE,
      offset,
    });
    if (rs) {
      setMetadata((rs as any).metadata);
      setData((rs as any).data);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetTags(0);
  }, []);

  const handleDeletePost = async () => {
    if (selectedCategory) {
      setIsLoading(true);
      const [rs, err] = await deleteTag({
        tags: [selectedCategory],
      });
      if (err) {
        api.error({
          message: "Delete failed",
        });
      } else {
        api.success({
          message: "Delete succeed",
        });
        setSelectedCategory("");
        handleGetTags((metadata.page - 1) * ITEMS_PER_PAGE);
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Are you sure ?"
        open={!!selectedCategory}
        onOk={handleDeletePost}
        confirmLoading={isLoading}
        onCancel={() => {
          setSelectedCategory("");
        }}
      ></Modal>
      <Layout>
        {contextHolder}
        <PageHeader>Tag management</PageHeader>
        {isOpenCreateTagModal && (
          <CreateTagModal
            handleClose={() => {
              setIsOpenCreateTagModal(false);
            }}
          />
        )}

        <Row style={{ flexDirection: "row-reverse", marginBottom: "16px" }}>
          <Button
            color="green-3"
            icon={<PlusOutlined />}
            style={{
              background: "#52c41a",
              color: "#fff",
            }}
            onClick={() => {
              setIsOpenCreateTagModal(true);
            }}
          >
            Create
          </Button>
        </Row>
        <Table
          columns={columns({
            handleSelectDeleteTag,
          })}
          dataSource={data}
          rowKey={(record) => record.id_tag}
          footer={() => ""}
          pagination={
            metadata
              ? {
                  pageSize: ITEMS_PER_PAGE,
                  total: metadata.total,
                  onChange(page, pageSize) {
                    handleGetTags((page - 1) * ITEMS_PER_PAGE);
                  },
                }
              : false
          }
        />
      </Layout>
    </>
  );
};

export default CategoryManagement;
