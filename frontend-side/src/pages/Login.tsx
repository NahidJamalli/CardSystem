import { Button, Card, Form, Input, Modal } from "antd";
import { useStore } from "../store";
import { ILogin } from "../models/Login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [newPasswordForm] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userStore } = useStore();
  const navigate = useNavigate();

  const onFinish = (user: ILogin) => {
    userStore.login(user).then(() => navigate('/'));
  };

  const closeModal = () => {
    newPasswordForm.resetFields()
    setIsModalVisible(false);
  }

  const onSubmitModal = (email:any) => {
    userStore.newPassword(email)
    closeModal()
  };

  const onCancelModal = () => {
    closeModal()
  };

  return (
    <div className="login-container">
      <Card title="Login" style={{ width: 300 }}>
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <a onClick={() => setIsModalVisible(true)} type="link">
              Forgot Password?
            </a>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="Forgot Password"
        visible={isModalVisible}
        onCancel={onCancelModal}
        footer={null}
        width={300}
      >
        <Form form={newPasswordForm} onFinish={onSubmitModal} labelCol={{
          span: 24,
        }}
          wrapperCol={{
            span: 24,
          }}>
          <Form.Item label="Email" name="email" rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}>
            <Input type="email" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
