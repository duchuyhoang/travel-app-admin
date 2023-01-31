import React, { useState } from "react";

import { Col, Layout, notification, Row, Pagination } from "antd";
import PageHeader from "components/PageHeader";
import CardPost from "components/CardPost";
import { UserInfo } from "./UserManagement";
import { DEL_FLAG, ORDER_BY, POST_STATUS } from "enums/index";
import { useEffect } from "react";
import { getPosts, changePostStatus } from "services/post";
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
    handleGetPost(0);
  }, []);

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

  return (
    <Layout>
      {contextHolder}
      <PageHeader>Post management</PageHeader>
      <Row gutter={[16, 16]}>
        {data.map((post) => (
          <Col span={6}>
            <CardPost
              id_post={post.id_post.toString()}
              thumbnail={post.thumbnail || "./nftDefault.png"}
              title={post.title}
              userInfo={post.userinfo}
              key={post.id_post}
              status={post.status}
              create_at={post.create_at}
              handleChangePostStatus={handleChangePostStatus}
              view={post.view}
              like={post.reactions.likes}
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
              handleGetPost((page - 1) * POST_PER_PAGES);
            }}
          />
        )}
      </Row>
    </Layout>
  );
};
export default PostManagement;
