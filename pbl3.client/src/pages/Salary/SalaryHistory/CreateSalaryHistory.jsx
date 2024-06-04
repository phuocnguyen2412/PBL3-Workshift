import { useEffect, useState } from "react";
import {
    Col,
    notification,
    Form,
    Row,
    Spin,
    Button,
    Drawer,
    Select,
    DatePicker,
    Flex,
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

            const res = await postApi("/SalaryHistory", e);
            console.log(res);
            apiNotification.success({
                message: "Success!",
                description: `Successfully!`,
                placement: "bottomRight",
            });
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
            <Flex justify="end">
                <Button
                    type="primary"
                    onClick={showDrawer}
                    style={{ marginBottom: "16px" }}
                >
                    Create salary bill
                </Button>
            </Flex>

            <Drawer
                width={600}
                title="Create salary bill"
                onClose={onClose}
                open={open}
            >
                <Spin spinning={loading}>
                    <Form form={form} onFinish={handleSubmit}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="employeeIds"
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
                                    <DatePicker
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
                                    <DatePicker
                                        style={{ width: "100%" }}
                                        placeholder="Please enter user name"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Button block htmlType="submit">
                            Submit
                        </Button>
                    </Form>
                </Spin>
            </Drawer>
        </>
    );
}
