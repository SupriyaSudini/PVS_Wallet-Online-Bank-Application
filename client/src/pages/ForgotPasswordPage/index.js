import React from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { ForgotPassword } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function ForgotPasswordPage() {

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await ForgotPassword(values.email);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error("Failed to send reset password email.");
    }
  };

  return (
    <div className="bg-primary flex items-center justify-center h-screen">
      <div className="card w-350 p-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Forgot Password</h1>
        </div>
       
        <Form layout="vertical" onFinish={onFinish}>
        {/* <Form layout="vertical"> */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not a valid email!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item>
          <Button
              type="primary"
              htmlType="submit"
              className="bg-primary text-white text-lg h-40p w-350 p-b10"
              >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
