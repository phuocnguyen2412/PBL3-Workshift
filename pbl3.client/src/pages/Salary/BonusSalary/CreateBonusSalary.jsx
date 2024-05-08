import {
    AppstoreOutlined,
    BarsOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import {
    Button,
    Col,
    DatePicker,
    Drawer,
    Flex,
    Form,
    Input,
    Row,
    Segmented,
    Select,
    Spin,
    notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";

export default function CreateBonusSalary() {
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const [open, setOpen] = useState(false);
    const { getApi, loading } = useFetch(localhost);
    const [employeeOptions, setEmployeeOptions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getApi("/Employee");
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
        fetchData();
    }, []);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        if (e.employeeId.some((id) => id === 0) && e.employeeId.length > 1) {
            apiNotification.error({
                message: "Thất bại!",
                description: `Chỉ được chọn tất cả hoặc 1 số nhân viên`,
                placement: "bottomRight",
            });
            return;
        }
        e.date = `${e.date.date()}-${
            e.date.month() + 1
        }-${e.date.year()} ${e.date.hour()}:${e.date.minute()}`;
        console.log(e);
    };
    return (
        <>
            {contextHolderNotification}
            <Flex align="center" justify="space-between">
                <Segmented
                    options={[
                        { value: "List", icon: <BarsOutlined /> },
                        { value: "Kanban", icon: <AppstoreOutlined /> },
                    ]}
                />
                <Button
                    type="primary"
                    onClick={showDrawer}
                    icon={<PlusOutlined />}
                >
                    Create bonus salary
                </Button>
            </Flex>

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
                    <Form layout="vertical" onFinish={handleSubmit}>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="employeeId"
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
                                    name="totalBonus"
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
