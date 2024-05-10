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
import useFetch from "../../../custom hook/useFetch";
import localhost from "../../../Services/localhost";
import PropTypes from "prop-types";
CreateBonusSalary.propTypes = {
    reload: PropTypes.func.isRequired,
};
export default function CreateBonusSalary({ reload }) {
    const [apiNotification, contextHolderNotification] =
        notification.useNotification();
    const [open, setOpen] = useState(false);
    const { getApi, loading, postApi } = useFetch(localhost);
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
    const handleSubmit = async (e) => {
        if (e.employeeIds.some((id) => id === 0) && e.employeeIds.length > 1) {
            apiNotification.error({
                message: "Thất bại!",
                description: `Chỉ được chọn tất cả hoặc 1 số nhân viên`,
                placement: "bottomRight",
            });
            return;
        }
        e.date = e.date.format("YYYY-MM-DDTHH:mm:ss");
        const response = await postApi("/BonusSalary/addforemployees", e);
        console.log(response);
        reload();
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
                    <Form layout="vertical" onFinish={handleSubmit}>
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
