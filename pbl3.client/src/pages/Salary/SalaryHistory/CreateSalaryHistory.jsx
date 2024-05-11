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

            const data = response.map((e) => {
                return {
                    label: e.fullName,
                    value: e.id,
                };
            });
            data.push({
                label: "All",
                value: 0,
            });
            setListEmployee(data);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.startDate = e.startDate.format("YYYY-MM-DD");
            e.endDate = e.endDate.format("YYYY-MM-DD");
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
            <Drawer
                width={600}
                title="Basic Drawer"
                onClose={onClose}
                open={open}
            >
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
                                        placeholder="Please select a name"
                                        options={listEmployee}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="startDate"
                                    label="Start Date"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter user name",
                                        },
                                    ]}
                                >
                                    <TimePicker
                                        style={{ width: "100%" }}
                                        placeholder="Please enter user name"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="endDate"
                                    label="End date"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter user name",
                                        },
                                    ]}
                                >
                                    <TimePicker
                                        style={{ width: "100%" }}
                                        placeholder="Please enter user name"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button htmlType="submit">Submit</Button>
                    </Form>
                </Spin>
            </Drawer>
        </>
    );
}
