import { useContext } from "react";
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
import useFetch from "../../custom hook/useFetch";
import localhost from "../../Services/localhost";

function Login() {
    const { postApi, loading } = useFetch(localhost);
    const account = useContext(AccountContext);
    const navigate = useNavigate();
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const onFinish = async (values) => {
        try {
            console.log(values);
            const response = await postApi("/Account/Login", values);
            if (values.remember) {
                localStorage.setItem("account", JSON.stringify(values));
            }
            localStorage.setItem("account", JSON.stringify(values));
            account.onChange(response);
            navigate("/home");
        } catch (err) {
            console.log(err);
            apiNotification.error({
                message: "Thất bại!",
                description: `Bạn đã nhập sai tài khoản hoặc mật khẩu`,
                placement: "topRight",
            });
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
                    <Typography>
                        <img
                            src="https://demo.1office.vn/packages/4x/style/packages/login/images/logo.svg"
                            alt=""
                        />
                        <div>
                            Không chỉ là hai <span>GIẢI PHÁP QUẢN LÝ</span>
                        </div>
                        <div>Làm việc mọi lúc mọi nơi</div>
                    </Typography>
                </Row>

                <img src="./src/assets/bg1.svg" alt="" />
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
                        Đăng nhập
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
                        <Input
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
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            loading={loading}
                            block
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
    );
}

export default Login;
