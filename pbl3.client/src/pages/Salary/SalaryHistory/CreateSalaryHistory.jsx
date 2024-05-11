import { useEffect, useState } from "react";
import {
    Col,
    notification,
    Form,
    Input,
    Row,
    Spin,
    TimePicker,
    Button,
    Drawer,
    Select,
} from "antd";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";

export default function CreateSalaryHistory() {
    const [form] = Form.useForm();
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const { getApi, loading, postApi } = useFetch(localhost);

    const [open, setOpen] = useState(false);
    const [listEmployee, setListEmployee] = useState([]);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        form.resetFields();
        setOpen(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await getApi("/Employee/status/true");
            setListEmployee(() =>
                response
                    .map((e) => {
                        return {
                            label: e.fullName,
                            value: e.id,
                        };
                    })
                    .push({
                        label: "Tất cả",
                        value: 0,
                    })
            );
        };
        fetchData();
    });
    const handleSubmit = async (e) => {
        try {
            console.log(e);
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `${error}`,
                placement: "bottomRight",
            });
        }
    };
    return (
        <>
            {contextHolderNotification}
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                <Spin spinning={loading}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select a name",
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="Please select"
                                        options={listEmployee}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter user name",
                                        },
                                    ]}
                                >
                                    <TimePicker placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter user name",
                                        },
                                    ]}
                                >
                                    <TimePicker placeholder="Please enter user name" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Spin>
            </Drawer>
        </>
    );
}
