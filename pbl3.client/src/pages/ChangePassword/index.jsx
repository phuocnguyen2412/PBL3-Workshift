import { useContext } from "react";
import localhost from "../../Services/localhost.js";
import useFetch from "./../../custom hook/useFetch.js";
import { Form, Row, Col, Input, Button, notification, Spin } from "antd";
import { AccountContext } from "../../Context/AccountContext.jsx";

export default function ChangePassword() {
    const account = useContext(AccountContext);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const { postApi, loading } = useFetch(localhost);
    const handleSubmitForm = async (e) => {
        if (e.newPassword.length < 8) {
            apiNotification.error({
                message: "Error!",
                description: `New password is at least 8 character!`,
                placement: "topRight",
            });
            return;
        }
        if (e.confirmPassword !== e.newPassword) {
            apiNotification.error({
                message: "Error!",
                description: `New password and confirm password is not match!`,
                placement: "topRight",
            });
            return;
        }

        try {
            const data = {
                id: account.account.employeeId,
                password: e.oldPassword,
                newPassword: e.newPassword,
            };

            const response = await postApi("/Account/ChangePassword", data);
            apiNotification.success({
                message: "Succes!",
                description: `${response.message}`,
                placement: "topRight",
            });
        } catch (err) {
            apiNotification.error({
                message: "Error!",
                description: `Wrong password!`,
                placement: "topRight",
            });
            console.log(err);
        }
    };
    return (
        <div>
            {contextHolderNotification}
            <Spin spinning={loading}>
                <Form autoFocus layout="vertical" onFinish={handleSubmitForm}>
                    <Row gutter={12}>
                        <Col span={24}>
                            <Form.Item
                                name="oldPassword"
                                label="Current Password"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter Current Password",
                                    },
                                ]}
                            >
                                <Input
                                    type="password"
                                    autoFocus
                                    placeholder="Please enter Current Password"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="newPassword"
                                label="New Password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter New Password",
                                    },
                                ]}
                            >
                                <Input
                                    type="password"
                                    placeholder="Please enter New Password"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="confirmPassword"
                                label="Comfirm your password"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter your new password",
                                    },
                                ]}
                            >
                                <Input
                                    type="password"
                                    placeholder="Please enter your new password"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button htmlType="submit" type="primary">
                        Chỉnh sửa tài khoản
                    </Button>
                </Form>
            </Spin>
        </div>
    );
}
