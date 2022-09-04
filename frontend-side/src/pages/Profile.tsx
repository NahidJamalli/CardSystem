import { Button, Card, Col, Form, Input, Row } from "antd";
import { useEffect } from "react";
import { IPasswords, IProfile } from "../models/Profile";
import { useStore } from "../store";

const Profile = () => {
  const { profileStore } = useStore();
  const [profileForm] = Form.useForm()
  const [passwordForm] = Form.useForm()

  const onSaveProfile = (profile: IProfile) => {
    profileStore.changeProfile(profile)
  };

  const onSavePassword = (passwords: IPasswords) => {
    profileStore.changePassword(passwords)
  };

  useEffect(() => {
    profileStore.getProfile()
    setTimeout(()=>{
      profileForm.setFieldsValue(profileStore.user)
    },100)
  }, [])

  return (
    <div className="profile-container">
      <Card style={{ width: 400 }}>
        <h1>Change Profile</h1>
        <Row gutter={10}>
          <Col className="gutter-box" span={24}>
            <Form
              form={profileForm}
              onFinish={onSaveProfile}
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                label="User Name"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your user name!",
                  },
                ]}
              >
                <Input placeholder="User Name" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                >
                  Save Profile
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col className="gutter-box" span={24}>
            <Form
              form={passwordForm}
              onFinish={onSavePassword}
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
            >
              <Form.Item
                label="Old Password"
                name="old"
                rules={[
                  {
                    required: true,
                    message: "Please input your old password!",
                  },
                ]}
              >
                <Input.Password placeholder="Old Password" />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="new"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input.Password placeholder="New Password" />
              </Form.Item>
              <Form.Item
                label="New Confirmed"
                name="newConfirmed"
                rules={[
                  {
                    required: true,
                    message: "Please input your New Confirmed!",
                  },
                ]}
              >
                <Input.Password placeholder="New Confirmed" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                >
                  Save Password
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Profile;
