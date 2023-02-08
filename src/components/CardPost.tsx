import React from "react";
import {
  Avatar,
  Button,
  Card,
  Image,
  Row,
  Tag,
  Select,
  Space,
  Col,
} from "antd";
import { useState } from "react";
import { UserInfo } from "pages/UserManagement";
import { POST_STATUS } from "enums/index";
import moment from "moment";
import { LikeFilled, EyeFilled } from "@ant-design/icons";
const { Meta } = Card;
interface ICardPost {
  id_post: string;
  thumbnail: string | null;
  title: string;
  userInfo: UserInfo;
  status: POST_STATUS;
  create_at: string;
  view: number;
  like: number;
  handleChangePostStatus: (id_post: string, status: POST_STATUS) => void;
  handleDelete: (id_post: string) => void;
}
const defaulAvatar =
  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg";

const PostColor = {
  [POST_STATUS.UNAPPROVED]: "warning",
  [POST_STATUS.APPROVED]: "green",
  [POST_STATUS.BLOCKED]: "volcano",
};

const CardPost = ({
  id_post,
  thumbnail,
  title,
  userInfo,
  status,
  create_at,
  handleChangePostStatus,
  view,
  like,
  handleDelete,
}: ICardPost) => {
  const [image, setImage] = useState(() => thumbnail);
  const [userAvatar, setUserAvatar] = useState(() => userInfo?.avatar);
  return (
    <>
      <Card
        cover={
          <Image
            alt="example"
            src={image!}
            onError={() => {
              setImage("./nftDefault.png");
            }}
            style={{ height: "250px" }}
            preview={false}
          />
        }
      >
        <Meta
          avatar={
            <Avatar
              src={userAvatar}
              onError={() => {
                setUserAvatar(defaulAvatar);
                return true;
              }}
            />
          }
          title={title}
          description={`Author : ` + userInfo.name || "Anomyous"}
        />
        <Row style={{ marginTop: "16px", justifyContent: "space-between" }}>
          <Tag color={PostColor[status]}>{status}</Tag>
          {create_at && moment(create_at).format("DD/MM/yyyy")}
        </Row>
        <Row style={{ marginTop: "16px", justifyContent: "space-between" }}>
          <Col span={12}>
            <LikeFilled /> : {like}
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <EyeFilled /> : {view}
          </Col>
        </Row>
        <Row style={{ marginTop: "16px", justifyContent: "space-between" }}>
          <Select
            options={[
              {
                value: POST_STATUS.APPROVED,
                label: POST_STATUS.APPROVED,
              },
              {
                value: POST_STATUS.BLOCKED,
                label: POST_STATUS.BLOCKED,
              },
              {
                value: POST_STATUS.UNAPPROVED,
                label: POST_STATUS.UNAPPROVED,
              },
            ]}
            value={status}
            onChange={(v) => {
              handleChangePostStatus(id_post, v);
              //   console.log(id_post,v);
            }}
          ></Select>
          <Button
            danger
            type="primary"
            onClick={() => {
              handleDelete(id_post);
            }}
          >
            Delete
          </Button>
        </Row>
      </Card>
    </>
  );
};

export default CardPost;
