import React from "react";
import { notification, Layout, Space, Button, Modal, Form, Input } from "antd";
import { createTag } from "services/tag";
const { TextArea } = Input;

interface ICreateTagModal {
  handleClose: () => void;
}
const CreateTagModal = ({ handleClose }: ICreateTagModal) => {
  const [form] = Form.useForm();
  const handleSubmit = async (v: any) => {
    console.log(v);
    try {
      const rs = await createTag({
        tags: [
          {
            tag_name: v.name,
            tag_description: v.description,
          },
        ],
      });
      api.success({
        message: "Create tag succeed",
      });
    } catch (e) {
      api.error({
        message: "Create tag failed",
      });
    }
  };
  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      <Modal
        title="Create tag"
        open
        onOk={() => {
          form.submit();
        }}
        onCancel={handleClose}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Tag name"
            name="name"
            rules={[{ required: true, message: "Tag name required" }]}
            style={{ width: "100%" }}
            labelCol={{ span: 24 }}
          >
            <Input
              style={{
                padding: "8px",
                fontSize: "16px",
              }}
            />
          </Form.Item>
          <Form.Item
            label="Tag description"
            name="description"
            rules={[{ required: true, message: "Description required" }]}
            style={{ width: "100%" }}
            labelCol={{ span: 24 }}
          >
            <TextArea rows={4} placeholder="Tag description" />
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </>
  );
};
export default CreateTagModal;
