import useFetch from "./../../custom hook/useFetch.js";
import { Form, Row, Col, Input, Button } from "antd";
export default function ChangePassword() {
    const { postApi, loading } = useFetch("");
    const handleSubmitForm = (e) => {
        console.log(e);
    };
    return (
        <div>
            <Form
                autoFocus
                layout="vertical"
                onFinish={handleSubmitForm}
            >
                <Row gutter={12}>
                    <Col span={24}>
                        <Form.Item
                            name="Password"
                            label="Current Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter Current Password",
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
                            name="NewPassword"
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
                            name="ComfirmPassword"
                            label="Comfirm your password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your new password",
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

                <Button htmlType="submit" loading={loading} type="primary">
                    Chỉnh sửa tài khoản
                </Button>
            </Form>
        </div>
    );
}
