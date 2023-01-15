import React from "react";
import { Layout, notification } from "antd";
import { Button, Checkbox, Form, Input, Col, Row } from "antd";
import styled from "styled-components/macro";
import { EMAIL_REGEX } from "constants/index";
import { login } from "services/authentication";
import { useAuthContext } from "components/AuthContext";
import { useHistory } from "react-router-dom";
const Login = () => {
  const [form] = Form.useForm();
  const auth = useAuthContext();
  const [api, contextHolder] = notification.useNotification();
  const history = useHistory();

  return (
    <Layout
      style={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {contextHolder}
      <Row style={{ width: "100%" }}>
        <Col span={12}>
          <img
            src={"/login_banner.png"}
            width="100%"
            style={{
              height: "100vh",
            }}
            alt=""
          />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Layout.Content style={{ width: "80%", flex: "inherit" }}>
            <Form
              layout="vertical"
              form={form}
              onFinish={async (values) => {
                const [rs, err] = await login(values);
                if (rs) {
                  const { data } = rs as any;
                  const [_, errorParse] = auth.login(data.accessToken);
                  console.log(errorParse);

                  if (errorParse) {
                    api.error({
                      message: errorParse.message || "Something wrong",
                    });
                  } else {
                    api.success({
                      message: "Login succeed",
                    });
                    console.log("dad");

                    history.push("/");
                  }
                } else if (err) {
                  api.error({
                    message:
                      (err as any).response?.data?.message || "Something wrong",
                  });
                }
              }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    pattern: EMAIL_REGEX,
                    message: "Please input a valid email",
                  },
                ]}
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
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  style={{
                    padding: "8px",
                    fontSize: "16px",
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Layout.Content>
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;
