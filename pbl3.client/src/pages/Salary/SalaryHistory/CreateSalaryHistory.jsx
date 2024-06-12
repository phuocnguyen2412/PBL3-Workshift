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
    App,
} from "antd";

import employeeApi from "../../../Services/employeeApi";
import salaryHistory from "../../../Services/SalaryHistoryApi";
import { ExclamationCircleFilled } from "@ant-design/icons";
import dayjs from "dayjs";

export default function CreateSalaryHistory({ setData }) {
    const [loading, setloading] = useState(false);
    const [form] = Form.useForm();
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const { modal } = App.useApp();
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
            const response = await employeeApi.findByStatus(true);

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
        try {
            setloading(true);
            fetchData();
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    }, []);

    const handleSubmit = async (e) => {
        try {
            setloading(true);

            e.startDate = dayjs(e.startDate).format("YYYY-MM-DD");
            e.endDate = dayjs(e.endDate).format("YYYY-MM-DD");
            console.log(e);

            await salaryHistory.add(e);

            apiNotification.success({
                message: "Success!",
                description: `Successfully!`,
                placement: "bottomRight",
            });
            setData(await salaryHistory.getAll());
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `${error}`,
                placement: "bottomRight",
            });
        } finally {
            setloading(false);
        }
    };
    const showConfirm = (e) => {
        modal.confirm({
            title: "CONFIRM YOUR DECISION?",
            icon: <ExclamationCircleFilled />,
            content: `Do you want to create salary from ${dayjs(
                e.startDate
            ).format("DD-MM-YYYY")} to ${dayjs(e.endDate).format(
                "DD-MM-YYYY"
            )}`,
            okText: "Yes",
            okType: "danger",

            onOk() {
                handleSubmit(e);
            },
        });
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
                    <Form form={form} onFinish={showConfirm}>
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
                                            message:
                                                "Please choose a start date",
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        style={{ width: "100%" }}
                                        placeholder="Please choose a end date"
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
                        <Button
                            block
                            htmlType="submit"
                            type="primary"
                            loading={loading}
                        >
                            Submit
                        </Button>
                    </Form>
                </Spin>
            </Drawer>
        </>
    );
}
