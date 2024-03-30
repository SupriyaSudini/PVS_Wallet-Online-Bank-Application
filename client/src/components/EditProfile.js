import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message, Form, Input, Button, Row, Col } from "antd";
import { UpdateUserInfo } from "../apicalls/profile";
import { GetUserInfo } from "../apicalls/users";
import { ShowLoading, HideLoading } from "../redux/loadersSlice";
import { ReloadUser } from "../redux/usersSlice";
import { useNavigate } from "react-router-dom";
import '../stylesheets/alignment.css';

const EditProfile = () => {
  const { user } = useSelector((state) => state.users);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    identificationType: user.identificationType,
    identificationNumber: user.identificationNumber,
    address: user.address,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        dispatch(ShowLoading());
        const response = await GetUserInfo();
        dispatch(HideLoading());
        if (response.success) {
          const userData = response.data;
          setFormData({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            identificationType: userData.identificationType || "",
            identificationNumber: userData.identificationNumber || "",
            address: userData.address || "",
          });
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onFinish = async () => {
    try {
      dispatch(ShowLoading());
      const payload = { ...formData, selectedUser: user._id }; // Include the selectedUser field
      const response = await UpdateUserInfo(payload);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        dispatch(ReloadUser(true)); // Reload user data after update
        navigate("/profile");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      <Form layout="vertical" onFinish={onFinish} initialValues={user}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="First Name" name="firstName"
             rules={[
              {
                required: true,
                message: "Please input your first name!",
              },
              {
                pattern: /^[a-zA-Z ]*$/,
                message: "Please enter a valid first name!",
              },
            ]}
            >
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last Name" name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your last name!",
              },
              {
                pattern: /^[a-zA-Z ]*$/,
                message: "Please enter a valid last name!",
              },
            ]}
            >
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Email" name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
            >
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone Number" name="phoneNumber"
             rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit phone number!",
              },
            ]}
            >
              <Input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Identification Type" name="identificationType">
              <Input
                type="text"
                name="identificationType"
                value={formData.identificationType}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Identification Number" name="identificationNumber">
              <Input
                type="text"
                name="identificationNumber"
                value={formData.identificationNumber}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Address" name="address">
              <Input.TextArea
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item >
              <Button className="primary-outlined-btn h-50" htmlType="submit" style={{ marginRight: "10px" }}>
                Save Changes
              </Button>
              <Button
                className="primary-outlined-btn h-50 ml-2"
                onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditProfile;
