import { useContext, useState } from "react";

import { Form, Row, Col, Input, Button, notification, Spin } from "antd";
import { AccountContext } from "../../Context/AccountContext.jsx";
import authApi from "../../Services/authApi.js";

export default function ChangePassword() {
    const [loading, setloading] = useState(false);
    const account = useContext(AccountContext);
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();

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
            setloading(true);
            const data = {
                id: account.account.employeeId,
                password: e.oldPassword,
                newPassword: e.newPassword,
            };

            await authApi.changePassword(data);
            apiNotification.success({
                message: "Succes!",
                description: `Change password successfully`,
                placement: "topRight",
            });
        } catch (err) {
            apiNotification.error({
                message: "Error!",
                description: `Wrong current password!`,
                placement: "topRight",
            });
            console.log(err);
        } finally {
            setloading(false);
        }
    };
    return (
        <div>
            {contextHolderNotification}

            <Form autoFocus layout="vertical" onFinish={handleSubmitForm}>
                <Row gutter={12}>
                    <Col span={13}>
                        <Form.Item
                            name="oldPassword"
                            label="Current Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter Current Password",
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                type="password"
                                autoFocus
                                placeholder="Please enter Current Password"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={13}>
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
                            <Input.Password
                                size="large"
                                type="password"
                                placeholder="Please enter New Password"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={13}>
                        <Form.Item
                            name="confirmPassword"
                            label="Confirm your password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your new password",
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                type="password"
                                placeholder="Please enter your new password"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Button htmlType="submit" type="primary" loading={loading}>
                    Change Password
                </Button>
            </Form>
        </div>
    );
}
