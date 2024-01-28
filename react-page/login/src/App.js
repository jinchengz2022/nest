import React from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";

const App = () => {
  const [form] = Form.useForm();

  const login = async (values) => {
    try {
      const { email, code } = form.getFieldsValue();

      const res = await axios.post("http://localhost:3456/user/login", {
        email,
        code,
      });
      console.log({ res });
      if (res.data.data) {
        message.success("login success");
      } else {
        message.info(res.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const sendEmailCode = async () => {
    const { email } = form.getFieldsValue();
    const res = await axios.get(
      `http://localhost:3456/email/getCode?address=${email}`
    );

    if (res.data) {
      message.success("send success~");
    }
  };

  return (
    <div style={{ width: "500px", margin: "100px auto" }}>
      <Form onFinish={login} form={form}>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: "请输入邮箱地址",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="验证码"
          name="code"
          rules={[
            {
              required: true,
              message: "请输入验证码",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button onClick={sendEmailCode}>发送验证码</Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
