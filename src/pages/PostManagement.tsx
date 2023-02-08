import React, { useState } from "react";

import { Col, Layout, notification, Row, Pagination, Modal } from "antd";
import PageHeader from "components/PageHeader";
import CardPost from "components/CardPost";
import { UserInfo } from "./UserManagement";
import { DEL_FLAG, ORDER_BY, POST_STATUS } from "enums/index";
import { useEffect } from "react";
import { getPosts, changePostStatus, deletePost } from "services/post";
export interface Post {
  id_post: number;
  userinfo: UserInfo;
  title: string;
  slug: string;
  content: string;
  create_at: string;
  del_flag: DEL_FLAG;
  status: POST_STATUS;
  thumbnail: null | string;
  view: number;
  reactions: {
    likes: number;
    angries: number;
    sads: number;
    wows: number;
    laughs: number;
    hearts: number;
  };
}
const POST_PER_PAGES = 8;

const PostManagement = () => {
  const [metadata, setMetadata] = useState<any>(null);
  const [data, setData] = useState<Post[]>([]);
  const [orderBy, setOrderBy] = useState<ORDER_BY | string>("");
  const [api, contextHolder] = notification.useNotification();
  const [curPage, setCurPage] = useState(0);
  const [selectedDeletePost, setSelectedDeletePost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGetPost = async (offset: number) => {
    const payload = {
      offset,
      limit: POST_PER_PAGES,
      ...(orderBy !== "" && { orderBy }),
    };
    const [rs, err] = await getPosts(payload);
    setMetadata((rs as any).metadata);
    setData((rs as any).data);
  };

  useEffect(() => {
    handleGetPost(curPage * POST_PER_PAGES);
  }, [curPage]);

  const handleChangePostStatus = async (
    id_post: string,
    status: POST_STATUS
  ) => {
    const newData = data.map((post) =>
      post.id_post.toString() === id_post ? { ...post, status } : post
    );
    const [rs, error] = await changePostStatus({
      id_post,
      status,
    });
    if (error) {
      api.error({
        message: "Update post status failed!",
      });
    } else {
      api.success({
        message: "Update post status succeed!",
      });
      setData(newData);
    }
  };

  const handleDeletePost = async () => {
    if (selectedDeletePost) {
      setIsLoading(true);
      const [rs, err] = await deletePost({
        id_post: selectedDeletePost,
      });
      if (err) {
        api.error({
          message: "Delete failed",
        });
      } else {
        api.success({
          message: "Delete succeed",
        });
        setSelectedDeletePost("");
        handleGetPost((metadata.page - 1) * POST_PER_PAGES);
      }
      setIsLoading(false);
    }
  };
  const handleSelectDeletePost = async (id_post: string) => {
    setSelectedDeletePost(id_post);
  };

  return (
    <>
      <Modal
        title="Are you sure ?"
        open={!!selectedDeletePost}
        onOk={handleDeletePost}
        confirmLoading={isLoading}
        onCancel={() => {
          setSelectedDeletePost("");
        }}
      ></Modal>
      <Layout>
        {contextHolder}
        <PageHeader>Post management</PageHeader>
        <Row gutter={[16, 16]}>
          {data.map((post) => (
            <Col span={6} key={post.id_post}>
              <CardPost
                id_post={post.id_post.toString()}
                thumbnail={post.thumbnail || "./nftDefault.png"}
                title={post.title}
                userInfo={post.userinfo}
                status={post.status}
                create_at={post.create_at}
                handleChangePostStatus={handleChangePostStatus}
                view={post.view}
                like={post.reactions.likes}
                handleDelete={handleSelectDeletePost}
              />
            </Col>
          ))}
        </Row>
        <Row
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          {metadata && (
            <Pagination
              defaultCurrent={metadata.page}
              total={metadata.total}
              pageSize={POST_PER_PAGES}
              onChange={(page, pageSize) => {
                setCurPage(page - 1);
                // handleGetPost((page - 1) * POST_PER_PAGES);
              }}
            />
          )}
        </Row>
      </Layout>
    </>
  );
};
export default PostManagement;
