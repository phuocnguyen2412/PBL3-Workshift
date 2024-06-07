import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AccountContext } from "../../Context/AccountContext";
import {
    Button,
    Checkbox,
    Col,
    Form,
    Input,
    Row,
    Typography,
    notification,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import "./Login.css";
import authApi from "../../Services/authApi";

function Login() {
    const [loading, setloading] = useState(false);
    const account = useContext(AccountContext);
    const navigate = useNavigate();
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const onFinish = async (values) => {
        try {
            setloading(true);

            const res = await authApi.loginByAccount(values);
            account.onChange(res);
            localStorage.setItem("Authorization", res.token);
            navigate("/home");
        } catch (err) {
            console.log(err);
            apiNotification.error({
                message: "Error!",
                description: `${err}`,
                placement: "topRight",
            });
        } finally {
            setloading(false);
        }
    };

    return (
        <Row
            style={{
                height: "100vh",
                width: "100wh",
                backgroundImage: 'url("./src/assets/bg.svg")',
                backgroundSize: "cover",
                backgroundPosition: "bottom right",
                backgroundRepeat: "no-repeat",
            }}
            justify="center"
            align="middle"
        >
            {contextHolderNotification}
            <Col span={12}>
                <Row justify="center" align="middle">
                    <img
                        src="https://demo.1office.vn/packages/4x/style/packages/login/images/logo.svg"
                        alt=""
                    />
                </Row>
                <Row justify="center" align="middle">
                    <img src="./src/assets/bg1.svg" alt="" />
                </Row>
            </Col>
            <Col span={12}>
                <Form
                    name="normal_login"
                    className="login-form LoginForm"
                    onFinish={onFinish}
                >
                    <Typography
                        style={{ fontSize: "30px", marginBottom: "12px" }}
                    >
                        Login
                    </Typography>
                    <Form.Item
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            size="large"
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox size="large">Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            loading={loading}
                            block
                            size="large"
                            shape="round"
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    ); //
}

export default Login;
