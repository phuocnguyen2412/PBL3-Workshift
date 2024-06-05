import { PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    DatePicker,
    Drawer,
    Form,
    Input,
    Row,
    Select,
    Spin,
    notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import employeeApi from "../../../Services/employeeApi";
import PropTypes from "prop-types";
import bonusSalary from "../../../Services/BonusSalary";
CreateBonusSalary.propTypes = {
    reload: PropTypes.func.isRequired,
};
export default function CreateBonusSalary({ reload }) {
    const [loading, setloading] = useState(false);

    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();
    const [employeeOptions, setEmployeeOptions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await employeeApi.getAll();
            data.push({
                fullName: "Tất cả",
                id: 0,
            });
            setEmployeeOptions(() => {
                return data.map((e) => {
                    return {
                        label: e.fullName,
                        value: e.id,
                    };
                });
            });
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

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleSubmit = async (e) => {
        try {
            if (
                e.employeeIds.some((id) => id === 0) &&
                e.employeeIds.length > 1
            ) {
                apiNotification.error({
                    message: "Error!",
                    description: `You only can choose all or list employee`,
                    placement: "bottomRight",
                });
                return;
            }
            e.date = e.date.format("YYYY-MM-DDTHH:mm:ss");
            const response = await bonusSalary.add(e);
            apiNotification.success({
                message: "Success!",
                description: `${response.message}`,
                placement: "bottomRight",
            });
            form.resetFields();
            reload();
        } catch (error) {
            apiNotification.error({
                message: "Error!",
                description: `${error.message}`,
                placement: "bottomRight",
            });
        }
    };
    return (
        <>
            {contextHolderNotification}

            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                Create bonus salary
            </Button>

            <Drawer
                title="Create a new bonus salary"
                width={720}
                onClose={onClose}
                open={open}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <Spin spinning={loading}>
                    <Form layout="vertical" onFinish={handleSubmit} form={form}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="employeeIds"
                                    label="Tên nhân viên"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter url",
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        style={{
                                            width: "100%",
                                        }}
                                        placeholder="select one country"
                                        options={employeeOptions}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="date"
                                    label="Ngày/tháng/năm"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter user name",
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        style={{
                                            width: "100%",
                                        }}
                                        showTime
                                        format="DD-MM-YYYY HH:mm"
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="bonus"
                                    label="Total bonus"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter url",
                                        },
                                    ]}
                                >
                                    <Input
                                        placeholder="Nhập số tiền"
                                        type="number"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="reason"
                                    label="Reason"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter url",
                                        },
                                    ]}
                                >
                                    <TextArea rows={4} />
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
