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
        setloading(false);
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
                        Change Password
                    </Button>
                </Form>
            </Spin>
        </div>
    );
}
