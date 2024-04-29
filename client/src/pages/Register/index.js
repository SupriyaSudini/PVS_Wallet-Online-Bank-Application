import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Col} from 'antd';
import {Form} from 'antd';
import {Row} from 'antd';
import {Input, Select} from 'antd';
import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import './../../stylesheets/custom-components.css';
import { RegisterUser } from "../../apicalls/users";
import { message } from 'antd';
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

// import PhoneInput from 'react-phone-number-input';
import PhoneInput,{isValidPhoneNumber} from "react-phone-number-input";
import "react-phone-number-input/style.css";

//fake or real email
import isDisposableEmail from 'is-disposable-email';




const { Option } = Select;

function Register(){
  /* for hover effect and click effect*/
    const [hoveredInput, setHoveredInput] = useState(null);
    const [clickedInput, setClickedInput] = useState(null);

    const [value, setValue] = useState();


    // for validation of identification type 
    const [form] = Form.useForm();
    const [identificationType, setIdentificationType] = useState(null);
  
    const handleMouseEnter = (input) => {
      setHoveredInput(input);
    };
  
    const handleMouseLeave = () => {
      setHoveredInput(null);
    };
  
    const handleClick = (input) => {
      setClickedInput(input === clickedInput ? null : input);
    };
  
    const getInputStyle = (input) => {
      const isHovered = input === hoveredInput;
      const isClicked = input === clickedInput;
  
      return {
        borderColor: isClicked ? '#3f8afc' : isHovered ? '#3f8afc' : 'gray',
      };
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const onFinish = async(values) => {
     try {
       dispatch(ShowLoading());
       const response = await RegisterUser(values);
       dispatch(HideLoading())
       if(response.success){
        message.success(response.message);
        navigate('/login');
       }else{
        message.error(response.message);
       }
     } catch (error) {
      dispatch(HideLoading())
       message.error(error.message);
     }
    }
 /* it ends here */




 // validation of identification type 

 const handleIdentificationTypeChange = (value) => {
  setIdentificationType(value);
  form.validateFields(["identificationNumber"]); // Trigger validation for identification number
};

const validateIdentificationNumber = (_, value) => {
  if (identificationType === "PASSPORT" && (value.length < 6 || value.length > 9)) {
    return Promise.reject(new Error("Passport number should be between 6 and 9 characters"));
  }
  
  if (identificationType === "SOCIAL CARD") {
    const regex = /^\d{3}-\d{2}-\d{4}$/;
    if (!regex.test(value)) {
      return Promise.reject(new Error("Please enter a valid Social Security Card number (123-45-6789)"));
    }
  }

  if (identificationType === "DRIVING LICENSE" && !/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,}$/.test(value)) {
    return Promise.reject(new Error("Driving License number of atleast 6 characters (include both alphabetical and numeric characters)"));
  }

  if (identificationType === "NATIONAL ID" && value.length < 6) {
    return Promise.reject(new Error("National ID should be at least 6 characters"));
  }
  

  return Promise.resolve();
};


// const handleEmailBlur = (event) => {
//   const { value } = event.target || {}; // Ensure value is defined
//   if (value && isDisposableEmail(value)) {
//     form.setFields([
//       {
//         name: "email",
//         errors: ["This email domain is not allowed. Please use a valid email address."],
//       },
//     ]);
//   }
// };




    return (
        <div className="m-5">
          <div className="flex items-center justify-between p-top50">
            <h1 className="text-2xl">PVS WALLET - REGISTER</h1>
    
            <h1 className="text-sm underline" onClick={() => navigate('/login')}>
              Already a member , Log in
            </h1>
          </div>
          <hr />
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={6}>
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
                    style={getInputStyle('input1')}
                    onMouseEnter={() => handleMouseEnter('input1')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input1')}
                   type="text" placeholder="firstName" 
                   prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
                   />
                </Form.Item>
              </Col>
              <Col span={6}>
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
                    style={getInputStyle('input2')}
                    onMouseEnter={() => handleMouseEnter('input2')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input2')}
                    type="text" placeholder="lastName" 
                    prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
                    />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Email" name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    // {
                    //   type: "email",
                    //   message: "Please enter a valid email address!",
                    // },
                    {
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      message: "Please enter a valid email address!",
                    },
                  
                  ]}
                >
                <Input
                    style={getInputStyle('input3')}
                    onMouseEnter={() => handleMouseEnter('input3')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input3')}
                    type="text" placeholder="email"
                    prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
                    // onBlur={handleEmailBlur}
                    />
                </Form.Item>
              </Col>
              <Col span={6}>

             {/* <Form.Item label="Mobile" name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
               >
              <PhoneInput
                style={getInputStyle('input4')}
                onMouseEnter={() => handleMouseEnter('input4')}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick('input4')}
                placeholder="Mobile"
                defaultCountry='US'
                value={value}
                onChange={value => setValue(value)}
                // onChange = {setValue}
                error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
                />

                <span style={{ color: 'red' }}>
                  {value && !isValidPhoneNumber(value) ? 'Invalid Phone Number': ''}
                </span>

          </Form.Item> */}


<Form.Item
  label="Mobile"
  name="phoneNumber"
  rules={[
    {
      required: true,
      message: "Please input your phone number!",
    },
    {
      validator: (_, value) =>
        value && isValidPhoneNumber(value)
          ? Promise.resolve()
          : Promise.reject(new Error("Invalid phone number")),
    },
  ]}
>
  <PhoneInput
    style={getInputStyle('input4')}
    onMouseEnter={() => handleMouseEnter('input4')}
    onMouseLeave={handleMouseLeave}
    onClick={() => handleClick('input4')}
    placeholder="Mobile"
    defaultCountry='US'
    value={value}
    onChange={setValue}
  />
</Form.Item>

              </Col>
    
              <Col span={6}>
                <Form.Item label="Identification Type" name="identificationType"
                  rules={[
                    {
                      required: true,
                      message: "Please select your identification type!",
                    },
                  ]}
                
                >
                  {/* <Select> */}
                   <Select
                        onChange={handleIdentificationTypeChange}
                        style={getInputStyle('input8')}
                        onMouseEnter={() => handleMouseEnter('input8')}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick('input8')} >
                    <Option value="NATIONAL ID">National ID</Option>
                    <Option value="PASSPORT">Passport</Option>
                    <Option value="DRIVING LICENSE">Driving License</Option>
                    <Option value="SOCIAL CARD">Social Security Card (SSN)</Option>
                  </Select>
                </Form.Item>
              </Col>
    
              <Col span={6}>
                <Form.Item label="Identification Number" name="identificationNumber"
                  rules={[
                      { required: true, 
                        message: "Please input your identification number" 
                      }, 
                      { 
                        validator: validateIdentificationNumber
                      }
                    ]}
                >
                <Input
                    style={getInputStyle('input5')}
                    onMouseEnter={() => handleMouseEnter('input5')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input5')}
                     type="text" placeholder="Unique ID"/>
                </Form.Item>
              </Col>
    
              <Col span={24}>
                <Form.Item label="Address" name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!",
                    },
                  ]}
                >
                <TextArea
                    style={getInputStyle('textarea')}
                    onMouseEnter={() => handleMouseEnter('textarea')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('textarea')} 
                    type="text"  placeholder="Permanent / Resident Address"/>
                </Form.Item>
              </Col>
    
              <Col span={6}>
                {/* <Form.Item label="Password" name="password"
                 rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                >
                <Input.Password
                    style={getInputStyle('input6')}
                    onMouseEnter={() => handleMouseEnter('input6')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input6')}
                     type="password" placeholder="password" 
                     prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                     />
                </Form.Item> */}

<Form.Item
  label="Password"
  name="password"
  rules={[
    {
      required: true,
      message: "Please input your password!",
    },
    {
      validator: (_, value) => {
        if (!value || value.length !== 6) {
          return Promise.reject(new Error("Password must be exactly 6 characters long!"));
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return Promise.reject(new Error("Password must contain at least an uppercase, a lowercase, and a number!"));
        }
        return Promise.resolve();
      },
    },
  ]}
>
  <Input.Password
    style={getInputStyle('input6')}
    onMouseEnter={() => handleMouseEnter('input6')}
    onMouseLeave={handleMouseLeave}
    onClick={() => handleClick('input6')}
    type="password"
    placeholder="Password"
    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
  />
</Form.Item>


              </Col>
    
              <Col span={6}>
                <Form.Item label="Confirm Password" name="confirmPassword"
                 dependencies={["password"]}
                 rules={[
                   {
                     required: true,
                     message: "Please confirm your password!",
                   },
                   ({ getFieldValue }) => ({
                     validator(_, value) {
                       if (!value || getFieldValue("password") === value) {
                         return Promise.resolve();
                       }
                       return Promise.reject(new Error("The two passwords do not match!"));
                     },
                   }),
                 ]}
                >
                <Input.Password
                    style={getInputStyle('input7')}
                    onMouseEnter={() => handleMouseEnter('input7')}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick('input7')}
                     type="password" placeholder="confirm Password"
                     prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                     />
                </Form.Item>
              </Col>
            </Row>
    
            <div className="flex justify-end">
              <button className="primary-contained-btn" type="submit">
                Register
              </button>
            </div>
          </Form>
        </div>
      );
    }
    
    export default Register;

